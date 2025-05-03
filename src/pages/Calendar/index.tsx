
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, isSameMonth, isSameDay, addDays, subDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ChevronRight, Plus, Instagram, Facebook, Linkedin, Twitter, Youtube, X } from 'lucide-react';
import Container from '@/components/ui/Container';

// Mock data for calendar events
const mockEvents = [
  {
    id: 1,
    title: "New Product Launch",
    date: new Date(2023, 4, 3, 14, 30),
    platforms: ["instagram", "facebook"],
    image: "https://images.unsplash.com/photo-1691858453840-95d99a5353e1?q=80&w=1760&auto=format&fit=crop",
    content: "Introducing our newest collection! Check it out now and let us know your thoughts.",
    status: "scheduled"
  },
  {
    id: 2,
    title: "Company Update",
    date: new Date(2023, 4, 5, 10, 0),
    platforms: ["linkedin"],
    image: null,
    content: "We're excited to announce our company's expansion into new markets. Read more about our growth strategy!",
    status: "scheduled"
  },
  {
    id: 3,
    title: "Summer Sale",
    date: new Date(2023, 4, 8, 9, 0),
    platforms: ["instagram", "facebook", "twitter"],
    image: "https://images.unsplash.com/photo-1695653422259-8a84449e45c2?q=80&w=1760&auto=format&fit=crop",
    content: "Summer SALE starts now! 30% off all items this week only. #summersale #discount",
    status: "scheduled"
  },
  {
    id: 4,
    title: "Webinar Announcement",
    date: new Date(2023, 4, 15, 16, 0),
    platforms: ["linkedin", "facebook"],
    image: null,
    content: "Join our webinar on digital marketing trends for 2023. Register now to secure your spot!",
    status: "scheduled"
  }
];

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'instagram':
      return <Instagram size={16} className="text-[#E1306C]" />;
    case 'facebook':
      return <Facebook size={16} className="text-[#4267B2]" />;
    case 'linkedin':
      return <Linkedin size={16} className="text-[#0077B5]" />;
    case 'twitter':
      return <Twitter size={16} className="text-[#1DA1F2]" />;
    case 'pinterest':
      return <Twitter size={16} className="text-[#E60023]" />; // Using Twitter icon as a replacement for Pinterest
    case 'youtube':
      return <Youtube size={16} className="text-[#FF0000]" />;
    default:
      return null;
  }
};

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case 'instagram':
      return '#E1306C';
    case 'facebook':
      return '#4267B2';
    case 'linkedin':
      return '#0077B5';
    case 'twitter':
      return '#1DA1F2';
    case 'pinterest':
      return '#E60023';
    case 'youtube':
      return '#FF0000';
    default:
      return '#888888';
  }
};

type Event = {
  id: number;
  title: string;
  date: Date;
  platforms: string[];
  image: string | null;
  content: string;
  status: string;
};

const CalendarPage = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Function to get events for a specific date
  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => isSameDay(event.date, date));
  };
  
  // Events for the selected date
  const [dateEvents, setDateEvents] = useState(getEventsForDate(selectedDate));
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setDateEvents(getEventsForDate(date));
    }
  };
  
  // Function to render dots on calendar for dates with events
  const renderDayContent = (props: any) => {
    const day = props.date;
    const events = mockEvents.filter(event => isSameDay(event.date, day));
    
    if (events.length === 0) return null;
    
    // Extract unique platforms
    const platforms = [...new Set(events.flatMap(event => event.platforms))];
    
    return (
      <div className="flex justify-center mt-1 overflow-hidden">
        {platforms.slice(0, 3).map((platform, index) => (
          <div 
            key={index} 
            className="w-1.5 h-1.5 rounded-full mx-0.5" 
            style={{ backgroundColor: getPlatformColor(platform) }}
          />
        ))}
        {platforms.length > 3 && (
          <div className="w-1.5 h-1.5 rounded-full mx-0.5 bg-gray-400" />
        )}
      </div>
    );
  };
  
  // Navigation functions
  const nextMonth = () => setCurrentMonth(addDays(currentMonth, 30));
  const prevMonth = () => setCurrentMonth(subDays(currentMonth, 30));
  
  const openEventDetails = (event: Event) => {
    setSelectedEvent(event);
  };
  
  const closeEventDetails = () => {
    setSelectedEvent(null);
  };
  
  return (
    <div className="min-h-screen pb-12">
      <Container>
        {/* Header */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-inter mb-2">
              Content Calendar
            </h1>
            <p className="text-postsync-muted">
              Schedule and manage your social media posts across all platforms
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild className="bg-postsync-primary hover:bg-blue-700">
              <Link to="/create">
                <Plus className="mr-2 h-4 w-4" /> Create New Post
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Calendar and Events Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold font-inter">
                  {format(currentMonth, 'MMMM yyyy')}
                </h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setCurrentMonth(today)}>
                    Today
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Calendar Component */}
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="rounded-md border p-3 pointer-events-auto"
                components={{
                  DayContent: (props) => (
                    <div>
                      {props.day.day}
                      {renderDayContent(props.day.date)}
                    </div>
                  ),
                }}
              />
            </CardContent>
          </Card>
          
          {/* Events for Selected Day */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold font-inter mb-4">
                Posts for {format(selectedDate, 'MMM d, yyyy')}
              </h2>
              
              {dateEvents.length > 0 ? (
                <div className="space-y-4">
                  {dateEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="border border-gray-100 rounded-md p-3 cursor-pointer hover:border-postsync-primary transition-colors"
                      onClick={() => openEventDetails(event)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-postsync-muted">
                            {format(event.date, 'h:mm a')}
                          </p>
                        </div>
                        <div className="flex space-x-1">
                          {event.platforms.map((platform, index) => (
                            <div key={index}>
                              {getPlatformIcon(platform)}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-sm truncate">{event.content}</div>
                      
                      {event.image && (
                        <div className="mt-2 h-20 overflow-hidden rounded-md">
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs px-2 py-0.5 bg-blue-50 text-postsync-primary rounded-full">
                          {event.status}
                        </span>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-postsync-muted mb-4">No posts scheduled for this day</p>
                  <Button asChild variant="outline">
                    <Link to="/create">Schedule a Post</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
      
      {/* Event Details Sheet */}
      <Sheet open={!!selectedEvent} onOpenChange={() => closeEventDetails()}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{selectedEvent?.title}</SheetTitle>
            <SheetDescription>
              Scheduled for {selectedEvent && format(selectedEvent.date, 'MMMM d, yyyy h:mm a')}
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6">
            {/* Platforms */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Publishing to:</h4>
              <div className="flex space-x-2">
                {selectedEvent?.platforms.map((platform, index) => (
                  <div 
                    key={index} 
                    className="px-2 py-1 rounded-full text-white text-xs flex items-center space-x-1"
                    style={{ backgroundColor: getPlatformColor(platform) }}
                  >
                    <span>{getPlatformIcon(platform)}</span>
                    <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Content Preview */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Content:</h4>
              <p className="text-sm border border-gray-100 rounded-md p-3 bg-gray-50">
                {selectedEvent?.content}
              </p>
            </div>
            
            {/* Image Preview */}
            {selectedEvent?.image && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Media:</h4>
                <div className="border border-gray-100 rounded-md overflow-hidden">
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.title} 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}
            
            <Separator className="my-6" />
            
            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
              <Button asChild variant="outline">
                <Link to={`/edit/${selectedEvent?.id}`}>
                  Edit Post
                </Link>
              </Button>
              <Button variant="destructive">
                {/* 🔌 BACKEND_HOOK: deleteEvent(selectedEvent.id) */}
                Delete Post
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CalendarPage;
