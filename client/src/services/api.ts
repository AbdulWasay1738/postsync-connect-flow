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
