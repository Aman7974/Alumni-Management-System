"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

// ─── JOBS ─────────────────────────────────────────────────────────────────────

export async function getJobs() {
  return prisma.job.findMany({
    include: { postedBy: { select: { id: true, name: true, avatar: true, company: true } } },
    orderBy: { postedAt: "desc" },
  });
}

export async function createJob(data: {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  const userId = (session.user as any).id;
  const job = await prisma.job.create({
    data: { ...data, postedById: userId },
  });
  revalidatePath("/placement");
  return job;
}

// ─── EVENTS ───────────────────────────────────────────────────────────────────

export async function getEvents() {
  return prisma.event.findMany({
    include: { attendees: { include: { user: { select: { id: true, name: true, avatar: true } } } } },
    orderBy: { date: "asc" },
  });
}

export async function rsvpEvent(eventId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  const userId = (session.user as any).id;

  const existing = await prisma.eventAttendee.findUnique({
    where: { eventId_userId: { eventId, userId } },
  });

  if (existing) {
    await prisma.eventAttendee.delete({ where: { eventId_userId: { eventId, userId } } });
  } else {
    await prisma.eventAttendee.create({ data: { eventId, userId } });
  }
  revalidatePath("/events");
}

// ─── FORUMS ───────────────────────────────────────────────────────────────────

export async function getForumPosts() {
  return prisma.forumPost.findMany({
    include: { author: { select: { id: true, name: true, avatar: true, role: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function createForumPost(data: { title: string; content: string; category: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  const userId = (session.user as any).id;
  const post = await prisma.forumPost.create({ data: { ...data, authorId: userId } });
  revalidatePath("/forums");
  return post;
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export async function getProjects() {
  return prisma.project.findMany({
    include: { contributors: { include: { user: { select: { id: true, name: true, avatar: true } } } } },
  });
}

export async function joinProject(projectId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  const userId = (session.user as any).id;
  await prisma.projectContributor.upsert({
    where: { projectId_userId: { projectId, userId } },
    update: {},
    create: { projectId, userId },
  });
  revalidatePath("/opensource");
}

// ─── DONATIONS ────────────────────────────────────────────────────────────────

export async function getCampaigns() {
  return prisma.donationCampaign.findMany();
}

export async function donate(campaignId: string, amount: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  const campaign = await prisma.donationCampaign.update({
    where: { id: campaignId },
    data: { raised: { increment: amount } },
  });
  revalidatePath("/donation");
  return campaign;
}

// ─── USERS ────────────────────────────────────────────────────────────────────

export async function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true, name: true, email: true, role: true,
      avatar: true, batch: true, bio: true, skills: true,
      interests: true, education: true, department: true,
      company: true, jobTitle: true, mentoringAvailable: true,
    },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true, name: true, email: true, role: true,
      avatar: true, batch: true, bio: true, skills: true,
      interests: true, education: true, department: true,
      company: true, jobTitle: true, mentoringAvailable: true,
    },
  });
}

export async function updateProfile(data: {
  name?: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  company?: string;
  jobTitle?: string;
  mentoringAvailable?: boolean;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  const userId = (session.user as any).id;
  const updated = await prisma.user.update({ where: { id: userId }, data });
  revalidatePath("/profile");
  return updated;
}

export async function toggleMentoring(available: boolean) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  const userId = (session.user as any).id;
  await prisma.user.update({ where: { id: userId }, data: { mentoringAvailable: available } });
  revalidatePath("/mentorship");
}
