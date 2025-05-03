
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, Clock, Image as ImageIcon, Link, Plus, Instagram, Facebook, Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const CreatePostPage = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [scheduleTime, setScheduleTime] = useState<string>('');
  
  // Platform selection state
  const [platforms, setPlatforms] = useState({
    instagram: true,
    facebook: true,
    twitter: false,
    linkedin: false,
    youtube: false
  });
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(file.name);
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Logic to submit post would go here
    console.log('Submitting post:', { 
      content: postContent, 
      image: selectedImage, 
      scheduleDate, 
      scheduleTime, 
      platforms 
    });
    
    // Display success message or redirect
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <p className="text-muted-foreground">Craft and schedule your social media content</p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" asChild>
            <a href="/ai-captions">
              Use AI Caption Generator
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button>Save as Draft</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Post Editor */}
        <div className="lg:col-span-2">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>Write your post content and add media</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What's on your mind? Write your post content here..."
                className="min-h-[200px]"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">Media</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      <Link className="h-3 w-3 mr-1" />
                      Add URL
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Plus className="h-3 w-3 mr-1" />
                      Create
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {previewImage ? (
                    <div className="relative group">
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="w-full h-auto rounded-md object-cover"
                        style={{ maxHeight: '300px' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                        <Button variant="destructive" size="sm" onClick={() => {
                          setSelectedImage(null);
                          setPreviewImage(null);
                        }}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed rounded-md p-8 text-center">
                      <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Drag and drop an image, or click to browse
                      </p>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        id="image-upload"
                        onChange={handleImageUpload}
                      />
                      <Button asChild variant="ghost" className="mt-4">
                        <label htmlFor="image-upload" className="cursor-pointer">
                          Upload Image
                        </label>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6 shadow-md">
            <CardHeader>
              <CardTitle>Customize for Each Platform</CardTitle>
              <CardDescription>Tailor your content for different social media platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="global">
                <TabsList className="mb-4 grid w-full grid-cols-6">
                  <TabsTrigger value="global">Global</TabsTrigger>
                  <TabsTrigger value="instagram" disabled={!platforms.instagram}>Instagram</TabsTrigger>
                  <TabsTrigger value="facebook" disabled={!platforms.facebook}>Facebook</TabsTrigger>
                  <TabsTrigger value="twitter" disabled={!platforms.twitter}>Twitter</TabsTrigger>
                  <TabsTrigger value="linkedin" disabled={!platforms.linkedin}>LinkedIn</TabsTrigger>
                  <TabsTrigger value="youtube" disabled={!platforms.youtube}>YouTube</TabsTrigger>
                </TabsList>
                
                <TabsContent value="global">
                  <p className="text-muted-foreground mb-4">
                    This content will be used for all platforms. Customize individual platforms by selecting the tabs above.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="global-first-comment">First Comment</Label>
                      <Textarea 
                        id="global-first-comment"
                        placeholder="Add a first comment (optional)"
                        className="mt-1 h-20"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="global-hashtags">Hashtags</Label>
                      <Textarea 
                        id="global-hashtags"
                        placeholder="#socialmedia #marketing #content"
                        className="mt-1 h-20"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                {/* Platform-specific tabs would be expanded here */}
                <TabsContent value="instagram">
                  <p className="text-muted-foreground mb-4">
                    Customize your content specifically for Instagram.
                  </p>
                  {/* Instagram-specific options */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Settings Panel */}
        <div>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
              <CardDescription>Configure when and where to publish your post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Platform Selection */}
              <div>
                <h3 className="text-sm font-medium mb-3">Select Platforms</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Instagram className="h-5 w-5 text-[#E1306C]" />
                      <Label htmlFor="instagram" className="text-sm">Instagram</Label>
                    </div>
                    <Switch 
                      id="instagram" 
                      checked={platforms.instagram}
                      onCheckedChange={(checked) => setPlatforms({...platforms, instagram: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Facebook className="h-5 w-5 text-[#1877F2]" />
                      <Label htmlFor="facebook" className="text-sm">Facebook</Label>
                    </div>
                    <Switch 
                      id="facebook" 
                      checked={platforms.facebook}
                      onCheckedChange={(checked) => setPlatforms({...platforms, facebook: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                      <Label htmlFor="twitter" className="text-sm">Twitter</Label>
                    </div>
                    <Switch 
                      id="twitter" 
                      checked={platforms.twitter}
                      onCheckedChange={(checked) => setPlatforms({...platforms, twitter: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-5 w-5 text-[#0077B5]" />
                      <Label htmlFor="linkedin" className="text-sm">LinkedIn</Label>
                    </div>
                    <Switch 
                      id="linkedin" 
                      checked={platforms.linkedin}
                      onCheckedChange={(checked) => setPlatforms({...platforms, linkedin: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Youtube className="h-5 w-5 text-[#FF0000]" />
                      <Label htmlFor="youtube" className="text-sm">YouTube</Label>
                    </div>
                    <Switch 
                      id="youtube" 
                      checked={platforms.youtube}
                      onCheckedChange={(checked) => setPlatforms({...platforms, youtube: checked})}
                    />
                  </div>
                </div>
              </div>
              
              {/* Scheduling Options */}
              <div>
                <h3 className="text-sm font-medium mb-3">Scheduling</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="schedule-date">Date</Label>
                      <div className="flex mt-1">
                        <Input
                          id="schedule-date"
                          type="date"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          className={cn(
                            "rounded-l-md",
                            !scheduleDate && "text-muted-foreground"
                          )}
                          placeholder="Select date"
                        />
                        <Button 
                          variant="outline" 
                          type="button"
                          className="rounded-l-none border-l-0"
                        >
                          <CalendarIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="schedule-time">Time</Label>
                      <div className="flex mt-1">
                        <Input
                          id="schedule-time"
                          type="time"
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                          className={cn(
                            "rounded-l-md",
                            !scheduleTime && "text-muted-foreground"
                          )}
                        />
                        <Button 
                          variant="outline" 
                          type="button"
                          className="rounded-l-none border-l-0"
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                        <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                        <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                        <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Advanced Options */}
              <div>
                <h3 className="text-sm font-medium mb-3">Advanced Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <Label htmlFor="auto-tagging" className="text-sm">Auto Hashtags</Label>
                      <p className="text-xs text-muted-foreground">Automatically add relevant hashtags</p>
                    </div>
                    <Switch id="auto-tagging" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <Label htmlFor="optimize-time" className="text-sm">Best Time to Post</Label>
                      <p className="text-xs text-muted-foreground">Optimize posting time for engagement</p>
                    </div>
                    <Switch id="optimize-time" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                className="w-full bg-postsync-primary hover:bg-postsync-secondary"
                onClick={handleSubmit}
              >
                Schedule Post
              </Button>
              <Button variant="outline" className="w-full">
                Post Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
