"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heart } from 'lucide-react';

export default function DonationPage() {
  const { campaigns, donate } = useAppContext();
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [amount, setAmount] = useState(50);

  const handleDonate = () => {
    if (selectedCampaign) {
      donate(selectedCampaign, amount);
      alert(`Successfully donated $${amount}! Thank you for your support.`);
      setSelectedCampaign(null);
      setAmount(50);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-primary rounded-2xl p-8 text-white shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Fundraising & Donations</h1>
          <p className="text-blue-100 max-w-2xl">
            Support your alma mater by contributing to campus improvements, scholarships, and special projects.
          </p>
        </div>
        <Heart className="w-16 h-16 text-white/20 hidden md:block" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {campaigns.map(campaign => {
          const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);
          
          return (
            <Card key={campaign.id} className={`flex flex-col ${selectedCampaign === campaign.id ? 'ring-2 ring-blue-500 shadow-md' : ''}`}>
              <CardHeader>
                <CardTitle>{campaign.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-slate-600 text-sm">{campaign.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-900">${campaign.raised.toLocaleString()} raised</span>
                    <span className="text-slate-500">Goal: ${campaign.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-right text-slate-500">{progress.toFixed(0)}% funded</p>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t">
                {selectedCampaign === campaign.id ? (
                  <div className="w-full space-y-4">
                    <div className="grid grid-cols-4 gap-2">
                      {[25, 50, 100, 500].map(val => (
                        <Button 
                          key={val} 
                          variant={amount === val ? "default" : "outline"}
                          size="sm"
                          onClick={() => setAmount(val)}
                        >
                          ${val}
                        </Button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleDonate}>
                        Confirm Donation
                      </Button>
                      <Button variant="ghost" onClick={() => setSelectedCampaign(null)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <Button className="w-full" onClick={() => setSelectedCampaign(campaign.id)}>
                    Donate to Campaign
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
