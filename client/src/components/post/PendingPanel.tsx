import React, { useEffect, useState } from 'react';
import { Post } from '@/types/Post';
import { approvePost, rejectPost, fetchCalendarPosts } from '@/services/posts';
import { Button } from '@/components/ui/button';

export default function PendingPanel({
  onApproved
}: { onApproved: (p: Post) => void }) {
  const [pending, setPending] = useState<Post[]>([]);

  useEffect(() => {
    fetchCalendarPosts()
      .then(posts => setPending(posts.filter(p => p.status === 'pending')))
      .catch(console.error);
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const { data } = await approvePost(id);
      onApproved(data.post);
      setPending(prev => prev.filter(p => p._id !== id));
    } catch (e) { console.error(e); }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectPost(id);
      setPending(prev => prev.filter(p => p._id !== id));
    } catch (e) { console.error(e); }
  };

  if (pending.length === 0) return null;

  return (
    <div className="fixed right-4 bottom-4 w-96 bg-white shadow-lg rounded-lg p-4 space-y-3">
      <h3 className="font-semibold">Pending Posts</h3>
      {pending.map(p => (
        <div key={p._id} className="border p-3 rounded flex flex-col">
          <span className="text-sm">{p.caption}</span>
          <span className="text-xs text-gray-500">
            {new Date(p.scheduledAt).toLocaleString()}
          </span>
          <div className="mt-2 space-x-2">
            <Button size="sm" onClick={() => handleApprove(p._id)}>
              Approve
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleReject(p._id)}>
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
