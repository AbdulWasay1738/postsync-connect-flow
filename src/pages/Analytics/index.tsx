
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Users, Eye, ThumbsUp, MessageSquare, Share2, Award } from 'lucide-react';
import { format, subDays } from 'date-fns';

// Define platform-specific types
interface InstagramData {
  followers: number;
  engagement: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  impressions?: number;
  profileVisits?: number;
  storiesEngagement?: number;
}

interface FacebookData {
  followers: number;
  engagement: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  pageEngagement?: number;
  clickThroughRate?: number;
  videoViews?: number;
  pageImpressions?: number;
}

interface LinkedinData {
  followers: number;
  engagement: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  companyPageClicks?: number;
  followerGrowth?: number;
  contentImpressions?: number;
  profileViews?: number;
}

interface TwitterData {
  followers: number;
  engagement: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  impressions?: number;
  profileVisits?: number;
  mentionEngagement?: number;
  retweetRate?: number;
}

interface YoutubeData {
  followers: number;
  engagement: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  viewDuration?: number;
  subscriberGrowth?: number;
  viewThroughRate?: number;
  commentEngagement?: number;
}

// Define platform data record type
type PlatformData = InstagramData | FacebookData | LinkedinData | TwitterData | YoutubeData;

// Generate sample data for charts
const generateChartData = (days: number) => {
  return Array.from({ length: days }).map((_, i) => {
    const date = format(subDays(new Date(), days - i - 1), 'MMM dd');
    return {
      date,
      followers: Math.floor(5000 + Math.random() * 100),
      engagement: Math.floor(200 + Math.random() * 50),
      reach: Math.floor(2000 + Math.random() * 500),
      likes: Math.floor(500 + Math.random() * 100),
      comments: Math.floor(50 + Math.random() * 20),
      shares: Math.floor(20 + Math.random() * 10),
    };
  });
};

// Platform breakdown data for pie chart
const platformBreakdownData = [
  { name: 'Instagram', value: 35, color: '#E1306C' },
  { name: 'Facebook', value: 25, color: '#1877F2' },
  { name: 'Twitter', value: 15, color: '#1DA1F2' },
  { name: 'LinkedIn', value: 15, color: '#0077B5' },
  { name: 'YouTube', value: 10, color: '#FF0000' },
];

const engagementBreakdownData = [
  { name: 'Likes', value: 55, color: '#8B5CF6' },
  { name: 'Comments', value: 25, color: '#D946EF' },
  { name: 'Shares', value: 20, color: '#7E69AB' },
];

// Sample platform data
const platformData: Record<string, PlatformData> = {
  instagram: {
    followers: 10245,
    engagement: 3.8,
    reach: 15600,
    likes: 8543,
    comments: 1245,
    shares: 432,
    impressions: 25600,
    profileVisits: 3250,
    storiesEngagement: 4.2
  },
  facebook: {
    followers: 8750,
    engagement: 2.1,
    reach: 12400,
    likes: 5643,
    comments: 832,
    shares: 356,
    pageEngagement: 3.4,
    clickThroughRate: 1.8,
    videoViews: 4560,
    pageImpressions: 18700
  },
  linkedin: {
    followers: 5120,
    engagement: 1.5,
    reach: 8900,
    likes: 2345,
    comments: 487,
    shares: 198,
    companyPageClicks: 1245,
    followerGrowth: 2.7,
    contentImpressions: 9870,
    profileViews: 1876
  },
  twitter: {
    followers: 7230,
    engagement: 2.3,
    reach: 11200,
    likes: 4532,
    comments: 654,
    shares: 289,
    impressions: 18600,
    profileVisits: 2570,
    mentionEngagement: 3.1,
    retweetRate: 1.5
  },
  youtube: {
    followers: 4560,
    engagement: 4.2,
    reach: 7800,
    likes: 3654,
    comments: 892,
    shares: 143,
    viewDuration: 3.5,
    subscriberGrowth: 1.9,
    viewThroughRate: 42.5,
    commentEngagement: 5.3
  }
};

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState<string>('30');
  const [platform, setPlatform] = useState<string>('all');
  const [selectedTab, setSelectedTab] = useState<string>('overview');
  
  // Generate chart data based on selected time range
  const chartData = generateChartData(parseInt(timeRange));
  
  // Get current metrics for the selected platform
  const getCurrentPlatformData = () => {
    if (platform === 'all') {
      // Aggregate data from all platforms
      const totalFollowers = Object.values(platformData).reduce((acc, curr) => acc + curr.followers, 0);
      const totalEngagement = Object.values(platformData).reduce((acc, curr) => acc + curr.engagement, 0) / 5; // Average
      const totalReach = Object.values(platformData).reduce((acc, curr) => acc + curr.reach, 0);
      const totalLikes = Object.values(platformData).reduce((acc, curr) => acc + curr.likes, 0);
      const totalComments = Object.values(platformData).reduce((acc, curr) => acc + curr.comments, 0);
      const totalShares = Object.values(platformData).reduce((acc, curr) => acc + curr.shares, 0);
      
      return {
        followers: totalFollowers,
        engagement: totalEngagement,
        reach: totalReach,
        likes: totalLikes,
        comments: totalComments,
        shares: totalShares
      };
    }
    
    return platformData[platform];
  };
  
  const currentData = getCurrentPlatformData();

  // Component for simple stat cards
  const StatCard = ({ title, value, icon, description, trend }: { 
    title: string; 
    value: string | number; 
    icon: React.ReactNode; 
    description?: string;
    trend?: {
      value: number;
      label: string;
      positive: boolean;
    };
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-full text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={`text-xs ${trend.positive ? 'text-green-500' : 'text-red-500'} flex items-center mt-1`}>
            {trend.positive ? '↑' : '↓'} {trend.value}% {trend.label}
          </p>
        )}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track and optimize your social media performance</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="platform">Platform</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger id="platform" className="w-[180px]">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="time-range">Time Range</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger id="time-range" className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="14">Last 14 Days</SelectItem>
                <SelectItem value="30">Last 30 Days</SelectItem>
                <SelectItem value="90">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8">
          {/* Key Metrics Section */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <StatCard 
              title="Followers" 
              value={currentData.followers.toLocaleString()}
              icon={<Users size={18} />}
              trend={{value: 2.8, label: "past month", positive: true}}
            />
            <StatCard 
              title="Engagement Rate" 
              value={`${currentData.engagement}%`}
              icon={<ThumbsUp size={18} />}
              trend={{value: 0.5, label: "past month", positive: true}}
            />
            <StatCard 
              title="Reach" 
              value={currentData.reach.toLocaleString()}
              icon={<Eye size={18} />}
              trend={{value: 1.2, label: "past month", positive: true}}
            />
            <StatCard 
              title="Likes" 
              value={currentData.likes.toLocaleString()}
              icon={<ThumbsUp size={18} />}
              trend={{value: 3.1, label: "past month", positive: true}}
            />
            <StatCard 
              title="Comments" 
              value={currentData.comments.toLocaleString()}
              icon={<MessageSquare size={18} />}
              trend={{value: 1.8, label: "past month", positive: true}}
            />
            <StatCard 
              title="Shares" 
              value={currentData.shares.toLocaleString()}
              icon={<Share2 size={18} />}
              trend={{value: 4.2, label: "past month", positive: true}}
            />
          </div>
          
          {/* Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Follower Growth</CardTitle>
              <CardDescription>Track your audience growth over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fill: 'var(--charts-text)' }} />
                  <YAxis tick={{ fill: 'var(--charts-text)' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--charts-tooltip-bg)', 
                      color: 'var(--foreground)',
                      border: '1px solid var(--border)'
                    }} 
                  />
                  <Line type="monotone" dataKey="followers" stroke="#8B5CF6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Platform Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
                <CardDescription>Engagement breakdown by platform</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {platformBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`${value}%`, 'Percentage']} 
                      contentStyle={{ 
                        backgroundColor: 'var(--charts-tooltip-bg)', 
                        color: 'var(--foreground)',
                        border: '1px solid var(--border)' 
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Engagement Types</CardTitle>
                <CardDescription>Breakdown by engagement type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={engagementBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {engagementBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`${value}%`, 'Percentage']} 
                      contentStyle={{ 
                        backgroundColor: 'var(--charts-tooltip-bg)', 
                        color: 'var(--foreground)',
                        border: '1px solid var(--border)' 
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-8">
          {/* Engagement Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>Track how users interact with your content</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fill: 'var(--charts-text)' }} />
                  <YAxis tick={{ fill: 'var(--charts-text)' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--charts-tooltip-bg)', 
                      color: 'var(--foreground)',
                      border: '1px solid var(--border)'
                    }}
                  />
                  <Bar dataKey="likes" fill="#8B5CF6" name="Likes" />
                  <Bar dataKey="comments" fill="#D946EF" name="Comments" />
                  <Bar dataKey="shares" fill="#7E69AB" name="Shares" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Platform Specific Metrics - Displayed based on selected platform */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {platform === "instagram" && (
              <>
                <StatCard 
                  title="Impressions"
                  value={platformData.instagram.impressions?.toLocaleString() || 'N/A'}
                  icon={<Eye size={18} />}
                />
                <StatCard 
                  title="Profile Visits"
                  value={platformData.instagram.profileVisits?.toLocaleString() || 'N/A'}
                  icon={<Users size={18} />}
                />
                <StatCard 
                  title="Stories Engagement"
                  value={`${platformData.instagram.storiesEngagement}%` || 'N/A'}
                  icon={<Award size={18} />}
                />
                <StatCard 
                  title="Reach Growth"
                  value="+5.2%"
                  icon={<BarChart3 size={18} />}
                  trend={{value: 5.2, label: "past month", positive: true}}
                />
              </>
            )}
            
            {platform === "facebook" && (
              <>
                <StatCard 
                  title="Page Engagement"
                  value={`${platformData.facebook.pageEngagement}%` || 'N/A'}
                  icon={<ThumbsUp size={18} />}
                />
                <StatCard 
                  title="Click-Through Rate"
                  value={`${platformData.facebook.clickThroughRate}%` || 'N/A'} 
                  icon={<Award size={18} />}
                />
                <StatCard 
                  title="Video Views"
                  value={platformData.facebook.videoViews?.toLocaleString() || 'N/A'}
                  icon={<Eye size={18} />}
                />
                <StatCard 
                  title="Page Impressions"
                  value={platformData.facebook.pageImpressions?.toLocaleString() || 'N/A'}
                  icon={<BarChart3 size={18} />}
                />
              </>
            )}
            
            {platform === "linkedin" && (
              <>
                <StatCard 
                  title="Company Page Clicks"
                  value={platformData.linkedin.companyPageClicks?.toLocaleString() || 'N/A'}
                  icon={<Award size={18} />}
                />
                <StatCard 
                  title="Follower Growth"
                  value={`${platformData.linkedin.followerGrowth}%` || 'N/A'}
                  icon={<Users size={18} />}
                />
                <StatCard 
                  title="Content Impressions"
                  value={platformData.linkedin.contentImpressions?.toLocaleString() || 'N/A'}
                  icon={<Eye size={18} />}
                />
                <StatCard 
                  title="Profile Views"
                  value={platformData.linkedin.profileViews?.toLocaleString() || 'N/A'}
                  icon={<BarChart3 size={18} />}
                />
              </>
            )}
            
            {platform === "twitter" && (
              <>
                <StatCard 
                  title="Impressions"
                  value={platformData.twitter.impressions?.toLocaleString() || 'N/A'}
                  icon={<Eye size={18} />}
                />
                <StatCard 
                  title="Profile Visits"
                  value={platformData.twitter.profileVisits?.toLocaleString() || 'N/A'}
                  icon={<Users size={18} />}
                />
                <StatCard 
                  title="Mention Engagement"
                  value={`${platformData.twitter.mentionEngagement}%` || 'N/A'}
                  icon={<MessageSquare size={18} />}
                />
                <StatCard 
                  title="Retweet Rate"
                  value={`${platformData.twitter.retweetRate}%` || 'N/A'}
                  icon={<Share2 size={18} />}
                />
              </>
            )}
            
            {platform === "youtube" && (
              <>
                <StatCard 
                  title="View Duration"
                  value={`${platformData.youtube.viewDuration} min` || 'N/A'}
                  icon={<Eye size={18} />}
                />
                <StatCard 
                  title="Subscriber Growth"
                  value={`${platformData.youtube.subscriberGrowth}%` || 'N/A'}
                  icon={<Users size={18} />}
                />
                <StatCard 
                  title="View-Through Rate"
                  value={`${platformData.youtube.viewThroughRate}%` || 'N/A'}
                  icon={<Award size={18} />}
                />
                <StatCard 
                  title="Comment Engagement"
                  value={`${platformData.youtube.commentEngagement}%` || 'N/A'}
                  icon={<MessageSquare size={18} />}
                />
              </>
            )}
            
            {platform === "all" && (
              <>
                <StatCard 
                  title="Avg. Engagement Rate"
                  value={`${(currentData.engagement).toFixed(1)}%`}
                  icon={<Award size={18} />}
                />
                <StatCard 
                  title="Total Interactions"
                  value={(currentData.likes + currentData.comments + currentData.shares).toLocaleString()}
                  icon={<ThumbsUp size={18} />}
                />
                <StatCard 
                  title="Reach to Follower Ratio"
                  value={`${((currentData.reach / currentData.followers) * 100).toFixed(1)}%`}
                  icon={<Eye size={18} />}
                />
                <StatCard 
                  title="Engagement Growth"
                  value="+3.2%"
                  icon={<BarChart3 size={18} />}
                  trend={{value: 3.2, label: "past month", positive: true}}
                />
              </>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="audience" className="space-y-8">
          {/* Audience Demographics */}
          <Card>
            <CardHeader>
              <CardTitle>Audience Demographics</CardTitle>
              <CardDescription>Understand who follows and engages with your content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                      data={[
                        { age: '18-24', value: 25 },
                        { age: '25-34', value: 35 },
                        { age: '35-44', value: 20 },
                        { age: '45-54', value: 12 },
                        { age: '55+', value: 8 },
                      ]}
                      margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" tick={{ fill: 'var(--charts-text)' }} />
                      <YAxis tick={{ fill: 'var(--charts-text)' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--charts-tooltip-bg)', 
                          color: 'var(--foreground)',
                          border: '1px solid var(--border)'
                        }}
                      />
                      <Bar dataKey="value" fill="#8B5CF6" name="Percentage" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Gender Distribution</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Male', value: 45, color: '#8B5CF6' },
                          { name: 'Female', value: 52, color: '#D946EF' },
                          { name: 'Other', value: 3, color: '#7E69AB' },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={70}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: 'Male', value: 45, color: '#8B5CF6' },
                          { name: 'Female', value: 52, color: '#D946EF' },
                          { name: 'Other', value: 3, color: '#7E69AB' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => [`${value}%`, 'Percentage']} 
                        contentStyle={{ 
                          backgroundColor: 'var(--charts-tooltip-bg)', 
                          color: 'var(--foreground)',
                          border: '1px solid var(--border)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { country: 'United States', percentage: 35 },
                    { country: 'United Kingdom', percentage: 18 },
                    { country: 'Canada', percentage: 12 },
                    { country: 'Australia', percentage: 8 },
                    { country: 'Germany', percentage: 6 },
                    { country: 'Other', percentage: 21 },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                      <span className="font-medium">{item.country}</span>
                      <span>{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
