import { YoutubeVideo } from './youtube-video';
import { YoutubeCategory } from './youtube-category';

export interface YoutubeListResponse<T> {
  kind?: string;
  etag?: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: T[];
}

export type YoutubeVideoResponse = YoutubeListResponse<YoutubeVideo>;

export type YoutubeCategoryResponse = YoutubeListResponse<YoutubeCategory>;
