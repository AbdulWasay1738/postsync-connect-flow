
import React, { useState } from 'react';
import { format, subDays, subMonths } from 'date-fns';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Calendar as CalendarIcon, ChevronDown, Instagram, Facebook, Linkedin, Twitter, Pinterest, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import Container from '@/components/ui/Container';

// Mock data for analytics
const generateImpressionsData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    date: format(subDays(new Date(), days - i - 1), 'MMM dd'),
    instagram: Math.floor(Math.random() * 2000) + 3000,
    facebook: Math.floor(Math.random() * 1500) + 2000,
    linkedin: Math.floor(Math.random() * 1000) + 500,
    twitter: Math.floor(Math.random() * 800) + 400,
  }));
};

const generateEngagementData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    date: format(subDays(new Date(), days - i - 1), 'MMM dd'),
    rate: (Math.random() * 2 + 2).toFixed(2),
  }));
};

const postTypeData = [
  { name: 'Image', value: 60 },
  { name: 'Video', value: 20 },
  { name: 'Carousel', value: 15 },
  { name: 'Story', value: 5 },
];

const platformColors = {
  instagram: '#E1306C',
  facebook: '#4267B2',
  linkedin: '#0077B5',
  twitter: '#1DA1F2',
  pinterest: '#E60023',
  youtube: '#FF0000',
};

const COLORS = ['#1A73E8', '#36B37E', '#FF6B6B', '#FFAB00'];

const platforms = [
  { id: 'all', name: 'All Platforms' },
  { id: 'instagram', name: 'Instagram', icon: <Instagram size={16} /> },
  { id: 'facebook', name: 'Facebook', icon: <Facebook size={16} /> },
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin size={16} /> },
  { id: 'twitter', name: 'Twitter', icon: <Twitter size={16} /> },
];

type DateRange = {
  from: Date;
  to: Date;
};

type DateOption = '7d' | '30d' | '3m' | 'custom';

const Analytics = () => {
  const [platform, setPlatform] = useState('all');
  const [dateOption, setDateOption] = useState<DateOption>('7d');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  
  const [impressionsData, setImpressionsData] = useState(generateImpressionsData(7));
  const [engagementData, setEngagementData] = useState(generateEngagementData(7));
  
  const handleDateOptionChange = (value: DateOption) => {
    setDateOption(value);
    
    let from: Date;
    const to = new Date();
    
    switch (value) {
      case '7d':
        from = subDays(to, 7);
        setImpressionsData(generateImpressionsData(7));
        setEngagementData(generateEngagementData(7));
        break;
      case '30d':
        from = subDays(to, 30);
        setImpressionsData(generateImpressionsData(30));
        setEngagementData(generateEngagementData(30));
        break;
      case '3m':
        from = subMonths(to, 3);
        setImpressionsData(generateImpressionsData(90));
        setEngagementData(generateEngagementData(90));
        break;
      default:
        from = dateRange.from;
    }
    
    setDateRange({ from, to });
  };
  
  const handlePlatformChange = (value: string) => {
    setPlatform(value);
    // 🔌 BACKEND_HOOK: fetchAnalytics(value, dateRange)
  };

  return (
    <div className="min-h-screen pb-12">
      <Container>
        {/* Header */}
        <div className="py-8">
          <h1 className="text-2xl md:text-3xl font-bold font-inter mb-2">
            Analytics & Insights
          </h1>
          <p className="text-postsync-muted">
            Track performance metrics and engagement across your social platforms
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between mb-8 space-y-4 md:space-y-0">
          <Tabs 
            defaultValue={platform} 
            className="w-full md:w-auto"
            onValueChange={handlePlatformChange}
          >
            <TabsList className="w-full md:w-auto grid grid-cols-3 md:grid-cols-5 md:inline-flex">
              {platforms.map((p) => (
                <TabsTrigger key={p.id} value={p.id} className="flex items-center space-x-1">
                  {p.icon && <span>{p.icon}</span>}
                  <span>{p.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="flex space-x-2">
            <Select defaultValue={dateOption} onValueChange={(value) => handleDateOptionChange(value as DateOption)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="3m">Last 3 months</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            
            {dateOption === 'custom' && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "MMM d, yyyy")} -{" "}
                          {format(dateRange.to, "MMM d, yyyy")}
                        </>
                      ) : (
                        format(dateRange.from, "MMM d, yyyy")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        setDateRange(range as DateRange);
                        // 🔌 BACKEND_HOOK: fetchAnalytics(platform, range)
                      }
                    }}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-postsync-muted">
                Total Impressions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248.7K</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                  <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                </svg>
                +12.5% vs previous period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-postsync-muted">
                Engagement Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.8%</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                  <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                </svg>
                +0.8% vs previous period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-postsync-muted">
                Link Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,238</div>
              <p className="text-xs text-red-600 flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                  <path fillRule="evenodd" d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.287-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
                -3.2% vs previous period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-postsync-muted">
                Follower Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+845</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                  <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                </svg>
                +18.3% vs previous period
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Impressions Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="font-inter">Impressions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={impressionsData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Legend />
                    {platform === 'all' || platform === 'instagram' ? (
                      <Area 
                        type="monotone" 
                        dataKey="instagram" 
                        name="Instagram"
                        stroke={platformColors.instagram} 
                        fill={platformColors.instagram} 
                        fillOpacity={0.1} 
                      />
                    ) : null}
                    {platform === 'all' || platform === 'facebook' ? (
                      <Area 
                        type="monotone" 
                        dataKey="facebook" 
                        name="Facebook"
                        stroke={platformColors.facebook} 
                        fill={platformColors.facebook} 
                        fillOpacity={0.1} 
                      />
                    ) : null}
                    {platform === 'all' || platform === 'linkedin' ? (
                      <Area 
                        type="monotone" 
                        dataKey="linkedin" 
                        name="LinkedIn"
                        stroke={platformColors.linkedin} 
                        fill={platformColors.linkedin} 
                        fillOpacity={0.1} 
                      />
                    ) : null}
                    {platform === 'all' || platform === 'twitter' ? (
                      <Area 
                        type="monotone" 
                        dataKey="twitter" 
                        name="Twitter"
                        stroke={platformColors.twitter} 
                        fill={platformColors.twitter} 
                        fillOpacity={0.1} 
                      />
                    ) : null}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Engagement Rate Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="font-inter">Engagement Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={engagementData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      name="Engagement Rate (%)"
                      stroke="#1A73E8" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Post Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="font-inter">Content Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={postTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {postTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Best Performing Posts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-inter">Best Performing Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">Post</th>
                      <th className="px-4 py-2 text-left font-medium">Platform</th>
                      <th className="px-4 py-2 text-left font-medium">Date</th>
                      <th className="px-4 py-2 text-left font-medium">Engagement</th>
                      <th className="px-4 py-2 text-left font-medium">Reach</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded overflow-hidden mr-3">
                            <img 
                              src="https://images.unsplash.com/photo-1695653422259-8a84449e45c2?q=80&w=1760&auto=format&fit=crop" 
                              alt="Post" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="truncate max-w-[150px]">Summer collection launch</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 flex items-center">
                        <Instagram size={16} className="text-[#E1306C] mr-2" />
                        <span>Instagram</span>
                      </td>
                      <td className="px-4 py-3 text-postsync-muted">Apr 28, 2023</td>
                      <td className="px-4 py-3 font-medium">5.8%</td>
                      <td className="px-4 py-3">12,450</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded overflow-hidden mr-3">
                            <img 
                              src="https://images.unsplash.com/photo-1696628067521-d168e37486db?q=80&w=1760&auto=format&fit=crop" 
                              alt="Post" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="truncate max-w-[150px]">Product feature spotlight</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 flex items-center">
                        <Facebook size={16} className="text-[#4267B2] mr-2" />
                        <span>Facebook</span>
                      </td>
                      <td className="px-4 py-3 text-postsync-muted">Apr 23, 2023</td>
                      <td className="px-4 py-3 font-medium">4.2%</td>
                      <td className="px-4 py-3">8,720</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded overflow-hidden mr-3">
                            <img 
                              src="https://images.unsplash.com/photo-1696536943465-7db3cd493c97?q=80&w=1760&auto=format&fit=crop" 
                              alt="Post" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="truncate max-w-[150px]">Company announcement</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 flex items-center">
                        <Linkedin size={16} className="text-[#0077B5] mr-2" />
                        <span>LinkedIn</span>
                      </td>
                      <td className="px-4 py-3 text-postsync-muted">Apr 20, 2023</td>
                      <td className="px-4 py-3 font-medium">3.9%</td>
                      <td className="px-4 py-3">5,340</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded overflow-hidden mr-3 bg-gray-100 flex items-center justify-center">
                            <Twitter size={16} className="text-[#1DA1F2]" />
                          </div>
                          <span className="truncate max-w-[150px]">Industry news commentary</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 flex items-center">
                        <Twitter size={16} className="text-[#1DA1F2] mr-2" />
                        <span>Twitter</span>
                      </td>
                      <td className="px-4 py-3 text-postsync-muted">Apr 18, 2023</td>
                      <td className="px-4 py-3 font-medium">3.5%</td>
                      <td className="px-4 py-3">4,120</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm">View All Posts</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Export Section */}
        <div className="mt-8 flex justify-end">
          <Button variant="outline">
            {/* 🔌 BACKEND_HOOK: exportAnalytics(platform, dateRange) */}
            Export Report
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Analytics;
