
import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Sample scheduled posts
const initialPosts = [
  {
    id: 1,
    title: 'New Product Launch',
    date: '2023-11-15T10:00:00',
    platform: 'instagram',
    status: 'scheduled'
  },
  {
    id: 2,
    title: 'Weekend Sale Announcement',
    date: '2023-11-17T14:30:00',
    platform: 'facebook',
    status: 'scheduled'
  },
  {
    id: 3,
    title: 'Customer Testimonial',
    date: '2023-11-20T09:00:00',
    platform: 'twitter',
    status: 'scheduled'
  },
  {
    id: 4,
    title: 'Industry News Share',
    date: '2023-11-22T16:00:00',
    platform: 'linkedin',
    status: 'draft'
  },
  {
    id: 5,
    title: 'Tutorial Video',
    date: '2023-11-24T11:00:00',
    platform: 'youtube',
    status: 'scheduled'
  },
  {
    id: 6,
    title: 'Black Friday Promotion',
    date: '2023-11-24T15:00:00',
    platform: 'instagram',
    status: 'scheduled'
  }
];

type Post = {
  id: number;
  title: string;
  date: string;
  platform: string;
  status: string;
};

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  
  // Move to previous month
  const prevMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };
  
  // Move to next month
  const nextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };
  
  // Filter posts by platform
  const filteredPosts = selectedPlatform === 'all' 
    ? posts 
    : posts.filter(post => post.platform === selectedPlatform);
  
  // Get posts for selected date
  const postsForSelectedDate = selectedDate 
    ? filteredPosts.filter(post => {
        const postDate = parseISO(post.date);
        return isSameDay(postDate, selectedDate);
      })
    : [];
  
  // Function to check if a date has scheduled posts
  const hasPostsOnDate = (date: Date) => {
    return filteredPosts.some(post => {
      const postDate = parseISO(post.date);
      return isSameDay(postDate, date);
    });
  };
  
  // Function to delete a post
  const deletePost = (id: number) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };
  
  // Generate days for the calendar
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get the day of the week for the first day of the month (0 = Sunday, 6 = Saturday)
  const startDay = monthStart.getDay();
  
  // Generate blank days for the start of the month
  const blankDays = Array.from({ length: startDay }, (_, i) => i);
  
  // Platform colors
  const platformColors: Record<string, string> = {
    instagram: 'bg-pink-500',
    facebook: 'bg-blue-500',
    twitter: 'bg-sky-400',
    linkedin: 'bg-blue-700',
    youtube: 'bg-red-600',
    draft: 'bg-gray-400'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Content Calendar</h1>
          <p className="text-muted-foreground">Manage and schedule your social media posts</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-[180px]">
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
          <Button className="bg-postsync-primary hover:bg-postsync-secondary">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar */}
        <Card className="flex-1 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{format(currentDate, 'MMMM yyyy')}</CardTitle>
              <div className="flex gap-2">
                <Button onClick={prevMonth} size="icon" variant="outline">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button onClick={nextMonth} size="icon" variant="outline">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Days of the week */}
            <div className="grid grid-cols-7 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-medium text-sm py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Blank days */}
              {blankDays.map((_, i) => (
                <div key={`blank-${i}`} className="aspect-square p-1"></div>
              ))}
              
              {/* Days in month */}
              {daysInMonth.map((day) => {
                const isToday = isSameDay(day, new Date());
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const hasEvents = hasPostsOnDate(day);
                
                return (
                  <div
                    key={day.toISOString()}
                    className={cn(
                      "aspect-square p-1",
                      !isSameMonth(day, currentDate) && "text-muted-foreground"
                    )}
                  >
                    <button
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        "w-full h-full flex items-center justify-center rounded-full relative",
                        isToday && "border border-primary font-semibold",
                        isSelected && "bg-primary text-primary-foreground",
                        !isSelected && hasEvents && "font-medium"
                      )}
                    >
                      {format(day, 'd')}
                      {hasEvents && (
                        <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-postsync-primary"></span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        {/* Scheduled Posts for Selected Date */}
        <Card className="w-full lg:w-96 shadow-md">
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Scheduled Posts'}
            </CardTitle>
            <CardDescription>
              {selectedDate 
                ? postsForSelectedDate.length > 0 
                  ? `${postsForSelectedDate.length} post${postsForSelectedDate.length === 1 ? '' : 's'} scheduled` 
                  : 'No posts scheduled' 
                : 'Select a date to view scheduled posts'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedDate ? (
              <div className="text-center py-8 text-muted-foreground">
                Select a date on the calendar to view scheduled posts.
              </div>
            ) : postsForSelectedDate.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No posts scheduled for this date.
              </div>
            ) : (
              <div className="space-y-4">
                {postsForSelectedDate.map(post => (
                  <div key={post.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(parseISO(post.date), 'h:mm a')}
                        </p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Post</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this post? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="ghost">Cancel</Button>
                            <Button 
                              variant="destructive" 
                              onClick={() => deletePost(post.id)}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge className={cn("capitalize", platformColors[post.platform] || "bg-gray-500")}>
                        {post.platform}
                      </Badge>
                      <Badge variant="outline" className={post.status === 'scheduled' ? 'border-green-500 text-green-600' : 'border-amber-500 text-amber-600'}>
                        {post.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            {selectedDate && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Create Post</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                    <DialogDescription>
                      Schedule a post for {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {/* Post creation form would go here */}
                    <p className="text-center text-muted-foreground">Post creation form placeholder</p>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </CardFooter>
        </Card>
      </div>

      {/* Upcoming Posts Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 6)
            .map(post => (
              <Card key={post.id} className="shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <Badge className={cn("capitalize", platformColors[post.platform] || "bg-gray-500")}>
                      {post.platform}
                    </Badge>
                  </div>
                  <CardDescription>
                    {format(parseISO(post.date), 'MMMM d, yyyy')} at {format(parseISO(post.date), 'h:mm a')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm pb-3">
                  <Badge variant="outline" className={post.status === 'scheduled' ? 'border-green-500 text-green-600' : 'border-amber-500 text-amber-600'}>
                    {post.status}
                  </Badge>
                </CardContent>
                <CardFooter className="pt-0 flex justify-end gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Post</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this post? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="ghost">Cancel</Button>
                        <Button 
                          variant="destructive" 
                          onClick={() => deletePost(post.id)}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
