"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function BatchDetailsPage() {
  const { year } = useParams();
  const { users } = useAppContext();
  const [search, setSearch] = useState('');

  // Get alumni for this batch
  const batchAlumni = users.filter(u => u.role?.toUpperCase() === 'ALUMNI' && u.batch === year);
  
  const filteredAlumni = batchAlumni.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    (u.department && u.department.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/batches" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Batch of {year}</h1>
      </div>
      
      <div className="bg-gradient-primary p-8 rounded-2xl shadow-inner min-h-[60vh] relative">
        <div className="flex justify-between items-center mb-8 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white">Batch of {year}</h2>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input 
              type="text" 
              placeholder="Search students..." 
              className="pl-9 bg-white/90 border-white/20 focus-visible:ring-white/50 h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map((alumni) => (
              <Card key={alumni.id} className="bg-white/10 border-white/20 backdrop-blur-sm shadow-none flex flex-row items-center p-6 gap-4">
                <Avatar src={alumni.avatar} fallback={alumni.name} size="lg" className="border-2 border-white/20" />
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-white">{alumni.name}</h3>
                  <p className="text-sm text-blue-100 mb-2">{alumni.department || 'N/A'}</p>
                  <div className="flex gap-3 text-sm">
                    <Link href={`/profile?id=${alumni.id}`} className="text-yellow-400 hover:text-yellow-300 font-medium">LinkedIn</Link>
                    <Link href={`/chat/${alumni.id}`} className="text-yellow-400 hover:text-yellow-300 font-medium">Chat</Link>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-white/70 py-10">
              No alumni found for this batch.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
