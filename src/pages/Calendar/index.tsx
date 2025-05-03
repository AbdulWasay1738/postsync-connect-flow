
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, isSameMonth, isSameDay, addDays, subDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ChevronRight, Plus, Instagram, Facebook, Linkedin, Twitter, Youtube, X } from 'lucide-react';
import Container from '@/components/ui/Container';

// Mock data for events
const mockEvents = [
  {
    id: '1',
    date: new Date(),
    platform: 'instagram',
    content: 'Check out our latest post!',
  },
  {
    id: '2',
    date: addDays(new Date(), 2),
    platform: 'facebook',
    content: 'Don\'t miss our live event!',
  },
  {
    id: '3',
    date: addDays(new Date(), 2),
    platform: 'linkedin',
    content: 'New job opportunities available!',
  },
  {
    id: '4',
    date: addDays(new Date(), 5),
    platform: 'twitter',
    content: 'Breaking news!',
  },
  {
    id: '5',
    date: addDays(new Date(), 7),
    platform: 'youtube',
    content: 'New video tutorial!',
  },
  {
    id: '6',
    date: addDays(new Date(), 10),
    platform: 'instagram',
    content: 'Behind the scenes!',
  },
  {
    id: '7',
    date: addDays(new Date(), 12),
    platform: 'facebook',
    content: 'Special discount for our followers!',
  },
  {
    id: '8',
    date: addDays(new Date(), 15),
    platform: 'linkedin',
    content: 'Tips for career growth!',
  },
  {
    id: '9',
    date: addDays(new Date(), 18),
    platform: 'twitter',
    content: 'Join our Twitter chat!',
  },
  {
    id: '10',
    date: addDays(new Date(), 20),
    platform: 'youtube',
    content: 'Q&A session!',
  },
];

const ContentCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
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
      case 'pinterest':
        return '#E60023';
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
      case 'pinterest':
        return <Twitter size={16} className="text-[#E60023]" />; // Using Twitter icon as a replacement for Pinterest
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

  // Modified day cell render function for the Calendar
  const modifiers = {
    eventDay: (day: Date) => mockEvents.some(event => isSameDay(event.date, day)),
  };

  const modifiersStyles = {
    eventDay: {
      position: "relative",
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: "3px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        backgroundColor: "var(--primary)",
      }
    }
  };
  
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
        
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="w-full md:w-1/3 shadow-card dark:bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-2 pr-2 relative">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-0 pointer-events-auto"
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
              />
              
              <div className="absolute top-2 right-2 flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setDate(subDays(date, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setDate(addDays(date, 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="w-full md:w-2/3 shadow-card dark:bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Scheduled Content
              </CardTitle>
              <Link to="/create">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Post
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="pl-2 pr-2">
              {mockEvents
                .filter(event => isSameMonth(event.date, date))
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map(event => (
                  <div 
                    key={event.id}
                    className="py-2 px-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer flex items-center justify-between"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="flex items-center">
                      {getPlatformIcon(event.platform)}
                      <span className="ml-2 text-sm">{format(event.date, 'h:mm a')}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {event.content.substring(0, 30)}
                      {event.content.length > 30 && '...'}
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
        
        {/* Event Details Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent className="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Post Details</SheetTitle>
              <SheetDescription>
                {selectedEvent ? format(selectedEvent.date, 'PPP') : 'No event selected'}
              </SheetDescription>
            </SheetHeader>
            <Separator />
            <div className="grid gap-4 py-4">
              {selectedEvent ? (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="col-span-4 flex items-center">
                      {getPlatformIcon(selectedEvent.platform)}
                      <span className="ml-2 font-medium">{selectedEvent.platform}</span>
                    </div>
                    <div className="col-span-4">
                      <p className="text-sm">{selectedEvent.content}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-sm text-muted-foreground">No event selected</div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </div>
  );
};

export default ContentCalendar;
