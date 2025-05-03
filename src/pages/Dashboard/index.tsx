
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, subDays } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Instagram, Facebook, Linkedin, Twitter, Youtube, Users, ThumbsUp, MessageSquare, Share2, BarChart3, Sparkles, PlusCircle, TrendingUp, TrendingDown, Eye } from 'lucide-react';
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Container from '@/components/ui/Container';

// Mock data for recent activities
const recentActivities = [
  { id: 1, platform: 'instagram', type: 'like', count: 126, date: subDays(new Date(), 1) },
  { id: 2, platform: 'facebook', type: 'comment', count: 89, date: subDays(new Date(), 1) },
  { id: 3, platform: 'linkedin', type: 'share', count: 54, date: subDays(new Date(), 2) },
  { id: 4, platform: 'twitter', type: 'retweet', count: 187, date: subDays(new Date(), 2) },
  { id: 5, platform: 'youtube', type: 'view', count: 542, date: subDays(new Date(), 3) },
];

// Enhanced platform insights with multiple metrics
const platformInsights = [
  { id: 1, platform: 'instagram', followers: 4589, engagement: 3.2, reach: 12500, growth: 12, views: 8700 },
  { id: 2, platform: 'facebook', followers: 7823, engagement: 2.1, reach: 18300, growth: -5, views: 15200 },
  { id: 3, platform: 'linkedin', followers: 2345, engagement: 4.8, reach: 8900, growth: 8, views: 6300 },
  { id: 4, platform: 'twitter', followers: 6102, engagement: 5.3, reach: 22100, growth: 3, views: 19800 },
  { id: 5, platform: 'youtube', followers: 9210, engagement: 4.1, reach: 31200, growth: 15, views: 29500 },
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

// Social platforms data with updated colors and branding
const platforms = [
  { id: 'instagram', name: 'Instagram', icon: <Instagram />, color: '#E1306C', logo: '/instagram-logo.png' },
  { id: 'facebook', name: 'Facebook', icon: <Facebook />, color: '#4267B2', logo: '/facebook-logo.png' },
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin />, color: '#0077B5', logo: '/linkedin-logo.png' },
  { id: 'twitter', name: 'Twitter', icon: <Twitter />, color: '#1DA1F2', logo: '/twitter-logo.png' },
  { id: 'youtube', name: 'YouTube', icon: <Youtube />, color: '#FF0000', logo: '/youtube-logo.png' },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMetric, setSelectedMetric] = useState('followers');

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

  // Get metric icon based on type
  const getMetricIcon = (metric: string) => {
    switch(metric) {
      case 'followers': return <Users className="h-5 w-5" />;
      case 'engagement': return <ThumbsUp className="h-5 w-5" />;
      case 'reach': return <Eye className="h-5 w-5" />;
      case 'growth': return <TrendingUp className="h-5 w-5" />;
      case 'views': return <BarChart3 className="h-5 w-5" />;
      default: return <Users className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen pb-12 animate-fade-in">
      <Container>
        <div className="py-8">
          <h1 className="text-2xl md:text-3xl font-bold font-inter mb-2">
            {getGreeting()}, Welcome back!
          </h1>
          <p className="text-muted-foreground">
            Here's a snapshot of your social media performance.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {/* Metric Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['followers', 'engagement', 'reach', 'growth', 'views'].map((metric) => (
                <Button 
                  key={metric} 
                  variant={selectedMetric === metric ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMetric(metric)}
                  className="flex items-center gap-2"
                >
                  {getMetricIcon(metric)}
                  <span className="capitalize">{metric}</span>
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Platform Cards */}
              {platformInsights.map(platform => {
                // Select the current metric to display
                let metricValue = platform[selectedMetric as keyof typeof platform];
                let metricLabel = selectedMetric;
                let metricIcon = getMetricIcon(selectedMetric);
                let metricFormat = '';
                
                if (selectedMetric === 'engagement') {
                  metricFormat = '%';
                } else if (selectedMetric === 'growth') {
                  metricFormat = '%';
                }

                return (
                  <Card key={platform.id} className="shadow-card hover:shadow-hover transition-shadow dark:bg-card">
                    <Link to={`/analytics?platform=${platform.platform}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {platforms.find(p => p.id === platform.platform)?.icon}
                            <CardTitle className="text-base">{platforms.find(p => p.id === platform.platform)?.name}</CardTitle>
                          </div>
                          {metricIcon}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-semibold">
                          {metricValue}{metricFormat}
                        </div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {platform.growth > 0 ? (
                            <span className="flex items-center text-green-500">
                              <TrendingUp className="mr-1 h-4 w-4" /> {platform.growth}%
                            </span>
                          ) : (
                            <span className="flex items-center text-red-500">
                              <TrendingDown className="mr-1 h-4 w-4" /> {Math.abs(platform.growth)}%
                            </span>
                          )}
                          <span> from last month</span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
            </div>
            
            {/* Engagement Rates Chart */}
            <Card className="shadow-card dark:bg-card">
              <CardHeader>
                <CardTitle>Engagement Rates</CardTitle>
                <CardDescription>Track engagement across all platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementRates} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => format(date, 'MMM d')} 
                      stroke="var(--muted-foreground)"
                    />
                    <YAxis stroke="var(--muted-foreground)" />
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

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-card hover:shadow-hover transition-shadow">
                <Link to="/create">
                  <CardContent className="flex flex-col items-center justify-center h-32">
                    <PlusCircle className="h-10 w-10 mb-2" />
                    <h3 className="font-medium text-lg">Create Post</h3>
                  </CardContent>
                </Link>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-card hover:shadow-hover transition-shadow">
                <Link to="/ai-captions">
                  <CardContent className="flex flex-col items-center justify-center h-32">
                    <Sparkles className="h-10 w-10 mb-2" />
                    <h3 className="font-medium text-lg">AI Captions</h3>
                  </CardContent>
                </Link>
              </Card>
              <Card className="bg-gradient-to-br from-green-500 to-teal-500 text-white shadow-card hover:shadow-hover transition-shadow">
                <Link to="/calendar">
                  <CardContent className="flex flex-col items-center justify-center h-32">
                    <PlusCircle className="h-10 w-10 mb-2" />
                    <h3 className="font-medium text-lg">Schedule Post</h3>
                  </CardContent>
                </Link>
              </Card>
              <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-card hover:shadow-hover transition-shadow">
                <Link to="/analytics">
                  <CardContent className="flex flex-col items-center justify-center h-32">
                    <BarChart3 className="h-10 w-10 mb-2" />
                    <h3 className="font-medium text-lg">Analytics</h3>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="insights">
            <Card className="shadow-card dark:bg-card">
              <CardHeader>
                <CardTitle>Platform Insights</CardTitle>
                <CardDescription>Detailed analytics for each platform</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {platformInsights.map(platform => (
                  <Card key={platform.id} className="shadow-sm dark:bg-card/80">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        {platforms.find(p => p.id === platform.platform)?.icon}
                        <CardTitle className="text-base">{platforms.find(p => p.id === platform.platform)?.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Followers</span>
                        <span className="font-medium">{platform.followers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Engagement Rate</span>
                        <span className="font-medium">{platform.engagement}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Reach</span>
                        <span className="font-medium">{platform.reach.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Views</span>
                        <span className="font-medium">{platform.views.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Growth</span>
                        <span className={`font-medium ${platform.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {platform.growth > 0 ? '+' : ''}{platform.growth}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content">
            <Card className="shadow-card dark:bg-card">
              <CardHeader>
                <CardTitle>Recent Content Performance</CardTitle>
                <CardDescription>How your recent posts are performing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="flex items-center justify-between p-3 rounded-md border">
                      <div className="flex items-center gap-3">
                        {platforms.find(p => p.id === activity.platform)?.icon}
                        <div>
                          <p className="font-medium">{activity.count} {activity.type}s</p>
                          <p className="text-sm text-muted-foreground">{format(activity.date, 'MMM d, yyyy')}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
};

export default Dashboard;
