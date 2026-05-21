"use client";

import React, { useEffect, useState } from 'react';
import { useAppContext, AppUser } from '@/context/AppContext';
import { useSearchParams } from 'next/navigation';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Code, Briefcase, Link as LinkIcon, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { currentUser, users } = useAppContext();
  const searchParams = useSearchParams();
  const profileId = searchParams?.get('id');
  
  const [profile, setProfile] = useState<AppUser | null>(null);

  useEffect(() => {
    if (profileId) {
      const p = users.find(u => u.id === profileId);
      if (p) setProfile(p);
    } else {
      setProfile(currentUser);
    }
  }, [profileId, users, currentUser]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-gradient-primary rounded-2xl overflow-hidden shadow-lg text-white">
        {/* Banner area */}
        <div className="h-32 bg-white/10 backdrop-blur-sm relative"></div>
        
        {/* Profile Info area */}
        <div className="px-8 pb-8 relative -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row gap-6 items-end sm:items-center">
            <Avatar 
              src={profile.avatar} 
              fallback={profile.name} 
              className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-white bg-white shadow-xl"
            />
            <div className="flex-1 space-y-1 mt-4 sm:mt-0 pt-16 sm:pt-0">
              <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
              <div className="text-blue-100 flex flex-col sm:flex-row gap-y-1 sm:gap-x-4">
                <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {profile.email}</span>
                {profile.batch && <span>• Batch of {profile.batch}</span>}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge className="bg-green-400 text-green-950 border-0 hover:bg-green-400">{profile.role}</Badge>
                {profile.department && <Badge variant="secondary" className="bg-white/20 text-white border-0 hover:bg-white/20">{profile.department}</Badge>}
              </div>
            </div>
            
            {/* Social links */}
            <div className="flex sm:flex-col gap-3 ml-auto text-blue-200">
              <Link href="#" className="hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"><Code className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"><Briefcase className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"><LinkIcon className="w-5 h-5" /></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Bio</h3>
              <p className="text-slate-600 leading-relaxed">
                {profile.bio || `Hi, I am ${profile.name}. I am a ${profile.role.toLowerCase()} at the university.`}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills ? profile.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="bg-slate-100 text-slate-800 text-sm font-normal py-1 px-3">
                    {skill}
                  </Badge>
                )) : (
                  <p className="text-slate-500 text-sm">No skills added yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Education</h3>
                <p className="text-slate-600">{profile.education || 'N/A'}</p>
              </div>
              <div className="h-px bg-slate-100" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Current Role</h3>
                <p className="text-slate-600 font-medium">{profile.jobTitle || 'Student'}</p>
                <p className="text-slate-500 text-sm">{profile.company || 'University'}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests ? profile.interests.map(interest => (
                  <Badge key={interest} variant="outline" className="border-slate-200 text-slate-600 text-xs">
                    {interest}
                  </Badge>
                )) : (
                  <p className="text-slate-500 text-sm">No interests added yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
