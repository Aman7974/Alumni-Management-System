"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar as CalendarIcon, MapPin, Users } from 'lucide-react';
import { rsvpEvent as rsvpEventAction } from '@/lib/actions';

export default function EventsPage() {
  const { events, currentUser, rsvpEvent, refreshEvents } = useAppContext();
  const [filter, setFilter] = useState<'all' | 'my'>('all');

  const displayedEvents = filter === 'my' 
    ? events.filter(e => e.attendees.some(a => a.user.id === (currentUser?.id || '')))
    : events;

  const handleRsvp = async (eventId: string) => {
    if (!currentUser) return;
    try {
      await rsvpEventAction(eventId);
      rsvpEvent(eventId, currentUser.id);
    } catch (err) {
      console.error('RSVP failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Events &amp; Calendar</h1>
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
            onClick={() => setFilter('all')}
          >
            All Events
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'my' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
            onClick={() => setFilter('my')}
          >
            My RSVPs
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {displayedEvents.map(event => {
          const date = new Date(event.date);
          const isAttending = event.attendees.some(a => a.user.id === (currentUser?.id || ''));
          
          return (
            <Card key={event.id} className="flex flex-col">
              <CardHeader className="pb-3 border-b border-slate-100">
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-xl text-blue-900">{event.title}</CardTitle>
                  <div className="flex flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-lg p-2 min-w-[60px]">
                    <span className="text-xs font-semibold uppercase">{date.toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-xl font-bold">{date.getDate()}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pt-4 space-y-4">
                <p className="text-sm text-slate-600">{event.description}</p>
                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-slate-400" />
                    <span>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span>{event.attendees.length} attending</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-slate-100">
                <Button 
                  className="w-full"
                  variant={isAttending ? "outline" : "default"}
                  onClick={() => handleRsvp(event.id)}
                >
                  {isAttending ? 'Cancel RSVP' : 'RSVP Now'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
