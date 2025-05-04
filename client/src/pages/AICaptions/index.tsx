// client/src/pages/AICaptions/index.tsx
import React, { useState, ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Wand2, Copy } from 'lucide-react';
import Container from '@/components/ui/Container';
import { generateCaption } from '@/services/api';

const AICaptions = () => {
  const [searchParams] = useSearchParams();
  const preloaded = searchParams.get('image') || '';

  const [file, setFile]           = useState<File | null>(null);
  const [previewUrl, setPreview]  = useState(preloaded);
  const [prompt, setPrompt]       = useState('');
  const [isLoading, setLoading]   = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [caption, setCaption]     = useState<string>('');
  const [hashtags, setHashtags]   = useState<string[]>([]);
  const [pickedTags, setPicked]   = useState<string[]>([]);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) {
      setPreview(URL.createObjectURL(f));
      setCaption('');
      setHashtags([]);
      setPicked([]);
      setError(null);
    }
  };

  const onGenerate = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const { caption, hashtags } = await generateCaption(file, prompt);
      setCaption(caption);
      setHashtags(hashtags);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTag = (tag: string) =>
    setPicked(p => p.includes(tag) ? p.filter(x=>x!==tag) : [...p, tag]);

  const copyText = (txt: string) => navigator.clipboard.writeText(txt);

  const sendToCreate = () => {
    const extra = pickedTags.length ? '\n\n' + pickedTags.join(' ') : '';
    const final = caption.includes('#') ? caption : caption + extra;
    const params = new URLSearchParams({ caption: final, image: previewUrl });
    window.location.href = `/create?${params}`;
  };

  return (
    <div className="min-h-screen pb-12">
      <Container>
        <h1 className="text-3xl font-bold mb-2">AI Caption Generator</h1>
        <p className="text-postsync-muted mb-8">
          Create engaging captions and hashtags with AI
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload & controls */}
          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-6">
                <div>
                  <Label>Upload Image</Label>
                  {previewUrl ? (
                    <div className="relative border rounded-md overflow-hidden">
                      <img src={previewUrl} className="w-full" alt="preview" />
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={() => { setFile(null); setPreview(''); setCaption(''); }}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed rounded-md p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-postsync-muted mb-4">
                        Upload an image
                      </p>
                      <input
                        id="file"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onFileChange}
                      />
                      <Button asChild variant="outline">
                        <label htmlFor="file">Select Image</label>
                      </Button>
                    </div>
                  )}
                </div>

                <div>
                  <Label>Custom Prompt (optional)</Label>
                  <Textarea
                    rows={4}
                    placeholder="e.g. 'Witty travel caption'"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                  />
                </div>

                <Button
                  onClick={onGenerate}
                  disabled={!file || isLoading}
                  className="w-full bg-postsync-primary"
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  {isLoading ? 'Generating…' : 'Generate Captions & Hashtags'}
                </Button>
                {error && (
  <p className="mt-2 text-sm text-red-600">
    {error}
  </p>
)}

              </CardContent>
            </Card>

            {/* Hashtags */}
            {caption && hashtags.length > 0 && (
              <Card>
                <CardContent>
                  <Label>Suggested Hashtags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {hashtags.map(tag => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full cursor-pointer ${
                          pickedTags.includes(tag)
                            ? 'bg-postsync-primary text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button onClick={sendToCreate} className="mt-4 w-full">
                    Send to Create Post
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Caption display */}
          <div className="lg:col-span-2">
            {caption ? (
              <Card>
                <CardContent>
                  <Textarea
                    value={caption}
                    readOnly
                    className="min-h-[200px]"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-2"
                    onClick={() => copyText(caption)}
                  >
                    <Copy />
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center p-12 border-2 border-dashed rounded-lg">
                <Wand2 className="h-12 w-12 text-gray-300" />
                <p className="mt-4 text-postsync-muted text-center">
                  Upload an image and click “Generate” to see your AI caption
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AICaptions;
