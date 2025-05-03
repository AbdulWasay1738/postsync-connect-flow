
import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, ChevronDown, ChevronUp, Instagram, Facebook, Linkedin, Twitter, Pinterest, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Container from '@/components/ui/Container';
import { useAuth } from '@/context/AuthContext';

// Mock data for dashboard
const followersData = [
  { date: 'May 1', followers: 10200 },
  { date: 'May 2', followers: 10300 },
  { date: 'May 3', followers: 10250 },
  { date: 'May 4', followers: 10400 },
  { date: 'May 5', followers: 10450 },
  { date: 'May 6', followers: 10500 },
  { date: 'May 7', followers: 10600 },
  { date: 'May 8', followers: 10650 },
  { date: 'May 9', followers: 10700 },
  { date: 'May 10', followers: 10800 },
  { date: 'May 11', followers: 10900 },
  { date: 'May 12', followers: 11000 },
  { date: 'May 13', followers: 11100 },
  { date: 'May 14', followers: 11200 },
  { date: 'May 15', followers: 11300 },
  { date: 'May 16', followers: 11350 },
  { date: 'May 17', followers: 11400 },
  { date: 'May 18', followers: 11500 },
  { date: 'May 19', followers: 11600 },
  { date: 'May 20', followers: 11650 },
  { date: 'May 21', followers: 11700 },
  { date: 'May 22', followers: 11800 },
  { date: 'May 23', followers: 11850 },
  { date: 'May 24', followers: 11900 },
  { date: 'May 25', followers: 12000 },
  { date: 'May 26', followers: 12100 },
  { date: 'May 27', followers: 12200 },
  { date: 'May 28', followers: 12300 },
  { date: 'May 29', followers: 12350 },
  { date: 'May 30', followers: 12400 },
];

const engagementData = [
  { day: 'Mon', likes: 320, comments: 120, shares: 50 },
  { day: 'Tue', likes: 300, comments: 130, shares: 45 },
  { day: 'Wed', likes: 340, comments: 140, shares: 60 },
  { day: 'Thu', likes: 380, comments: 150, shares: 70 },
  { day: 'Fri', likes: 400, comments: 160, shares: 80 },
  { day: 'Sat', likes: 450, comments: 170, shares: 90 },
  { day: 'Sun', likes: 420, comments: 150, shares: 85 },
];

const platformColors = {
  instagram: '#E1306C',
  facebook: '#4267B2',
  linkedin: '#0077B5',
  twitter: '#1DA1F2',
  pinterest: '#E60023',
  youtube: '#FF0000'
};

const platformData = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <Instagram />,
    color: platformColors.instagram,
    followers: 8240,
    growth: 2.4,
    positive: true,
    recentPosts: [
      { id: 1, image: 'https://images.unsplash.com/photo-1696628067521-d168e37486db?q=80&w=1760&auto=format&fit=crop', likes: 142, comments: 23, date: '2 days ago', engagement: '3.2%' },
      { id: 2, image: 'https://images.unsplash.com/photo-1698778573682-346d219402b5?q=80&w=1760&auto=format&fit=crop', likes: 187, comments: 31, date: '5 days ago', engagement: '3.8%' },
      { id: 3, image: 'https://images.unsplash.com/photo-1696868863326-304e89720846?q=80&w=1760&auto=format&fit=crop', likes: 134, comments: 19, date: '1 week ago', engagement: '2.9%' },
    ]
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: <Facebook />,
    color: platformColors.facebook,
    followers: 5630,
    growth: 1.2,
    positive: true,
    recentPosts: [
      { id: 1, image: 'https://images.unsplash.com/photo-1692607431259-7a8d8ebc541a?q=80&w=1760&auto=format&fit=crop', likes: 89, comments: 14, date: '3 days ago', engagement: '2.1%' },
      { id: 2, image: 'https://images.unsplash.com/photo-1694113118379-063e477d4622?q=80&w=1760&auto=format&fit=crop', likes: 104, comments: 18, date: '6 days ago', engagement: '2.4%' },
    ]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: <Linkedin />,
    color: platformColors.linkedin,
    followers: 3120,
    growth: 3.1,
    positive: true,
    recentPosts: [
      { id: 1, image: 'https://images.unsplash.com/photo-1696536943465-7db3cd493c97?q=80&w=1760&auto=format&fit=crop', likes: 67, comments: 8, date: '2 days ago', engagement: '2.8%' },
    ]
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: <Twitter />,
    color: platformColors.twitter,
    followers: 4850,
    growth: 0.8,
    positive: false,
    recentPosts: [
      { id: 1, image: null, likes: 42, comments: 6, date: '1 day ago', engagement: '1.9%' },
      { id: 2, image: null, likes: 38, comments: 5, date: '4 days ago', engagement: '1.7%' },
    ]
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);
  
  const togglePlatform = (platformId: string) => {
    if (expandedPlatform === platformId) {
      setExpandedPlatform(null);
    } else {
      setExpandedPlatform(platformId);
      // 🔌 BACKEND_HOOK: fetchPlatformSummary(platformId)
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <Container>
        {/* Welcome message */}
        <div className="py-8">
          <h1 className="text-2xl md:text-3xl font-bold font-inter mb-2">
            Welcome back, {user?.name || 'User'}
          </h1>
          <p className="text-postsync-muted">
            Here's what's happening with your social media accounts today
          </p>
        </div>
        
        {/* KPI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-postsync-muted">
                Total Followers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">12,400</p>
                  <div className="flex items-center mt-1 text-sm text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span>+2.5% this month</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-postsync-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-postsync-muted">
                30-Day Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">28</p>
                  <div className="flex items-center mt-1 text-sm text-red-500">
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    <span>-3.8% vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-postsync-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-postsync-muted">
                Avg Engagement Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">3.2%</p>
                  <div className="flex items-center mt-1 text-sm text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span>+0.4% this month</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-postsync-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-postsync-muted">
                Scheduled Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <div className="flex items-center mt-1 text-sm text-postsync-muted">
                    <span>Next: Today, 14:30</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-postsync-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column: Charts */}
          <div className="lg:col-span-3 space-y-8">
            {/* Followers Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="font-inter">Followers Growth (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={followersData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="followers" 
                        stroke="#1A73E8" 
                        fill="#1A73E8" 
                        fillOpacity={0.1} 
                        activeDot={{ r: 8 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Engagement Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="font-inter">Engagement (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={engagementData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Bar dataKey="likes" fill="#1A73E8" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="comments" fill="#36B37E" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="shares" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Per-Platform Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold font-inter">Platform Breakdown</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              
              {/* Platform Cards */}
              <div className="space-y-4">
                {platformData.map((platform) => (
                  <Card key={platform.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      {/* Platform Header */}
                      <div 
                        className="p-4 flex items-center justify-between cursor-pointer"
                        onClick={() => togglePlatform(platform.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${platform.color}20` }}
                          >
                            <div className="text-[#C4C4C4]" style={{ color: platform.color }}>
                              {platform.icon}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium">{platform.name}</h4>
                            <div className="flex items-center">
                              <span className="text-sm text-postsync-muted mr-2">{platform.followers.toLocaleString()} followers</span>
                              <div className={`flex items-center text-xs ${platform.positive ? 'text-green-600' : 'text-red-500'}`}>
                                {platform.positive ? (
                                  <ArrowUpRight className="h-3 w-3 mr-1" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3 mr-1" />
                                )}
                                <span>{platform.growth}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          {expandedPlatform === platform.id ? (
                            <ChevronUp className="h-5 w-5 text-postsync-muted" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-postsync-muted" />
                          )}
                        </div>
                      </div>
                      
                      {/* Expanded Platform Content */}
                      {expandedPlatform === platform.id && (
                        <div className="border-t border-gray-100 p-4">
                          <h5 className="font-medium mb-3">Recent Posts</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {platform.recentPosts.map((post) => (
                              <div key={post.id} className="border border-gray-100 rounded-md overflow-hidden">
                                {post.image && (
                                  <div className="aspect-square overflow-hidden">
                                    <img 
                                      src={post.image} 
                                      alt="Post" 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div className="p-3">
                                  <div className="flex justify-between text-sm">
                                    <span>❤️ {post.likes}</span>
                                    <span>💬 {post.comments}</span>
                                  </div>
                                  <div className="flex justify-between text-sm mt-2">
                                    <span className="text-postsync-muted">{post.date}</span>
                                    <span className="font-medium">{post.engagement}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="font-inter">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild className="w-full bg-postsync-primary hover:bg-blue-700 justify-start">
                  <Link to="/create">Create New Post</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/ai-captions">Generate AI Caption</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/calendar">View Calendar</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/analytics">Full Analytics</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Post Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="font-inter">Post Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Images', value: 60 },
                          { name: 'Videos', value: 25 },
                          { name: 'Stories', value: 10 },
                          { name: 'Reels', value: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={40}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell fill="#1A73E8" />
                        <Cell fill="#36B37E" />
                        <Cell fill="#FF6B6B" />
                        <Cell fill="#FFAB00" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-postsync-primary rounded-full mr-2"></div>
                    <span className="text-xs">Images (60%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs">Videos (25%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-postsync-secondary rounded-full mr-2"></div>
                    <span className="text-xs">Stories (10%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-xs">Reels (5%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Next Scheduled Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="font-inter">Upcoming Posts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border border-gray-100 rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Instagram className="h-4 w-4 text-[#E1306C] mr-2" />
                      <span className="text-sm font-medium">Instagram</span>
                    </div>
                    <span className="text-xs text-postsync-muted">Today, 14:30</span>
                  </div>
                  <p className="text-sm truncate">Summer collection photoshoot behind the scenes...</p>
                </div>
                
                <div className="border border-gray-100 rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Facebook className="h-4 w-4 text-[#4267B2] mr-2" />
                      <span className="text-sm font-medium">Facebook</span>
                    </div>
                    <span className="text-xs text-postsync-muted">Tomorrow, 10:00</span>
                  </div>
                  <p className="text-sm truncate">Join our webinar on digital marketing trends...</p>
                </div>
                
                <div className="border border-gray-100 rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Linkedin className="h-4 w-4 text-[#0077B5] mr-2" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </div>
                    <span className="text-xs text-postsync-muted">May 5, 09:15</span>
                  </div>
                  <p className="text-sm truncate">We're hiring! Check out our latest job openings...</p>
                </div>
                
                <Button asChild variant="outline" className="w-full" size="sm">
                  <Link to="/calendar">View All Scheduled Posts</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
