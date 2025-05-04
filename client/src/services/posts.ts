import api from './api';
import { Post } from '@/types/Post';

// list for calendar (approved + pending)
export const fetchCalendarPosts = () =>
  api.get<Post[]>('/posts').then(r => r.data);

// schedule new
export const schedulePost = (body: {
  caption: string;
  imageUrl: string;
  platforms: string[];
  scheduledAt: string;
}) => api.post<Post>('/posts', body).then(r => r.data);

// admin only
export const approvePost   = (id: string) => api.patch(`/posts/${id}/approve`);
export const rejectPost    = (id: string) => api.patch(`/posts/${id}/reject`);
