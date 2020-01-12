import { AppConfig } from '@fav/shared/app.config';

export class VideoFilterModel {
  videosPerPage = AppConfig.defaultVideosPerPage;
  country = AppConfig.defaultRegion;
  category = AppConfig.defaultCategoryId;
}
