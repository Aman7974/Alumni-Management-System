"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Briefcase, Clock } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export default function PlacementPage() {
  const { jobs, addJob, currentUser } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', company: '', location: '', type: 'Full-time', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    addJob({
      id: `j${Date.now()}`,
      ...newJob,
      postedBy: currentUser,
      postedAt: new Date().toISOString().split('T')[0]
    });
    setShowForm(false);
    setNewJob({ title: '', company: '', location: '', type: 'Full-time', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Job Opportunities</h1>
        {(currentUser?.role === 'Alumni' || currentUser?.role === 'Admin') && (
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Post a Job'}
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="border-blue-200 shadow-md bg-blue-50/30">
          <CardHeader>
            <CardTitle>Post a New Opportunity</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Title</label>
                  <Input value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <Input value={newJob.company} onChange={e => setNewJob({...newJob, company: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    value={newJob.type}
                    onChange={e => setNewJob({...newJob, type: e.target.value})}
                  >
                    <option>Full-time</option>
                    <option>Internship</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description & Requirements</label>
                <textarea 
                  className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  value={newJob.description}
                  onChange={e => setNewJob({...newJob, description: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Submit Posting</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {jobs.map(job => (
          <Card key={job.id} className="hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1 font-medium text-slate-900"><Briefcase className="w-4 h-4 text-slate-400" /> {job.company}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-slate-400" /> {job.location}</span>
                     <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-slate-400" /> {job.postedAt instanceof Date ? job.postedAt.toLocaleDateString() : job.postedAt}</span>
                    {/* <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-slate-400" /> {job.postedAt}</span> */}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="px-3 py-1 text-sm">{job.type}</Badge>
                </div>
              </div>
              <p className="mt-4 text-slate-600">{job.description}</p>
              <div className="mt-6 flex gap-3">
                {currentUser?.role === 'Student' && (
                  <>
                    <Button onClick={() => alert("Application submitted!")}>Apply Now</Button>
                    <Button variant="outline" onClick={() => alert("Referral request drafted!")}>Ask for Referral</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
