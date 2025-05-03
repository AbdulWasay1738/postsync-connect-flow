import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, subDays } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Instagram, Facebook, Linkedin, Twitter, Youtube, Users, ThumbsUp, MessageSquare, Share2, CalendarDays, ChevronRight, BarChart3, Sparkles, PlusCircle } from 'lucide-react';
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Container from '@/components/ui/Container';

// Mock data for recent activities
const recentActivities = [
  { id: 1, platform: 'instagram', type: 'like', count: 126, date: subDays(new Date(), 1) },
  { id: 2, platform: 'facebook', type: 'comment', count: 89, date: subDays(new Date(), 1) },
  { id: 3, platform: 'linkedin', type: 'share', count: 54, date: subDays(new Date(), 2) },
  { id: 4, platform: 'twitter', type: 'retweet', count: 187, date: subDays(new Date(), 2) },
  { id: 5, platform: 'youtube', type: 'view', count: 542, date: subDays(new Date(), 3) },
];

// Mock data for audience insights
const audienceInsights = [
  { id: 1, platform: 'instagram', count: 4589, change: 12 },
  { id: 2, platform: 'facebook', count: 7823, change: -5 },
  { id: 3, platform: 'linkedin', count: 2345, change: 8 },
  { id: 4, platform: 'twitter', count: 6102, change: 3 },
  { id: 5, platform: 'youtube', count: 9210, change: 15 },
];

// Mock data for engagement rates
const engagementRates = [
  { date: subDays(new Date(), 6), instagram: 3.2, facebook: 1.8, linkedin: 2.5, twitter: 4.1, youtube: 2.9 },
  { date: subDays(new Date(), 5), instagram: 3.5, facebook: 2.0, linkedin: 2.7, twitter: 4.3, youtube: 3.1 },
  { date: subDays(new Date(), 4), instagram: 3.8, facebook: 2.2, linkedin: 2.9, twitter: 4.5, youtube: 3.3 },
  { date: subDays(new Date(), 3), instagram: 4.1, facebook: 2.4, linkedin: 3.1, twitter: 4.7, youtube: 3.5 },
  { date: subDays(new Date(), 2), instagram: 4.4, facebook: 2.6, linkedin: 3.3, twitter: 4.9, youtube: 3.7 },
  { date: subDays(new Date(), 1), instagram: 4.7, facebook: 2.8, linkedin: 3.5, twitter: 5.1, youtube: 3.9 },
  { date: new Date(), instagram: 5.0, facebook: 3.0, linkedin: 3.7, twitter: 5.3, youtube: 4.1 },
];

// Mock data for website traffic
const websiteTraffic = [
  { date: subDays(new Date(), 6), desktop: 450, mobile: 320, tablet: 180 },
  { date: subDays(new Date(), 5), desktop: 480, mobile: 340, tablet: 190 },
  { date: subDays(new Date(), 4), desktop: 510, mobile: 360, tablet: 200 },
  { date: subDays(new Date(), 3), desktop: 540, mobile: 380, tablet: 210 },
  { date: subDays(new Date(), 2), desktop: 570, mobile: 400, tablet: 220 },
  { date: subDays(new Date(), 1), desktop: 600, mobile: 420, tablet: 230 },
  { date: new Date(), desktop: 630, mobile: 440, tablet: 240 },
];

// Social platforms data
const platforms = [
  { id: 'instagram', name: 'Instagram', icon: <Instagram />, color: '#E1306C' },
  { id: 'facebook', name: 'Facebook', icon: <Facebook />, color: '#4267B2' },
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin />, color: '#0077B5' },
  { id: 'twitter', name: 'Twitter', icon: <Twitter />, color: '#1DA1F2' },
  { id: 'pinterest', name: 'Pinterest', icon: <Twitter />, color: '#E60023' }, // Using Twitter as replacement
  { id: 'youtube', name: 'YouTube', icon: <Youtube />, color: '#FF0000' },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);

  // Function to get greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good morning';
    } else if (hour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <Container>
        <div className="py-8">
          <h1 className="text-2xl md:text-3xl font-bold font-inter mb-2">
            {getGreeting()}, Welcome back!
          </h1>
          <p className="text-postsync-muted">
            Here's a snapshot of your social media performance.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Audience Insights */}
              {audienceInsights.map(platform => (
                <Card key={platform.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {platforms.find(p => p.id === platform.platform)?.icon}
                      <span>{platforms.find(p => p.id === platform.platform)?.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-semibold">{platform.count}</div>
                    <div className="text-sm text-postsync-muted">
                      {platform.change > 0 ? (
                        <span className="text-green-500">+ {platform.change}%</span>
                      ) : (
                        <span className="text-red-500">- {Math.abs(platform.change)}%</span>
                      )}
                      <span> from last month</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Engagement Rates Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementRates} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(date) => format(date, 'MMM d')} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="instagram" stroke="#E1306C" name="Instagram" />
                    <Line type="monotone" dataKey="facebook" stroke="#4267B2" name="Facebook" />
                    <Line type="monotone" dataKey="linkedin" stroke="#0077B5" name="LinkedIn" />
                    <Line type="monotone" dataKey="twitter" stroke="#1DA1F2" name="Twitter" />
                    <Line type="monotone" dataKey="youtube" stroke="#FF0000" name="YouTube" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            Analytics content goes here.
          </TabsContent>
          
          <TabsContent value="calendar">
            Calendar content goes here.
          </TabsContent>
        </Tabs>
        
        {/* Quick Actions Sidebar */}
        <div className="hidden lg:block fixed right-4 top-24 w-64 bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link to="/create" className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
              <PlusCircle className="mr-2 text-postsync-primary" size={18} />
              Create New Post
            </Link>
            <Link to="/ai-captions" className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
              <Sparkles className="mr-2 text-postsync-secondary" size={18} />
              Generate AI Caption
            </Link>
            <Link to="/calendar" className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
              <CalendarDays className="mr-2 text-green-500" size={18} />
              View Calendar
            </Link>
            <Link to="/analytics" className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
              <BarChart3 className="mr-2 text-purple-500" size={18} />
              View Analytics
            </Link>
          </div>
          
          {/* Recent Activities */}
          <div className="mt-6">
            <Collapsible open={isActivitiesOpen} onOpenChange={setIsActivitiesOpen}>
              <CollapsibleTrigger className="w-full flex items-center justify-between py-2">
                <h4 className="text-sm font-medium">Recent Activities</h4>
                <ChevronRight className={`h-4 w-4 transition-transform ${isActivitiesOpen ? 'rotate-90' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-2 space-y-1">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-center space-x-2 text-xs">
                    {platforms.find(p => p.id === activity.platform)?.icon}
                    <span>{activity.count} {activity.type} on {platforms.find(p => p.id === activity.platform)?.name}</span>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          <div className="mt-6">
            <Link to="/settings" className="text-xs text-postsync-muted hover:underline flex items-center justify-end">
              <ChevronRight size={14} className="mr-1" /> Go to Settings
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
