"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';

export default function ForumsPage() {
  const { forums, users, addForumPost, currentUser } = useAppContext();
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newTitle || !newContent) return;

    addForumPost({
      id: `f${Date.now()}`,
      title: newTitle,
      content: newContent,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        role: currentUser.role
      },
      createdAt: new Date().toISOString().split('T')[0],
      category: 'General'
    });
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Forums</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {forums.map(post => {
            const author = post.author;
            const displayDate = typeof post.createdAt === 'string' ? post.createdAt : new Date(post.createdAt).toLocaleDateString();
            return (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4 items-start">
                    <Avatar src={author?.avatar || undefined} fallback={author?.name} />
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-slate-900">{post.title}</h3>
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                      <p className="text-sm text-slate-500">
                        by {author?.name} on {displayDate}
                      </p>
                      <p className="text-slate-700 mt-2 whitespace-pre-wrap">{post.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePost} className="space-y-4">
                <div>
                  <Input
                    placeholder="Post title"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <textarea
                    className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="What's on your mind?"
                    value={newContent}
                    onChange={e => setNewContent(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Post to Forum</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
