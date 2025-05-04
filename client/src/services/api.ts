import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use((config) => {
  const t = localStorage.getItem('postsync_token');
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export default api;



const API_URL = import.meta.env.VITE_API_URL as string;
// client/src/services/api.ts

export interface PostPayload {
  post: string;
  platforms: string[];   // e.g. ["facebook","linkedin","instagram"]
  mediaUrls?: string[];  // optional
}

export async function publishPost(payload: PostPayload) {
  const res = await fetch(
    `${API_URL}/post`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Publish failed: ${errText}`);
  }
  return res.json();
}


// uploadImage → sends FormData & returns the hosted URL
export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append('image', file);

  const res = await fetch(
    `${API_URL}/uploadImage`,
    {
      method: 'POST',
      body: form
    }
  );
  if (!res.ok) throw new Error('Image upload failed');
  const { url } = await res.json();
  return url as string;
}

// client/src/services/api.ts



/**
 * Sends an image file + optional prompt to your caption API.
 * Returns { captions: { general, instagram, facebook, twitter }, hashtags: string[] }
 */
// client/src/services/api.ts

const CAPTION_API = import.meta.env.VITE_CAPTION_API_URL as string;

export async function generateCaption(
  file: File,
  prompt?: string
): Promise<{
  caption: string;
  hashtags: string[];
}> {
  const form = new FormData();
  form.append('image', file);
  if (prompt) form.append('prompt', prompt);

  const res = await fetch(CAPTION_API, {
    method: 'POST',
    body: form
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `Status ${res.status}`);
  }
  return res.json();
}