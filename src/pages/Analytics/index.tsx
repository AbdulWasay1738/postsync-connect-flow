
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format, subDays } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Instagram, Facebook, Linkedin, Twitter, Youtube, Users, Eye, ThumbsUp, MessageSquare, Share2, Info } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
    { platform: 'Instagram', percentage: 30, color: '#E1306C' },
    { platform: 'Facebook', percentage: 25, color: '#4267B2' },
    { platform: 'LinkedIn', percentage: 20, color: '#0077B5' },
    { platform: 'Twitter', percentage: 15, color: '#1DA1F2' },
    { platform: 'YouTube', percentage: 10, color: '#FF0000' },
  ],
  audienceData: {
    ageDistribution: [
      { age: '13-17', percentage: 5 },
      { age: '18-24', percentage: 25 },
      { age: '25-34', percentage: 35 },
      { age: '35-44', percentage: 20 },
      { age: '45-54', percentage: 10 },
      { age: '55+', percentage: 5 },
    ],
    genderDistribution: [
      { gender: 'Female', percentage: 58 },
      { gender: 'Male', percentage: 40 },
      { gender: 'Other', percentage: 2 },
    ],
    locationDistribution: [
      { location: 'United States', percentage: 45 },
      { location: 'United Kingdom', percentage: 15 },
      { location: 'Canada', percentage: 10 },
      { location: 'Australia', percentage: 8 },
      { location: 'Germany', percentage: 7 },
      { location: 'Others', percentage: 15 },
    ],
  },
  platformSpecificData: {
    instagram: {
      reachGrowth: 12,
      impressions: 24500,
      profileVisits: 1850,
      storiesEngagement: 68,
      topHashtags: ['#design', '#creative', '#inspiration', '#photography', '#art'],
      bestPostingTimes: ['Monday 8am', 'Wednesday 12pm', 'Friday 6pm']
    },
    facebook: {
      pageEngagement: 3.2,
      clickThroughRate: 2.8,
      videoViews: 18700,
      pageImpressions: 31200,
      topPerformingContent: ['Video posts', 'Link shares', 'Photo carousels'],
      demographicReach: ['25-34 age group', 'Urban areas', 'Mobile users']
    },
    linkedin: {
      companyPageClicks: 850,
      followerGrowth: 7.5,
      contentImpressions: 12300,
      profileViews: 920,
      engagementByContentType: ['Thought leadership', 'Industry news', 'Company updates']
    },
    twitter: {
      impressions: 21500,
      profileVisits: 1270,
      mentionEngagement: 4.7,
      topPerformingTweets: ['Industry news', 'Quick tips', 'Interactive polls'],
      retweetRate: 2.3
    },
    youtube: {
      viewDuration: '4:32 avg',
      subscriberGrowth: 5.8,
      viewThroughRate: 52,
      topVideos: ['Tutorial videos', 'Behind the scenes', 'Product reviews'],
      commentEngagement: 3.1
    }
  }
};

// Helper function to format dates
const formatDate = (date: string) => format(new Date(date), 'MMM dd');

// Platform data
const platforms = [
  { id: 'instagram', name: 'Instagram', icon: <Instagram size={20} />, color: '#E1306C' },
  { id: 'facebook', name: 'Facebook', icon: <Facebook size={20} />, color: '#4267B2' },
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin size={20} />, color: '#0077B5' },
  { id: 'twitter', name: 'Twitter', icon: <Twitter size={20} />, color: '#1DA1F2' },
  { id: 'youtube', name: 'YouTube', icon: <Youtube size={20} />, color: '#FF0000' },
];

const Analytics = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPlatform = searchParams.get('platform') || 'all';
  
  const [timeframe, setTimeframe] = useState('7d'); // 7d, 30d, 90d
  const [selectedPlatform, setSelectedPlatform] = useState(initialPlatform); // all, instagram, facebook, linkedin, twitter, youtube
  const [activeTab, setActiveTab] = useState('overview');

  // When platform selection changes, update URL
  const handlePlatformChange = (value: string) => {
    setSelectedPlatform(value);
    if (value === 'all') {
      searchParams.delete('platform');
    } else {
      searchParams.set('platform', value);
    }
    setSearchParams(searchParams);
  };

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
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      default: return 7;
    }
  };

  // Function to render platform-specific insights
  const renderPlatformInsights = () => {
    if (selectedPlatform === 'all') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map(platform => (
            <Card key={platform.id} className="shadow-card hover:shadow-hover transition-shadow dark:bg-card">
              <CardHeader className="flex flex-row items-center space-y-0">
                {platform.icon}
                <CardTitle className="ml-2 text-base">{platform.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  onClick={() => handlePlatformChange(platform.id)}
                  className="w-full"
                >
                  View Insights
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    const platformData = mockAnalyticsData.platformSpecificData[selectedPlatform as keyof typeof mockAnalyticsData.platformSpecificData];
    const platform = platforms.find(p => p.id === selectedPlatform);
    
    if (!platformData) return <div>No data available for this platform</div>;

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          {platform?.icon}
          <h2 className="text-xl font-semibold">{platform?.name} Insights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Render different metrics based on the platform */}
          {selectedPlatform === 'instagram' && (
            <>
              <MetricCard 
                title="Reach Growth" 
                value={`${platformData.reachGrowth}%`} 
                icon={<Eye />} 
              />
              <MetricCard 
                title="Impressions" 
                value={platformData.impressions.toLocaleString()} 
                icon={<Users />} 
              />
              <MetricCard 
                title="Profile Visits" 
                value={platformData.profileVisits.toLocaleString()} 
                icon={<Users />} 
              />
              <MetricCard 
                title="Stories Engagement" 
                value={`${platformData.storiesEngagement}%`} 
                icon={<ThumbsUp />} 
              />
            </>
          )}

          {selectedPlatform === 'facebook' && (
            <>
              <MetricCard 
                title="Page Engagement" 
                value={`${platformData.pageEngagement}%`} 
                icon={<ThumbsUp />} 
              />
              <MetricCard 
                title="Click-Through Rate" 
                value={`${platformData.clickThroughRate}%`} 
                icon={<Info />} 
              />
              <MetricCard 
                title="Video Views" 
                value={platformData.videoViews.toLocaleString()} 
                icon={<Eye />} 
              />
              <MetricCard 
                title="Page Impressions" 
                value={platformData.pageImpressions.toLocaleString()} 
                icon={<Users />} 
              />
            </>
          )}

          {selectedPlatform === 'linkedin' && (
            <>
              <MetricCard 
                title="Company Page Clicks" 
                value={platformData.companyPageClicks.toLocaleString()} 
                icon={<Info />} 
              />
              <MetricCard 
                title="Follower Growth" 
                value={`${platformData.followerGrowth}%`} 
                icon={<Users />} 
              />
              <MetricCard 
                title="Content Impressions" 
                value={platformData.contentImpressions.toLocaleString()} 
                icon={<Eye />} 
              />
              <MetricCard 
                title="Profile Views" 
                value={platformData.profileViews.toLocaleString()} 
                icon={<Users />} 
              />
            </>
          )}

          {selectedPlatform === 'twitter' && (
            <>
              <MetricCard 
                title="Impressions" 
                value={platformData.impressions.toLocaleString()} 
                icon={<Eye />} 
              />
              <MetricCard 
                title="Profile Visits" 
                value={platformData.profileVisits.toLocaleString()} 
                icon={<Users />} 
              />
              <MetricCard 
                title="Mention Engagement" 
                value={`${platformData.mentionEngagement}%`} 
                icon={<MessageSquare />} 
              />
              <MetricCard 
                title="Retweet Rate" 
                value={`${platformData.retweetRate}%`} 
                icon={<Share2 />} 
              />
            </>
          )}

          {selectedPlatform === 'youtube' && (
            <>
              <MetricCard 
                title="View Duration" 
                value={platformData.viewDuration} 
                icon={<Eye />} 
              />
              <MetricCard 
                title="Subscriber Growth" 
                value={`${platformData.subscriberGrowth}%`} 
                icon={<Users />} 
              />
              <MetricCard 
                title="View-Through Rate" 
                value={`${platformData.viewThroughRate}%`} 
                icon={<Eye />} 
              />
              <MetricCard 
                title="Comment Engagement" 
                value={`${platformData.commentEngagement}%`} 
                icon={<MessageSquare />} 
              />
            </>
          )}
        </div>

        {/* Additional platform-specific data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedPlatform === 'instagram' && (
            <>
              <Card className="shadow-card dark:bg-card">
                <CardHeader>
                  <CardTitle>Top Hashtags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {platformData.topHashtags.map((hashtag, index) => (
                      <div key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {hashtag}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card dark:bg-card">
                <CardHeader>
                  <CardTitle>Best Posting Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {platformData.bestPostingTimes.map((time, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        {time}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}

          {selectedPlatform === 'facebook' && (
            <>
              <Card className="shadow-card dark:bg-card">
                <CardHeader>
                  <CardTitle>Top Performing Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {platformData.topPerformingContent.map((content, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        {content}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="shadow-card dark:bg-card">
                <CardHeader>
                  <CardTitle>Demographic Reach</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {platformData.demographicReach.map((demo, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        {demo}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}

          {/* Similar sections for other platforms */}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-12 animate-fade-in">
      <Container>
        <div className="py-8">
          <h1 className="text-2xl md:text-3xl font-bold font-inter mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your social media performance and engagement
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Select onValueChange={handlePlatformChange} defaultValue={selectedPlatform}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setTimeframe} defaultValue={timeframe}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="platforms">Platform Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="shadow-card dark:bg-card">
              <CardHeader>
                <CardTitle>Page Views</CardTitle>
                <CardDescription>Total page views over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={getFilteredPageViews()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="date" tickFormatter={formatDate} stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="views" 
                      stroke="var(--primary)" 
                      fillOpacity={1} 
                      fill="url(#colorViews)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="shadow-card dark:bg-card">
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
                <CardDescription>Engagement share across platforms</CardDescription>
              </CardHeader>
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
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {getFilteredPlatformDistribution().map((entry) => (
                        <Cell key={entry.platform} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <Card className="shadow-card dark:bg-card">
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>Likes, comments and shares over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getFilteredEngagement()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="date" tickFormatter={formatDate} stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
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

          <TabsContent value="audience" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="shadow-card dark:bg-card">
                <CardHeader>
                  <CardTitle>Age Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockAnalyticsData.audienceData.ageDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="age" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <Tooltip />
                      <Bar dataKey="percentage" fill="var(--primary)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="shadow-card dark:bg-card">
                <CardHeader>
                  <CardTitle>Gender Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockAnalyticsData.audienceData.genderDistribution}
                        dataKey="percentage"
                        nameKey="gender"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        <Cell key="female" fill="#FF6384" />
                        <Cell key="male" fill="#36A2EB" />
                        <Cell key="other" fill="#FFCE56" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="shadow-card dark:bg-card md:col-span-2">
                <CardHeader>
                  <CardTitle>Location Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart 
                      data={mockAnalyticsData.audienceData.locationDistribution}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis type="number" stroke="var(--muted-foreground)" />
                      <YAxis dataKey="location" type="category" width={100} stroke="var(--muted-foreground)" />
                      <Tooltip />
                      <Bar dataKey="percentage" fill="var(--primary)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-4">
            {renderPlatformInsights()}
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
};

// Reusable Metric Card Component
interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, icon }: MetricCardProps) => (
  <Card className="shadow-card hover:shadow-hover transition-shadow dark:bg-card">
    <CardContent className="pt-6">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-primary/10 rounded-full mb-4">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
    </CardContent>
  </Card>
);

export default Analytics;
