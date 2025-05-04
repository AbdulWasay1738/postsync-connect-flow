export interface Post {
    _id: string;
    caption: string;
    imageUrl: string;
    platforms: string[];
    scheduledAt: string;             // ISO
    status: 'pending' | 'approved' | 'rejected' | 'posted' | 'failed';
    createdBy?: {
      _id: string;
      name: string;
    };
  }
  