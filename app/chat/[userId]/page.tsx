"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Send, ArrowLeft } from 'lucide-react';

export default function ChatPage() {
  const { userId } = useParams();
  const { users, currentUser } = useAppContext();
  const router = useRouter();
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: 'Hi, how can I help you today?' }
  ]);

  const otherUser = users.find(u => u.id === userId);

  // If user doesn't exist, go back
  useEffect(() => {
    if (!otherUser) {
      router.back();
    }
  }, [otherUser, router]);

  if (!otherUser || !currentUser) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages([...messages, { id: Date.now(), sender: 'me', text: message }]);
    setMessage('');

    // Mock reply
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), sender: 'them', text: 'I received your message! I will get back to you shortly.' }]);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <Card className="flex-1 flex flex-col border-0 shadow-none bg-slate-50">
        <CardHeader className="bg-blue-600 text-white p-4 rounded-t-xl shrink-0 flex flex-row items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <CardTitle className="text-lg">Chat Room: {otherUser.name}</CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex flex-col max-w-[70%]">
                <span className="text-xs text-slate-500 mb-1 ml-1">
                  {msg.sender === 'me' ? currentUser.name : otherUser.name}
                </span>
                <div 
                  className={`rounded-2xl px-4 py-2 ${
                    msg.sender === 'me' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white border text-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        
        <CardFooter className="p-4 bg-white border-t mt-auto shrink-0">
          <form onSubmit={handleSend} className="flex w-full gap-2">
            <Input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1"
            />
            <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700 h-10 w-10 shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
