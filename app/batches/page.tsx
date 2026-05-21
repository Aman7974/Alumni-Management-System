"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';

export default function BatchesPage() {
  // Generate batches dynamically or use hardcoded from images
  const batches = Array.from({ length: 9 }, (_, i) => 2015 + i);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Alumni Directory</h1>
      </div>
      
      <div className="bg-gradient-primary p-8 rounded-2xl shadow-inner min-h-[60vh]">
        <h2 className="text-center text-3xl font-bold text-white mb-8">Alumni Directory</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {batches.map((year) => (
            <Link key={year} href={`/batches/${year}`}>
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer backdrop-blur-sm">
                <CardContent className="flex items-center justify-center p-10">
                  <h3 className="text-2xl font-bold text-white tracking-wide">Batch of {year}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
