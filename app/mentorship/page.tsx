"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Calendar, Clock } from 'lucide-react';

export default function MentorshipPage() {
  const { currentUser, users } = useAppContext();
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);

  const mentors = users.filter(u => u.role?.toUpperCase() === 'ALUMNI' && u.mentoringAvailable);

  if (currentUser?.role?.toUpperCase() === 'ALUMNI') {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Mentorship Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50">
              <div>
                <p className="font-medium text-slate-900">Mentorship Status</p>
                <p className="text-sm text-slate-500">Allow students to book 1:1 sessions with you.</p>
              </div>
              <Button variant={currentUser.mentoringAvailable ? "default" : "outline"} className={currentUser.mentoringAvailable ? "bg-green-600 hover:bg-green-700 text-white" : ""}>
                {currentUser.mentoringAvailable ? 'Available' : 'Unavailable'}
              </Button>
            </div>
            {/* Additional settings could go here */}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Find a Mentor</h1>
      <p className="text-slate-600">Connect with alumni for career guidance, mock interviews, or resume reviews.</p>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {mentors.map(mentor => (
            <Card
              key={mentor.id}
              className={`cursor-pointer transition-all ${selectedMentor === mentor.id ? 'ring-2 ring-blue-500 shadow-md' : 'hover:border-blue-300'}`}
              onClick={() => setSelectedMentor(mentor.id)}
            >
              <CardContent className="p-6 flex items-start gap-4">
                <Avatar src={mentor.avatar} fallback={mentor.name} size="lg" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{mentor.name}</h3>
                  <p className="text-blue-600 font-medium text-sm">{mentor.jobTitle} @ {mentor.company}</p>
                  <p className="text-sm text-slate-500 mt-1">Batch of {mentor.batch} • {mentor.department}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          {selectedMentor ? (
            <Card className="sticky top-6">
              <CardHeader className="bg-blue-50 border-b pb-4">
                <CardTitle className="text-blue-900">Book Session</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Select Date</label>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {['Tomorrow', 'Wed', 'Thu'].map((day, i) => (
                      <div key={i} className={`p-2 rounded border text-sm cursor-pointer ${i === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-slate-50'}`}>
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Select Time</label>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    {['10:00 AM', '02:00 PM', '04:30 PM', '06:00 PM'].map((time, i) => (
                      <div key={i} className={`p-2 rounded border text-sm cursor-pointer ${i === 1 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-slate-50'}`}>
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4" onClick={() => alert('Session booked successfully!')}>
                  Confirm Booking
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full min-h-[300px] flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-400 text-center p-6">
              Select a mentor from the list to view their availability and book a session.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
