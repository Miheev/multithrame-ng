import { VideoModel } from './video.model';
import { YoutubeVideoResponse } from '@fav/youtubeApi/models';

export interface VideoConvertedResponse {
  videos: VideoModel[];
  response: YoutubeVideoResponse;
}
