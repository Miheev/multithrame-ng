import { YoutubeVideoThumbnail } from './youtube-video-thumbnail';

export interface YoutubeVideo {
  kind?: string;
  etag?: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: { [key: string]: YoutubeVideoThumbnail }; // 'medium' | 'high' | 'standard' | 'maxres'
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
      title: string;
      description: string;
    };
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}
