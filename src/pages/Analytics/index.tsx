import React, { useState } from 'react';
import { format, subDays } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Instagram, Facebook, Linkedin, Twitter, Youtube } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for analytics
const mockAnalyticsData = {
  pageViews: [
    { date: subDays(new Date(), 6).toISOString().split('T')[0], views: 200 },
    { date: subDays(new Date(), 5).toISOString().split('T')[0], views: 300 },
    { date: subDays(new Date(), 4).toISOString().split('T')[0], views: 400 },
    { date: subDays(new Date(), 3).toISOString().split('T')[0], views: 350 },
    { date: subDays(new Date(), 2).toISOString().split('T')[0], views: 450 },
    { date: subDays(new Date(), 1).toISOString().split('T')[0], views: 500 },
    { date: new Date().toISOString().split('T')[0], views: 600 },
  ],
  engagement: [
    { date: subDays(new Date(), 6).toISOString().split('T')[0], likes: 50, comments: 10, shares: 5 },
    { date: subDays(new Date(), 5).toISOString().split('T')[0], likes: 60, comments: 12, shares: 6 },
    { date: subDays(new Date(), 4).toISOString().split('T')[0], likes: 70, comments: 15, shares: 7 },
    { date: subDays(new Date(), 3).toISOString().split('T')[0], likes: 65, comments: 13, shares: 6 },
    { date: subDays(new Date(), 2).toISOString().split('T')[0], likes: 75, comments: 16, shares: 8 },
    { date: subDays(new Date(), 1).toISOString().split('T')[0], likes: 80, comments: 18, shares: 9 },
    { date: new Date().toISOString().split('T')[0], likes: 90, comments: 20, shares: 10 },
  ],
  platformDistribution: [
    { platform: 'Instagram', percentage: 30 },
    { platform: 'Facebook', percentage: 25 },
    { platform: 'LinkedIn', percentage: 20 },
    { platform: 'Twitter', percentage: 15 },
    { platform: 'Pinterest', percentage: 5 },
    { platform: 'YouTube', percentage: 5 },
  ],
};

// Helper function to format dates
const formatDate = (date: string) => format(new Date(date), 'MMM dd');

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('7d'); // 7d, 30d, 90d
  const [selectedPlatform, setSelectedPlatform] = useState('all'); // all, instagram, facebook, linkedin, twitter, youtube

  // Filter data based on timeframe
  const getFilteredPageViews = () => {
    const startDate = subDays(new Date(), getTimeframeDays(timeframe));
    return mockAnalyticsData.pageViews.filter(item => new Date(item.date) >= startDate);
  };

  const getFilteredEngagement = () => {
    const startDate = subDays(new Date(), getTimeframeDays(timeframe));
    return mockAnalyticsData.engagement.filter(item => new Date(item.date) >= startDate);
  };

  // Filter platform distribution data based on selected platform
  const getFilteredPlatformDistribution = () => {
    if (selectedPlatform === 'all') {
      return mockAnalyticsData.platformDistribution;
    } else {
      return mockAnalyticsData.platformDistribution.filter(item =>
        item.platform.toLowerCase() === selectedPlatform
      );
    }
  };

  // Helper function to get the number of days for the selected timeframe
  const getTimeframeDays = (timeframe: string) => {
    switch (timeframe) {
      case '7d':
        return 7;
      case '30d':
        return 30;
      case '90d':
        return 90;
      default:
        return 7;
    }
  };

  // Function to get the platform icon based on platform name
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram size={20} />;
      case 'facebook':
        return <Facebook size={20} />;
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'twitter':
        return <Twitter size={20} />;
      case 'pinterest':
        return <Twitter size={20} />; // Using Twitter icon as a replacement for Pinterest
      case 'youtube':
        return <Youtube size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <Container>
        <div className="py-8">
          <h1 className="text-2xl md:text-3xl font-bold font-inter mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-postsync-muted">
            Track your social media performance and engagement
          </p>
        </div>

        <Tabs defaultValue="overview" className="max-w-4xl mx-auto">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Page Views</h2>
              <Select onValueChange={setTimeframe} defaultValue={timeframe}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Card>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={getFilteredPageViews()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDate} />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="views" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Engagement Metrics</h2>
              <Select onValueChange={setTimeframe} defaultValue={timeframe}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Card>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getFilteredEngagement()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDate} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="likes" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="comments" stroke="#8884d8" />
                    <Line type="monotone" dataKey="shares" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Platform Distribution</h2>
              <Select onValueChange={setSelectedPlatform} defaultValue={selectedPlatform}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="pinterest">Pinterest</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Card>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getFilteredPlatformDistribution()}
                      dataKey="percentage"
                      nameKey="platform"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {getFilteredPlatformDistribution().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
};

export default Analytics;
