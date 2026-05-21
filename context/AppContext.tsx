"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { 
  getJobs, getEvents, getForumPosts, getProjects, getCampaigns, getUsers
} from "@/lib/actions";

// ─── Types (lean, matching Prisma output) ─────────────────────────────────────

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string | null;
  batch?: string | null;
  bio?: string | null;
  skills: string[];
  interests: string[];
  education?: string | null;
  department?: string | null;
  company?: string | null;
  jobTitle?: string | null;
  mentoringAvailable: boolean;
};

export type AppJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  postedAt: Date | string;
  postedBy: { id: string; name: string; avatar?: string | null; company?: string | null };
};

export type AppEvent = {
  id: string;
  title: string;
  date: Date | string;
  location: string;
  description: string;
  attendees: { user: { id: string; name: string; avatar?: string | null } }[];
};

export type AppForumPost = {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date | string;
  author: { id: string; name: string; avatar?: string | null; role: string };
};

export type AppProject = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  repoLink: string;
  contributors: { user: { id: string; name: string; avatar?: string | null } }[];
};

export type AppCampaign = {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
};

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppContextType {
  currentUser: AppUser | null;
  users: AppUser[];
  jobs: AppJob[];
  events: AppEvent[];
  forums: AppForumPost[];
  projects: AppProject[];
  campaigns: AppCampaign[];
  isLoading: boolean;
  refreshJobs: () => Promise<void>;
  refreshEvents: () => Promise<void>;
  refreshForums: () => Promise<void>;
  refreshProjects: () => Promise<void>;
  refreshCampaigns: () => Promise<void>;
  // Keep legacy compat methods for UI components
  addJob: (job: AppJob) => void;
  addEvent: (event: AppEvent) => void;
  addForumPost: (post: AppForumPost) => void;
  addProject: (project: AppProject) => void;
  donate: (campaignId: string, amount: number) => void;
  rsvpEvent: (eventId: string, userId: string) => void;
  login: (userId: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [jobs, setJobs] = useState<AppJob[]>([]);
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [forums, setForums] = useState<AppForumPost[]>([]);
  const [projects, setProjects] = useState<AppProject[]>([]);
  const [campaigns, setCampaigns] = useState<AppCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load all data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [u, j, e, f, p, c] = await Promise.all([
          getUsers(),
          getJobs(),
          getEvents(),
          getForumPosts(),
          getProjects(),
          getCampaigns(),
        ]);
        setUsers(u as AppUser[]);
        setJobs(j as AppJob[]);
        setEvents(e as AppEvent[]);
        setForums(f as AppForumPost[]);
        setProjects(p as AppProject[]);
        setCampaigns(c as AppCampaign[]);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Sync currentUser from NextAuth session
  useEffect(() => {
    if (status === "authenticated" && session?.user && users.length > 0) {
      const sessionUserId = (session.user as any).id;
      const found = users.find((u) => u.id === sessionUserId);
      if (found) setCurrentUser(found);
    } else if (status === "unauthenticated") {
      setCurrentUser(null);
    }
  }, [session, status, users]);

  // Refresh helpers
  const refreshJobs = async () => setJobs(await getJobs() as AppJob[]);
  const refreshEvents = async () => setEvents(await getEvents() as AppEvent[]);
  const refreshForums = async () => setForums(await getForumPosts() as AppForumPost[]);
  const refreshProjects = async () => setProjects(await getProjects() as AppProject[]);
  const refreshCampaigns = async () => setCampaigns(await getCampaigns() as AppCampaign[]);

  // Legacy compat stubs (UI components call these after server actions complete)
  const addJob = (job: AppJob) => setJobs((prev) => [job, ...prev]);
  const addEvent = (event: AppEvent) => setEvents((prev) => [event, ...prev]);
  const addForumPost = (post: AppForumPost) => setForums((prev) => [post, ...prev]);
  const addProject = (project: AppProject) => setProjects((prev) => [project, ...prev]);
  const donate = (campaignId: string, amount: number) =>
    setCampaigns((prev) =>
      prev.map((c) => (c.id === campaignId ? { ...c, raised: c.raised + amount } : c))
    );
  const rsvpEvent = (eventId: string, userId: string) =>
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id !== eventId) return e;
        const alreadyIn = e.attendees.some((a) => a.user.id === userId);
        return {
          ...e,
          attendees: alreadyIn
            ? e.attendees.filter((a) => a.user.id !== userId)
            : [...e.attendees, { user: { id: userId, name: "", avatar: null } }],
        };
      })
    );
  const login = () => {};
  const logout = async () => {
    const { signOut } = await import("next-auth/react");
    signOut({ callbackUrl: "/login" });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser, users, jobs, events, forums, projects, campaigns, isLoading,
        refreshJobs, refreshEvents, refreshForums, refreshProjects, refreshCampaigns,
        addJob, addEvent, addForumPost, addProject, donate, rsvpEvent, login, logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error("useAppContext must be used within an AppProvider");
  return context;
}
