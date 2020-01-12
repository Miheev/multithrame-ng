import { VideoCategory } from './video-category';

export interface VideoLocatedCategory {
  categories: VideoCategory[];
  selectedCategoryId: string;
}
