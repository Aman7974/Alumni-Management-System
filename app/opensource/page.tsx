"use client";

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Code, ExternalLink, Users } from 'lucide-react';
import Link from 'next/link';

export default function OpenSourcePage() {
  const { projects } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Open Source Collaboration</h1>
        <Button className="bg-slate-900 text-white hover:bg-slate-800">Submit Project</Button>
      </div>

      <p className="text-slate-600 max-w-2xl">
        Discover and contribute to community and college projects. Collaborate with alumni and students to build something amazing.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map(project => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  {project.title}
                </CardTitle>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {project.contributors.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <p className="text-slate-600 text-sm">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Link href={project.repoLink} target="_blank" className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1">
                View Repository <ExternalLink className="w-4 h-4" />
              </Link>
              <Button>Join Team</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
