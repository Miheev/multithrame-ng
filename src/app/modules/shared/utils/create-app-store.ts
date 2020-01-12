import { AppStore } from '@fav/core/services/app.store';
import { DataMap, VideoFilterModel } from '@fav/shared/models';
import { YoutubeService } from '@fav/youtubeApi/services/youtube.service';

export function createAppStore(): AppStore {
  const store = new AppStore({} as YoutubeService);
  store.save = () => {};
  store.restore = () => (new VideoFilterModel() as unknown as DataMap);
  return store;
}
