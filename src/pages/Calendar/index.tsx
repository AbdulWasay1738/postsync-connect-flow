
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, isSameDay, addDays, parseISO } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Instagram, Facebook, Linkedin, Twitter, Youtube, Plus, X } from 'lucide-react';
import Container from '@/components/ui/Container';

// Mock data for events
const mockEvents = [
  {
    id: '1',
    date: new Date(),
    platform: 'instagram',
    content: 'Check out our latest post!',
    time: '09:00 AM',
  },
  {
    id: '2',
    date: addDays(new Date(), 2),
    platform: 'facebook',
    content: 'Don\'t miss our live event!',
    time: '02:30 PM',
  },
  {
    id: '3',
    date: addDays(new Date(), 2),
    platform: 'linkedin',
    content: 'New job opportunities available!',
    time: '11:15 AM',
  },
  {
    id: '4',
    date: addDays(new Date(), 5),
    platform: 'twitter',
    content: 'Breaking news!',
    time: '04:45 PM',
  },
  {
    id: '5',
    date: addDays(new Date(), 7),
    platform: 'youtube',
    content: 'New video tutorial!',
    time: '10:00 AM',
  },
  {
    id: '6',
    date: addDays(new Date(), 10),
    platform: 'instagram',
    content: 'Behind the scenes!',
    time: '03:20 PM',
  },
  {
    id: '7',
    date: addDays(new Date(), 12),
    platform: 'facebook',
    content: 'Special discount for our followers!',
    time: '08:45 AM',
  }
];

const ContentCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Get events for the selected day
  const getSelectedDayEvents = () => {
    if (!date) return [];
    return mockEvents
      .filter(event => isSameDay(event.date, date))
      .sort((a, b) => a.time.localeCompare(b.time));
  };
  
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return '#E1306C';
      case 'facebook':
        return '#4267B2';
      case 'linkedin':
        return '#0077B5';
      case 'twitter':
        return '#1DA1F2';
      case 'youtube':
        return '#FF0000';
      default:
        return '#000';
    }
  };
  
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram size={16} className="text-[#E1306C]" />;
      case 'facebook':
        return <Facebook size={16} className="text-[#4267B2]" />;
      case 'linkedin':
        return <Linkedin size={16} className="text-[#0077B5]" />;
      case 'twitter':
        return <Twitter size={16} className="text-[#1DA1F2]" />;
      case 'youtube':
        return <Youtube size={16} className="text-[#FF0000]" />;
      default:
        return null;
    }
  };
  
  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  // Get all days with events for the calendar
  const daysWithEvents = mockEvents.map(event => event.date);

  return (
    <div className="min-h-screen pb-12 animate-fade-in">
      <Container>
        <div className="py-8">
          <h1 className="text-2xl md:text-3xl font-bold font-inter mb-2">
            Content Calendar
          </h1>
          <p className="text-muted-foreground">
            Plan and schedule your social media content
          </p>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            {/* Calendar - takes more space for better visibility */}
            <div className="lg:col-span-4">
              <Card className="shadow-card dark:bg-card">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 md:p-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-full max-w-none"
                    modifiers={{
                      event: (day) => daysWithEvents.some(eventDay => isSameDay(day, eventDay)),
                    }}
                    modifiersStyles={{
                      event: {
                        fontWeight: "bold",
                        textDecoration: "underline",
                        textDecorationColor: "var(--primary)",
                        textDecorationThickness: "2px",
                        position: "relative",
                      }
                    }}
                    styles={{
                      day_today: {
                        backgroundColor: "var(--primary)",
                        color: "var(--primary-foreground)",
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </div>
            
            {/* Scheduled posts for the selected day */}
            <div className="lg:col-span-3">
              <Card className="shadow-card dark:bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    {date ? format(date, 'MMMM d, yyyy') : 'No date selected'}
                  </CardTitle>
                  <Link to="/create">
                    <Button size="sm" variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Post
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {getSelectedDayEvents().length > 0 ? (
                    <div className="space-y-3">
                      {getSelectedDayEvents().map(event => (
                        <div 
                          key={event.id}
                          className="p-3 rounded-lg border hover:bg-accent/30 transition-colors cursor-pointer flex items-center justify-between"
                          onClick={() => handleEventClick(event)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 flex items-center justify-center rounded-full" style={{ backgroundColor: `${getPlatformColor(event.platform)}20` }}>
                              {getPlatformIcon(event.platform)}
                            </div>
                            <div>
                              <p className="font-medium">{event.time}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">{event.content}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">View details</span>
                            <span className="text-lg">→</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="rounded-full bg-muted/30 p-3">
                        <CalendarIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="mt-3 font-medium">No posts scheduled</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        No content scheduled for this day.
                      </p>
                      <Button className="mt-4" asChild>
                        <Link to="/create">Schedule Post</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* All upcoming posts */}
          <Card className="shadow-card dark:bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Upcoming Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockEvents
                  .filter(event => event.date >= new Date())
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 6) // Show only next 6 posts
                  .map(event => (
                    <div 
                      key={event.id}
                      className="p-4 rounded-lg border hover:shadow-md transition-all cursor-pointer"
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-7 w-7 flex items-center justify-center rounded-full" style={{ backgroundColor: `${getPlatformColor(event.platform)}20` }}>
                          {getPlatformIcon(event.platform)}
                        </div>
                        <span className="text-sm font-medium" style={{ color: getPlatformColor(event.platform) }}>
                          {event.platform.charAt(0).toUpperCase() + event.platform.slice(1)}
                        </span>
                      </div>
                      <p className="line-clamp-2 mb-3 text-sm">{event.content}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{format(event.date, 'MMM d')}</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                  ))}
              </div>
              {mockEvents.filter(event => event.date >= new Date()).length > 6 && (
                <div className="mt-4 flex justify-center">
                  <Button variant="outline">View All Scheduled Posts</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Event Details Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent className="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                {selectedEvent && getPlatformIcon(selectedEvent.platform)}
                <span>Post Details</span>
              </SheetTitle>
              <SheetDescription>
                {selectedEvent && format(selectedEvent.date, 'PPPP')} at {selectedEvent?.time}
              </SheetDescription>
            </SheetHeader>
            <Separator className="my-4" />
            {selectedEvent && (
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-1">Platform</p>
                  <p className="text-muted-foreground capitalize">{selectedEvent.platform}</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Content</p>
                  <p>{selectedEvent.content}</p>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline">Edit</Button>
                  <Button>Share Now</Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </Container>
    </div>
  );
};

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

export default ContentCalendar;
