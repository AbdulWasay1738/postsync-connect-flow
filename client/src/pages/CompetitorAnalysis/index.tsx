import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';
import { AtSign, Users, User, Link as LinkIcon } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import {
  getCompetitorInfo,
  CompetitorInfoResponse,
  getCompetitorFeed,
  CompetitorFeedItem,
} from '@/services/api';

const CompetitorAnalysis: React.FC = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState<CompetitorInfoResponse['data'] | null>(null);
  const [posts, setPosts] = useState<CompetitorFeedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setProfile(null);
    setPosts([]);

    try {
      // 1) fetch profile
      const info = await getCompetitorInfo(username.trim());
      setProfile(info.data);

      // 2) fetch feed (now unwrapped .node)
      const feedItems = await getCompetitorFeed(username.trim());
      setPosts(feedItems.slice(0, 6));
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* Header */}
      <div className="py-6">
        <h1 className="text-2xl font-bold">Competitor Analysis</h1>
        <p className="text-muted-foreground">
          Enter an Instagram username to pull public profile insights
        </p>
      </div>

      {/* Search Bar */}
      <Card className="mb-6">
        <CardContent className="flex items-center space-x-3">
          <AtSign className="text-xl text-muted-foreground" />
          <Input
            placeholder="e.g. adambobrow"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleAnalyze}
            disabled={!username.trim() || loading}
          >
            {loading
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : 'Analyze'}
          </Button>
        </CardContent>
      </Card>

      {/* Error */}
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}

      {/* Profile Card */}
      {profile && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users /> <span>{profile.user.full_name || profile.user.username}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left */}
            <div className="space-y-4 text-center md:text-left">
  {/*
    build a proxied URL for the profile pic
  */}
  {(() => {
    const direct = profile.user.profile_pic_url;
    const proxied = `https://images.weserv.nl/?url=${encodeURIComponent(
      direct.replace(/^https?:\/\//, '')
    )}`;
    return (
      <img
        src={proxied}
        alt="Profile"
        className="rounded-full w-32 h-32 mx-auto md:mx-0"
      />
    );
  })()}

  <div className="flex items-center justify-center md:justify-start space-x-2">
    <User /> <span>@{profile.user.username}</span>
  </div>

  {profile.user.is_verified && (
    <div className="text-blue-500 font-medium">Verified account</div>
  )}

  <div>
    <p className="font-medium">Biography</p>
    <p>{profile.user.biography || '—'}</p>
  </div>

  {profile.user.external_url && (
    <div className="flex items-center justify-center md:justify-start space-x-2">
      <LinkIcon />
      <a
        href={profile.user.external_url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-primary"
      >
        {profile.user.external_url}
      </a>
    </div>
  )}
</div>

            {/* Right */}
            <div className="space-y-4 text-center md:text-left">
              <div>
                <p className="font-medium">Followers</p>
                <p>{profile.user.follower_count.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-medium">Following</p>
                <p>{profile.user.following_count.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-medium">Posts</p>
                <p>{profile.user.media_count.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Latest Posts Grid */}
      {posts.length > 0 && (
  <div>
    <h2 className="text-xl font-semibold mb-4">Latest Posts</h2>
    {/*
      auto-rows-fr makes each row the same size as a fraction of the available space,
      so combined with w-full each cell is square
    */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 auto-rows-fr">
      {posts.map(post => {
        const key = post.id;
        const direct = post.image_versions2?.candidates?.[0]?.url;
        if (!direct) return null;
        const proxied = `https://images.weserv.nl/?url=${encodeURIComponent(
          direct.replace(/^https?:\/\//, '')
        )}`;
        const captionText = post.caption?.text?.slice(0, 50) ?? 'Post image';

        return (
          <img
            key={key}
            src={proxied}
            alt={captionText}
            className="w-full h-full object-cover rounded-md"
          />
        );
      })}
    </div>
  </div>
)}


    </Container>
  );
};

export default CompetitorAnalysis;
