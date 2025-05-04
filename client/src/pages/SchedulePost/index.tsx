// client/src/pages/SchedulePost/index.tsx
import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';
import { Image as ImageIcon, Calendar, Clock } from 'lucide-react';
import { uploadImage, schedulePost } from '@/services/api'; // adjust import

export default function SchedulePost() {
  const [caption, setCaption] = useState('');
  const [scheduledAt, setScheduledAt] = useState(''); // iso string from datetime-local
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; msg: string } | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedImage(file);
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  };

  const handleSubmit = async () => {
    setFeedback(null);
    setLoading(true);

    try {
      // 1️⃣ upload image if any
      let imageUrl: string | undefined;
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      // 2️⃣ build payload
      const payload = {
        caption,
        imageUrl,
        platforms: ['instagram'],      // expand later
        scheduledAt: dayjs(scheduledAt).toISOString()
      };

      // 3️⃣ call backend
      await schedulePost(payload);
      setFeedback({ type: 'success', msg: 'Post scheduled successfully!' });
      // reset form
      setCaption('');
      setScheduledAt('');
      setSelectedImage(null);
      setPreview(null);
    } catch (err: any) {
      console.error(err);
      setFeedback({ type: 'error', msg: err.message || 'Failed to schedule' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="pt-12">
      <h1 className="text-2xl font-bold mb-4">Schedule a Post</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Caption & Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium mb-1">Caption</p>
            <Textarea
              placeholder="Write your caption..."
              value={caption}
              onChange={e => setCaption(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div>
            <p className="font-medium mb-1">Image</p>
            {preview ? (
              <div className="relative group">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-auto rounded-md object-cover"
                  style={{ maxHeight: 240 }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => { setSelectedImage(null); setPreview(null); }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center border-dashed border-2 border-muted p-6 rounded-md">
                <ImageIcon className="mx-auto h-6 w-6 text-muted" />
                <p className="mt-2 text-sm text-muted">Click to upload</p>
                <input
                  id="sched-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Button asChild variant="ghost" className="mt-2">
                  <label htmlFor="sched-image" className="cursor-pointer">
                    Browse Image
                  </label>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>When to Post</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-4">
          <div className="flex-1">
            <p className="font-medium mb-1 flex items-center">
              <Calendar className="mr-2" /> Date & Time
            </p>
            <Input
              type="datetime-local"
              value={scheduledAt}
              onChange={e => setScheduledAt(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={loading || !caption || !scheduledAt}
            className="w-full"
          >
            {loading ? 'Scheduling…' : 'Schedule Post'}
          </Button>
        </CardFooter>
      </Card>

      {feedback && (
        <p
          className={`mt-4 text-sm ${
            feedback.type === 'error' ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {feedback.msg}
        </p>
      )}
    </Container>
  );
}
