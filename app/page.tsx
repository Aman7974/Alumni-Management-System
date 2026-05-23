"use client";

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Briefcase, MessageSquare, Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const { currentUser, jobs, events, forums, campaigns, users } = useAppContext();

  if (!currentUser) return null;

  const role = currentUser.role?.toUpperCase();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-primary rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {currentUser.name}!</h1>
          <p className="text-blue-100 max-w-2xl">
            {role === 'STUDENT'
              ? "Check out the latest job openings and upcoming events to kickstart your career."
              : role === 'ALUMNI'
                ? "Thank you for staying connected. See how you can contribute or mentor current students."
                : "Manage the platform and view system overview."}
          </p>
        </div>
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-0 right-20 -mb-20 w-40 h-40 rounded-full bg-white opacity-10"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Personalized Recommendation Engine Card */}
        <Card className="col-span-full md:col-span-2 lg:col-span-2 border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-2 font-bold tracking-wider uppercase">AI Suggestion</span>
              For You
            </CardTitle>
          </CardHeader>
          <CardContent>
            {role === 'STUDENT' && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">Based on your skills in <span className="font-semibold text-slate-800">React and Node.js</span>, we recommend these opportunities:</p>
                {jobs.slice(0, 1).map(job => (
                  <div key={job.id} className="p-4 border rounded-lg bg-slate-50 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-slate-900">{job.title}</h4>
                      <p className="text-sm text-slate-500">{job.company}</p>
                    </div>
                    <Link href="/placement">
                      <Button variant="outline" size="sm">
                        View Job
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            {role === 'ALUMNI' && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">You have been an active mentor! There are new students looking for guidance in <span className="font-semibold text-slate-800">{currentUser.department || 'your field'}</span>.</p>
                <Link href="/mentorship">
                  <Button>
                    View Mentorship Requests
                  </Button>
                </Link>
              </div>
            )}
            {role !== 'STUDENT' && role !== 'ALUMNI' && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">System overview looks good. There are <span className="font-semibold text-slate-800">{users?.length || 0}</span> registered users and <span className="font-semibold text-slate-800">{campaigns?.length || 0}</span> active campaigns on the platform.</p>
                <Link href="/profile">
                  <Button>
                    Manage System Settings
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats/Links */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-slate-400" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {events.slice(0, 2).map(event => (
                  <div key={event.id} className="text-sm">
                    <p className="font-medium text-slate-900 truncate">{event.title}</p>
                    <p className="text-slate-500">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                ))}
                <Link href="/events" className="text-sm text-blue-600 hover:underline block pt-2">View all events &rarr;</Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Forums */}
        <Card className="col-span-full md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-slate-400" />
              Recent Discussions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {forums.slice(0, 3).map(post => (
                <div key={post.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <Link href="/forums" className="font-medium text-blue-600 hover:underline">{post.title}</Link>
                  <p className="text-sm text-slate-600 line-clamp-1 mt-1">{post.content}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs text-slate-400">{typeof post.createdAt === 'string' ? post.createdAt : new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Campaigns Highlight */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Heart className="mr-2 h-5 w-5 text-slate-400" />
              Active Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.slice(0, 1).map(campaign => (
                <div key={campaign.id}>
                  <h4 className="font-medium text-slate-900 mb-1">{campaign.title}</h4>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 mb-1">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}></div>
                  </div>
                  <p className="text-xs text-slate-500 text-right">${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}</p>
                </div>
              ))}
              <Link href="/donation" className="w-full">
                <Button variant="outline" className="w-full">
                  Donate Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
