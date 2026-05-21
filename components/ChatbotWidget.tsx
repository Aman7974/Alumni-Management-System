"use client";

import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import { Input } from './ui/Input';
import { useAppContext } from '@/context/AppContext';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{sender: 'user' | 'bot', text: string}[]>([
    { sender: 'bot', text: 'Hi there! How can I help you navigate the alumni portal?' }
  ]);
  const { currentUser } = useAppContext();

  if (!currentUser) return null;

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { sender: 'user', text: message }]);
    setMessage('');
    
    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'I am a demo assistant. You can check out the directory to find alumni, or the events page to see upcoming webinars!' 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 shadow-xl flex flex-col h-96 border-blue-200">
          <CardHeader className="bg-blue-600 text-white rounded-t-xl py-3 px-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Alumni Assistant
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:text-slate-200 hover:bg-blue-700" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-3 py-2 max-w-[80%] text-sm ${
                  msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="p-3 border-t">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex w-full gap-2"
            >
              <Input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask something..." 
                className="flex-1 text-sm h-9"
              />
              <Button type="submit" size="icon" className="h-9 w-9 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button 
          size="icon" 
          className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
