
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Check, Wand2, Copy, Instagram, Facebook, Twitter } from 'lucide-react';
import Container from '@/components/ui/Container';

// Mock data for generated captions
const mockCaptions = {
  general: "Elevate your everyday style with our new minimalist collection. Perfect blend of comfort and elegance for any occasion. ✨ #NewArrivals #MinimalistStyle",
  
  instagram: "✨ Elevate your everyday look with our latest minimalist pieces ✨\n\nDesigned for the modern individual who values both style and comfort, our new collection brings versatility to your wardrobe.\n\nAvailable now online and in stores!\n\n#MinimalistFashion #NewCollection #EverydayStyle #ModernEssentials #QualityCraftsmanship",
  
  facebook: "Introducing our NEW minimalist collection - where comfort meets elegance! 🌟\n\nCrafted with sustainable materials and designed to last, these versatile pieces will elevate your everyday style without sacrificing comfort.\n\nCheck out the full collection on our website (link in bio) and enjoy 15% off your first purchase with code MINIMAL15!",
  
  twitter: "Elevate your everyday style with our new minimalist collection. Comfort meets elegance in every piece. ✨\n\nShop now: [link] #MinimalistFashion #NewArrivals"
};

// Mock data for hashtags
const mockHashtags = [
  "#MinimalistFashion", "#CleanAesthetic", "#EverydayStyle", "#ModernEssentials", 
  "#QualityCraftsmanship", "#SlowFashion", "#ContemporaryDesign", "#TrendAlert", 
  "#NewArrivals", "#FashionEssentials", "#StyleInspiration"
];

const AICaptions = () => {
  const [searchParams] = useSearchParams();
  const preloadedImage = searchParams.get('image');
  
  const [selectedTab, setSelectedTab] = useState('general');
  const [uploadedImage, setUploadedImage] = useState<string | null>(preloadedImage);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const generateCaption = () => {
    setIsGenerating(true);
    // 🔌 BACKEND_HOOK: generateCaption(uploadedImage, customPrompt)
    
    // Simulate API call delay
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 1500);
  };
  
  const toggleHashtag = (hashtag: string) => {
    if (selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(prev => prev.filter(tag => tag !== hashtag));
    } else {
      setSelectedHashtags(prev => [...prev, hashtag]);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show success toast here
  };
  
  const sendToCreatePost = () => {
    // Get the caption from the active tab
    const caption = selectedTab === 'general' 
      ? mockCaptions.general 
      : selectedTab === 'instagram'
        ? mockCaptions.instagram
        : selectedTab === 'facebook'
          ? mockCaptions.facebook
          : mockCaptions.twitter;
    
    // Add selected hashtags if not already in the caption
    const hashtags = selectedHashtags.join(' ');
    const finalCaption = caption.includes('#') ? caption : `${caption}\n\n${hashtags}`;
    
    // 🔌 BACKEND_HOOK: setCreatePostData(finalCaption, uploadedImage)
    
    // Redirect to create post page
    window.location.href = `/create?caption=${encodeURIComponent(finalCaption)}&image=${encodeURIComponent(uploadedImage || '')}`;
  };
  
  return (
    <div className="min-h-screen pb-12">
      <Container>
        <div className="py-8">
          <h1 className="text-2xl md:text-3xl font-bold font-inter mb-2">
            AI Caption Generator
          </h1>
          <p className="text-postsync-muted">
            Create engaging captions and hashtags using artificial intelligence
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Image upload and custom prompt */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label className="mb-2 block">Upload Image</Label>
                  {uploadedImage ? (
                    <div className="relative rounded-md overflow-hidden border border-gray-200">
                      <img 
                        src={uploadedImage} 
                        alt="Upload" 
                        className="w-full h-auto"
                      />
                      <Button 
                        variant="secondary"
                        className="absolute bottom-2 right-2"
                        size="sm"
                        onClick={() => setUploadedImage(null)}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-200 rounded-md p-8 text-center">
                      <div className="flex flex-col items-center">
                        <Upload className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-sm text-postsync-muted mb-4">
                          Upload an image to generate captions
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          id="image-upload"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        <label htmlFor="image-upload">
                          <Button variant="outline" className="cursor-pointer">
                            Select Image
                          </Button>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="custom-prompt" className="mb-2 block">
                    Custom Prompt (Optional)
                  </Label>
                  <Textarea
                    id="custom-prompt"
                    placeholder="E.g., 'Modern summer fashion for women', 'New product launch for tech gadget'"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="resize-none"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Button 
                    onClick={generateCaption} 
                    disabled={!uploadedImage || isGenerating}
                    className="w-full bg-postsync-primary hover:bg-blue-700"
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isGenerating ? 'Generating Captions...' : 'Generate Captions & Hashtags'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {isGenerated && (
              <Card>
                <CardContent className="p-6">
                  <Label className="mb-2 block">Suggested Hashtags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mockHashtags.map((hashtag) => (
                      <div
                        key={hashtag}
                        onClick={() => toggleHashtag(hashtag)}
                        className={`px-2 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                          selectedHashtags.includes(hashtag)
                            ? 'bg-postsync-primary text-white'
                            : 'bg-gray-100 text-postsync-text hover:bg-gray-200'
                        }`}
                      >
                        {hashtag}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      onClick={sendToCreatePost} 
                      className="w-full"
                    >
                      Send to Create Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Right column - Generated captions */}
          <div className="lg:col-span-2">
            {isGenerated ? (
              <Card>
                <CardContent className="p-6">
                  <Tabs 
                    defaultValue="general" 
                    value={selectedTab}
                    onValueChange={setSelectedTab}
                  >
                    <TabsList className="mb-4">
                      <TabsTrigger value="general">General</TabsTrigger>
                      <TabsTrigger value="instagram" className="flex items-center">
                        <Instagram className="mr-1 h-4 w-4" />
                        Instagram
                      </TabsTrigger>
                      <TabsTrigger value="facebook" className="flex items-center">
                        <Facebook className="mr-1 h-4 w-4" />
                        Facebook
                      </TabsTrigger>
                      <TabsTrigger value="twitter" className="flex items-center">
                        <Twitter className="mr-1 h-4 w-4" />
                        Twitter
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="general">
                      <div className="relative">
                        <Textarea
                          value={mockCaptions.general}
                          readOnly
                          className="min-h-[200px]"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(mockCaptions.general)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="instagram">
                      <div className="relative">
                        <Textarea
                          value={mockCaptions.instagram}
                          readOnly
                          className="min-h-[200px]"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(mockCaptions.instagram)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="facebook">
                      <div className="relative">
                        <Textarea
                          value={mockCaptions.facebook}
                          readOnly
                          className="min-h-[200px]"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(mockCaptions.facebook)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="twitter">
                      <div className="relative">
                        <Textarea
                          value={mockCaptions.twitter}
                          readOnly
                          className="min-h-[200px]"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(mockCaptions.twitter)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center p-12 border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-center">
                  <Wand2 className="mx-auto h-12 w-12 text-gray-300" />
                  <h3 className="mt-4 text-lg font-medium text-postsync-text">
                    AI Generated Captions
                  </h3>
                  <p className="mt-2 text-postsync-muted">
                    Upload an image and click "Generate" to create platform-optimized captions
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AICaptions;
