import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { schedulePost } from '@/services/posts';
import { Post } from '@/types/Post';
import CreatePostPage from '@/pages/CreatePost/index'; // Ensure CreatePostPage is a valid React component

export default function CreatePostModal({
  defaultDate,
  onClose,
  onSaved
}: {
  defaultDate?: Date;
  onClose: () => void;
  onSaved: (post: Post) => void;
}) {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data: {
    caption: string;
    imageUrl: string;
    platforms: string[];
    scheduledAt: Date;
  }) => {
    setSaving(true);
    try {
      const newPost = await schedulePost({
        ...data,
        scheduledAt: data.scheduledAt.toISOString(),
      });
      onSaved(newPost);
      onClose();
    } catch (err) {
      alert('Failed to schedule');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0">
        <CreatePostPage
          defaultDate={defaultDate}
          onSubmit={handleSubmit}   // adapt your internal form
          saving={saving}
        />
      </DialogContent>
    </Dialog>
  );
}
