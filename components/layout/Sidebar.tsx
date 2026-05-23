"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  Code, 
  Briefcase, 
  CreditCard, 
  User as UserIcon 
} from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Batches', href: '/batches', icon: Users },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Forums', href: '/forums', icon: MessageSquare },
  { name: 'Mentorship', href: '/mentorship', icon: BookOpen },
  { name: 'OpenSource', href: '/opensource', icon: Code },
  { name: 'Placement', href: '/placement', icon: Briefcase },
  { name: 'Donation', href: '/donation', icon: CreditCard },
  { name: 'My Profile', href: '/profile', icon: UserIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-slate-200">
      <div className="flex h-24 items-center justify-center p-4">
        {/* Real Logo */}
        <div className="flex items-center justify-center w-full h-full">
          <img 
            src="/assets/logo.png" 
            alt="Alumni Management System Logo" 
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-slate-100 text-slate-900" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-slate-900" : "text-slate-400 group-hover:text-slate-500"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
