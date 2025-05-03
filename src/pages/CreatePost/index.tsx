import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format, addDays } from 'date-fns';
import { 
  Upload, 
  X, 
  Image, 
  Video, 
  FileText, 
  Calendar as CalendarIcon, 
  Clock, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Pinterest, 
  Youtube 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Container from '@/components/ui/Container';

// Social platforms data
const platforms = [
  { id: 'instagram', name: 'Instagram', icon: <Instagram />, color: '#E1306C', characterLimit: 2200 },
  { id: 'facebook', name: 'Facebook', icon: <Facebook />, color: '#4267B2', characterLimit: 63206 },
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin />, color: '#0077B5', characterLimit: 3000 },
  { id: 'twitter', name: 'Twitter', icon: <Twitter />, color: '#1DA1F2', characterLimit: 280 },
  { id: 'pinterest', name: 'Pinterest', icon: <Twitter />, color: '#E60023', characterLimit: 500 }, // Using Twitter as replacement
  { id: 'youtube', name: 'YouTube', icon: <Youtube />, color: '#FF0000', characterLimit: 5000 },
];

// Timezone data
const timezones = [
  { value: 'America/New_York', label: '(GMT-5) Eastern Time' },
  { value: 'America/Chicago', label: '(GMT-6) Central Time' },
  { value: 'America/Denver', label: '(GMT-7) Mountain Time' },
  { value: 'America/Los_Angeles', label: '(GMT-8) Pacific Time' },
  { value: 'Europe/London', label: '(GMT+0) Greenwich Mean Time' },
  { value: 'Europe/Paris', label: '(GMT+1) Central European Time' },
  { value: 'Asia/Tokyo', label: '(GMT+9) Japan Standard Time' },
  { value: 'Australia/Sydney', label: '(GMT+10) Australian Eastern Time' },
];

interface FormData {
  content: string;
  date: Date;
  time: string;
  timezone: string;
}

const CreatePost = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedFilesPreviews, setUploadedFilesPreviews] = useState<string[]>([]);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      content: '',
      date: addDays(new Date(), 1),
      time: '10:00',
      timezone: 'America/New_York',
    },
  });
  
  const content = watch('content');
  const date = watch('date');
  
  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Create previews
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedFilesPreviews(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  
  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setUploadedFilesPreviews(prev => prev.filter((_, i) => i !== index));
  };
  
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image size={20} />;
    if (fileType.startsWith('video/')) return <Video size={20} />;
    return <FileText size={20} />;
  };
  
  const nextStep = () => {
    if (currentStep === 1 && selectedPlatforms.length === 0) {
      alert('Please select at least one platform');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    // 🔌 BACKEND_HOOK: submitPost(data, selectedPlatforms, uploadedFiles)
    console.log({
      ...data,
      platforms: selectedPlatforms,
      files: uploadedFiles.map(file => file.name),
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Post scheduled successfully!');
      // Redirect to calendar
      window.location.href = '/calendar';
    }, 1500);
  };
  
  const getLongestCharacterLimit = () => {
    if (selectedPlatforms.length === 0) return 5000;
    
    return Math.min(
      ...selectedPlatforms.map(id => 
        platforms.find(p => p.id === id)?.characterLimit || 5000
      )
    );
  };
  
  const characterLimit = getLongestCharacterLimit();
  const characterCount = content?.length || 0;
  
  const generateHashtags = () => {
    // 🔌 BACKEND_HOOK: generateHashtags(content, uploadedFiles)
    const mockHashtags = "#socialmedia #digitalmarketing #contentcreation #postsync";
    
    setValue('content', content + (content ? '\n\n' : '') + mockHashtags);
  };
  
  const renderProgressBar = () => {
    return (
      <div className="w-full mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3].map((step) => (
            <div 
              key={step} 
              className={`flex flex-col items-center ${step < currentStep ? 'text-postsync-primary' : step === currentStep ? 'text-postsync-text' : 'text-postsync-muted'}`}
            >
              <div 
                className={`w-8 h-8 flex items-center justify-center rounded-full mb-1 
                  ${step < currentStep ? 'bg-postsync-primary text-white' : 
                    step === currentStep ? 'border-2 border-postsync-primary text-postsync-primary' : 
                    'border-2 border-gray-200 text-postsync-muted'}`}
              >
                {step}
              </div>
              <span className="text-xs hidden sm:block">
                {step === 1 ? 'Select Platforms' : step === 2 ? 'Compose' : 'Schedule'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative h-1 bg-gray-200 rounded-full">
          <div 
            className="absolute h-1 bg-postsync-primary rounded-full transition-all"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };
  
  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-inter">Select Platforms</h2>
            <p className="text-postsync-muted">Choose the social media platforms where you want to publish your content.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-6">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={`p-4 rounded-lg border-2 transition-colors cursor-pointer flex flex-col items-center justify-center ${
                    selectedPlatforms.includes(platform.id)
                      ? `border-[${platform.color}] bg-[${platform.color}]/10`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ 
                    borderColor: selectedPlatforms.includes(platform.id) ? platform.color : undefined,
                    backgroundColor: selectedPlatforms.includes(platform.id) ? `${platform.color}10` : undefined
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                    style={{ color: platform.color }}
                  >
                    {platform.icon}
                  </div>
                  <span className="text-sm font-medium">{platform.name}</span>
                </div>
              ))}
            </div>
            
            {selectedPlatforms.length === 0 && (
              <p className="text-red-500 text-sm">Please select at least one platform</p>
            )}
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-inter">Create Your Post</h2>
            <p className="text-postsync-muted">Compose your content and add media files.</p>
            
            <div className="space-y-4 mt-6">
              <div>
                <Label htmlFor="content">Post content</Label>
                <div className="mt-2">
                  <Textarea
                    id="content"
                    placeholder="Write your post content here..."
                    className="min-h-[150px]"
                    {...register("content")}
                  />
                  <div className="flex justify-between mt-1 text-xs text-postsync-muted">
                    <div>
                      Character count: {characterCount} / {characterLimit}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={generateHashtags}
                      className="text-xs"
                    >
                      Generate Hashtags
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Media upload */}
              <div>
                <Label>Media</Label>
                <div className="mt-2">
                  {showFileUpload ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                      <div className="flex flex-col items-center">
                        <Upload className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-sm text-postsync-muted mb-2">
                          Drag and drop files here, or click to browse
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          id="file-upload"
                          multiple
                          onChange={handleFileUpload}
                        />
                        <label htmlFor="file-upload">
                          <Button type="button" variant="outline" size="sm">
                            Browse Files
                          </Button>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full py-8" 
                      onClick={() => setShowFileUpload(true)}
                    >
                      <Upload className="mr-2 h-4 w-4" /> Upload Media
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Uploaded files preview */}
              {uploadedFilesPreviews.length > 0 && (
                <div>
                  <Label>Uploaded files</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                    {uploadedFilesPreviews.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-md overflow-hidden border border-gray-200">
                          <img 
                            src={file} 
                            alt={`Upload ${index}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <Label>Selected platforms</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedPlatforms.map(id => {
                    const platform = platforms.find(p => p.id === id);
                    return platform ? (
                      <div 
                        key={id}
                        className="px-3 py-1 rounded-full flex items-center space-x-1 text-white text-sm"
                        style={{ backgroundColor: platform.color }}
                      >
                        <span>{platform.icon}</span>
                        <span>{platform.name}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-inter">Schedule Your Post</h2>
            <p className="text-postsync-muted">Choose when your content will be published.</p>
            
            <div className="space-y-6 mt-6">
              {/* Date picker */}
              <div>
                <Label htmlFor="date">Publication Date</Label>
                <div className="mt-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className="w-full justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => date && setValue('date', date)}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* Time picker */}
              <div>
                <Label htmlFor="time">Publication Time</Label>
                <div className="mt-2">
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-postsync-muted" />
                    <Input
                      id="time"
                      type="time"
                      className="pl-10"
                      {...register("time", { required: "Time is required" })}
                    />
                  </div>
                </div>
              </div>
              
              {/* Timezone */}
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <div className="mt-2">
                  <Select
                    defaultValue={timezones[0].value}
                    onValueChange={(value) => setValue('timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Preview */}
              <div>
                <Label>Post Preview</Label>
                <Card className="mt-2">
                  <CardContent className="p-4">
                    {uploadedFilesPreviews.length > 0 && (
                      <div className="mb-4 rounded-md overflow-hidden border border-gray-200">
                        <img 
                          src={uploadedFilesPreviews[0]} 
                          alt="Preview" 
                          className="w-full h-auto max-h-[200px] object-cover"
                        />
                      </div>
                    )}
                    <div className="text-sm">
                      {content || <span className="text-postsync-muted italic">No content provided</span>}
                    </div>
                    <div className="mt-4 text-xs text-postsync-muted">
                      Scheduled for: {date ? format(date, 'PPP') : 'Not set'} at {watch('time') || 'Not set'}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {selectedPlatforms.map(id => {
                        const platform = platforms.find(p => p.id === id);
                        return platform ? (
                          <div 
                            key={id}
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ color: platform.color }}
                          >
                            {platform.icon}
                          </div>
                        ) : null;
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen pb-12">
      <Container>
        <div className="py-8">
          <h1 className="text-2xl md:text-3xl font-bold font-inter mb-2">
            Create New Post
          </h1>
          <p className="text-postsync-muted">
            Create and schedule content for your social media platforms
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderProgressBar()}
            
            <Card>
              <CardContent className="p-6">
                {renderStepContent()}
                
                <div className="flex justify-between mt-8">
                  {currentStep > 1 ? (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  {currentStep < 3 ? (
                    <Button type="button" onClick={nextStep}>
                      Continue
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isLoading} className="bg-postsync-primary hover:bg-blue-700">
                      {isLoading ? 'Scheduling...' : 'Schedule Post'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default CreatePost;
