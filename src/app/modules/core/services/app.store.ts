import { Injectable } from '@angular/core';
import * as store from 'store/dist/store.modern';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataMap, IStore, ScrollStateEnum, VideoCategory, VideoFilterModel, VideoLocatedCategory } from '@fav/shared/models';
import { YoutubeCategory, YoutubeCategoryResponse } from '@fav/youtubeApi/models';
import { YoutubeService } from '@fav/youtubeApi/services/youtube.service';

@Injectable({
  providedIn: 'root',
})
export class AppStore implements IStore {
  /**
   * In global state due to feature of wide scroll interaction (e.g. header, ticket XYZ-1111).
   * Also we have 1 infinite scroll per page by requirements, that's why we can use one state variable for all infinite scrolls.
   *
   * type {BehaviorSubject<ScrollStateEnum>} infiniteScrollSubject
   */
  infiniteScrollSubject = new BehaviorSubject<ScrollStateEnum>(ScrollStateEnum.unlocked);
  videoFilterSubject: BehaviorSubject<VideoFilterModel>;
  destroySubject = new Subject<boolean>();

  isOpenFromList = false;

  constructor(private youtubeService: YoutubeService) {
    const state = this.restore();
    this.videoFilterSubject = new BehaviorSubject<VideoFilterModel>(state.videoFilter as VideoFilterModel);
  }

  get videoFilterData(): VideoFilterModel {
    return this.videoFilterSubject.getValue();
  }

  set videoFilterData(params: VideoFilterModel) {
    this.videoFilterSubject.next(Object.assign(this.videoFilterData, params));
    this.save();
  }

  destroy(): void {
    this.destroySubject.next(true);

    Object.keys(this)
      .filter((prop: string) => this[prop] instanceof Subject)
      .forEach((prop: string) => {
        (this[prop] as Subject<any>).complete();
      });
  }

  loadVideoCategories(countryId?: string): Observable<VideoCategory[]> {
    const requestId = countryId ? countryId : this.videoFilterData.country;
    return this.youtubeService.videoCategories(requestId).pipe(
      map((response: YoutubeCategoryResponse) => {
        return response.items.map((category: YoutubeCategory) => ({
          name: category.snippet.title,
          id: category.id,
        }));
      }),
    );
  }

  loadCategoriesForNewCountry(countryId: string): Observable<VideoLocatedCategory> {
    return this.loadVideoCategories(countryId).pipe(
      map((categories: VideoCategory[]) => {
        const category = categories.find((item: VideoCategory) => {
          return item.id === this.videoFilterData.category;
        });
        if (category) {
          return { categories, selectedCategoryId: category.id };
        }

        return { categories, selectedCategoryId: '' };
      }),
    );
  }

  save(): void {
    store.set(AppStore.name, { videoFilter: this.videoFilterData });
  }

  restore(): DataMap {
    const state = store.get(AppStore.name);
    if (state) {
      return state;
    }

    return {
      videoFilter: new VideoFilterModel(),
    };
  }
}
