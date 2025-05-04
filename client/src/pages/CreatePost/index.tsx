// client/src/pages/CreatePost/CreatePostPage.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Calendar as CalendarIcon,
  Clock,
  Image as ImageIcon,
  Link,
  Plus,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ← IMPORT your helpers
import { publishPost, PostPayload, uploadImage } from '@/services/api';

const CreatePostPage = () => {
  const [postContent, setPostContent] = useState('');
  
  // ← store the File, not just its name
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [platforms, setPlatforms] = useState({
    instagram: true,
    facebook: true,
    twitter: false,
    linkedin: false,
    youtube: false,
  });

  // loading / feedback
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ← keep the actual File and a URL-preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // 1️⃣ If user selected a file, upload it first
      let mediaUrls: string[] = [];
      if (selectedImage) {
        const publicUrl = await uploadImage(selectedImage);
        mediaUrls = [publicUrl];
      }

      // 2️⃣ Build platforms array
      const selectedPlatforms = Object.entries(platforms)
        .filter(([, on]) => on)
        .map(([name]) => name);

      // 3️⃣ Create payload and publish
      const payload: PostPayload = {
        post: postContent,
        platforms: selectedPlatforms,
        mediaUrls,
      };

      const result = await publishPost(payload);
      console.log('Ayrshare response:', result);
      setSuccess('Posted successfully!');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8 space-y-6">
      {/* … all your existing header, content and media‐upload UI … */}

      {/* MEDIA UPLOAD CARD */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Content</CardTitle>
          <CardDescription>Write your post and add media</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="min-h-[200px]"
          />

          <div className="mt-4 border rounded-md p-4">
            {previewImage ? (
              <div className="relative group">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-auto rounded-md object-cover"
                  style={{ maxHeight: '300px' }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setSelectedImage(null);
                      setPreviewImage(null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Drag & drop or click to browse
                </p>
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  className="hidden"
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
        </CardContent>
      </Card>

      {/* … your platform‐tabs & settings … */}

      {/* PUBLISH SETTINGS */}
      <Card className="shadow-md">
        {/* … existing header + selection controls … */}
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-postsync-primary hover:bg-postsync-secondary"
          >
            {loading ? 'Posting…' : 'Post Now'}
          </Button>
          {error   && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
        </CardFooter>
      </Card>
    </form>
  );
};

export default CreatePostPage;
