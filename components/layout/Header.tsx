"use client";

import React from 'react';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const roleBadgeColor: Record<string, string> = {
  ADMIN: 'bg-purple-100 text-purple-700 border-purple-200',
  ALUMNI: 'bg-green-100 text-green-700 border-green-200',
  STUDENT: 'bg-blue-100 text-blue-700 border-blue-200',
};

export function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as any;

  if (!user) return null;

  const role = user.role as string;

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
      {/* Left: Page title area */}
      <div className="text-sm text-slate-500 hidden sm:block">
        Welcome back, <span className="font-semibold text-slate-800">{user.name}</span>
      </div>

      {/* Right: User info + actions */}
      <div className="flex items-center gap-x-3 ml-auto">
        {role && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${roleBadgeColor[role] || 'bg-slate-100 text-slate-600'}`}>
            {role.charAt(0) + role.slice(1).toLowerCase()}
          </span>
        )}
        <span className="text-sm font-medium text-slate-900 hidden sm:block">{user.name}</span>
        <Button variant="ghost" size="icon" onClick={() => router.push('/profile')} title="My Profile">
          <UserIcon className="h-5 w-5 text-slate-500" />
        </Button>
        <div className="h-6 w-px bg-slate-200" aria-hidden="true" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => signOut({ callbackUrl: '/login' })}
          title="Logout"
        >
          <LogOut className="h-5 w-5 text-slate-500" />
        </Button>
      </div>
    </header>
  );
}
