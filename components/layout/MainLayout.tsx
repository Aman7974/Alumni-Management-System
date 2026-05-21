"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ChatbotWidget } from '../ChatbotWidget'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  useEffect(() => {
    if (status === 'unauthenticated' && !isLoginPage) {
      router.push('/login');
    }
  }, [status, isLoginPage, router]);

  // Login page: render without layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Still loading session
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="mx-auto h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center animate-pulse">
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <p className="text-slate-400 text-sm">Loading your session...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl h-full">
            {children}
          </div>
        </main>
      </div>
      <ChatbotWidget />
    </div>
  );
}
