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


// src/services/api.ts

export interface CompetitorInfoResponse {
  data: {
    user: {
      full_name: string;
      username: string;
      biography: string;
      profile_pic_url: string;
      external_url: string | null;
      follower_count: number;
      following_count: number;
      media_count: number;
      is_verified: boolean;
      // … any other fields you want to type
    };
  };
}

// hard-coded RapidAPI credentials:
const RAPIDAPI_HOST = 'instagram-scraper-ai1.p.rapidapi.com';
const RAPIDAPI_KEY  = 'd3de603ec2msh2997cef1c9f512bp1cd1a7jsn0875fb2f085f';

export async function getCompetitorInfo(
  username: string
): Promise<CompetitorInfoResponse> {
  const url = `https://${RAPIDAPI_HOST}/user/info_v2/?username=${encodeURIComponent(
    username
  )}`;

  const res = await fetch(url, {
    headers: {
      'x-rapidapi-host': RAPIDAPI_HOST,
      'x-rapidapi-key':  RAPIDAPI_KEY,
    },
  });

  if (!res.ok) {
    throw new Error(`RapidAPI error: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as CompetitorInfoResponse;
}


// src/services/api.ts
export interface CompetitorFeedItem {
  id: string;
  caption?: { text?: string };
  image_versions2?: {
    candidates?: { url?: string }[];
  };
  // …other fields you care about
}

type RawFeed = {
  data?: { items: Array<{ node: any }> };
  items?: Array<{ node: any }>;
};

export async function getCompetitorFeed(username: string): Promise<CompetitorFeedItem[]> {
  const FEED_PATH = `/user/feed_v2/?username=${encodeURIComponent(username)}`;
  const url = `https://${RAPIDAPI_HOST}${FEED_PATH}`;

  const res = await fetch(url, {
    headers: {
      'x-rapidapi-host': RAPIDAPI_HOST,
      'x-rapidapi-key': RAPIDAPI_KEY,
    },
  });
  if (!res.ok) {
    throw new Error(`RapidAPI Feed error: ${res.status}`);
  }
  const raw = (await res.json()) as RawFeed;

  // pick whichever array exists
  const wrapped: Array<{ node: any }> =
    raw.data?.items ??
    raw.items ??
    [];

  // unwrap .node so consumer just gets CompetitorFeedItem
  return wrapped.map(w => w.node);
}
