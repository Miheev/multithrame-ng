import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { AppConfig } from '@fav/shared/app.config';
import { AppStore } from '@fav/core/services/app.store';
import { IStore, RequestStateEnum, ScrollStateEnum } from '@fav/shared/models';
import { VideoConvertedResponse, VideoModel } from '@fav/popular/models';
import { YoutubeVideo, YoutubeVideoRequest, YoutubeVideoResponse } from '@fav/youtubeApi/models';
import { YoutubeService } from '@fav/youtubeApi/services/youtube.service';

@Injectable()
export class VideoStore implements IStore {
  loadingStateSubject = new BehaviorSubject<RequestStateEnum>(RequestStateEnum.empty);
  videos: VideoModel[] = [];

  private nextPageToken: string;
  private remainingCount = -1;

  constructor(private youtubeService: YoutubeService,
              private appStore: AppStore) {
    this.updateNextParams = this.updateNextParams.bind(this);
  }

  get videosPerPage(): number {
    return this.appStore.videoFilterData.videosPerPage;
  }

  get loadingState(): RequestStateEnum {
    return this.loadingStateSubject.getValue();
  }
  set loadingState(value: RequestStateEnum) {
    this.loadingStateSubject.next(value);
  }

  get remainingVideos(): number {
    return this.remainingCount;
  }

  destroy(): void {
    this.loadingState = RequestStateEnum.empty;
    this.videos = [];
    this.remainingCount = -1;
    this.nextPageToken = '';

    this.loadingStateSubject.complete();
  }

  loadVideos(isNextPage: boolean = false): void {
    this.loadingState = RequestStateEnum.loading;
    this.getVideosRange(isNextPage)
      .subscribe((videos: VideoModel[]) => {
        if (!isNextPage && !videos.length || isNextPage && !this.videos.length && !videos.length) {
          this.loadingState = RequestStateEnum.empty;
        } else {
          this.loadingState = RequestStateEnum.success;
        }
        if (isNextPage) {
          this.videos = [...this.videos, ...videos];
          this.appStore.infiniteScrollSubject.next(ScrollStateEnum.scrollSave);
          this.appStore.infiniteScrollSubject.next(ScrollStateEnum.unlocked);
        } else {
          this.videos = videos;
        }
      }, (error: HttpErrorResponse) => {
        this.loadingState = RequestStateEnum.error;
        console.error(error);
      });
  }

  getVideosRange(isNextPage: boolean): Observable<VideoModel[]> {
    const params: YoutubeVideoRequest = {
      part: AppConfig.commonParts,
      chart: AppConfig.chart,
      regionCode: this.appStore.videoFilterData.country,
      maxResults: this.videosPerPage,
      key: AppConfig.youtubeApiKey,
    };

    if (this.appStore.videoFilterData.category) {
      params.videoCategoryId = this.appStore.videoFilterData.category;
    }

    if (isNextPage && !this.nextPageToken) {
      return of([]);
    } else if (isNextPage) {
      params.pageToken = this.nextPageToken;
    } else {
      this.nextPageToken = '';
      this.remainingCount = -1;
    }

    if (this.videosPerPage < AppConfig.maxVideosToLoad) {
      return this.requestVideos(params)
        .pipe(
          tap(this.updateNextParams),
          map((convertedResponse: VideoConvertedResponse) => convertedResponse.videos),
        );
    }

    const requestCount = Math.ceil(this.videosPerPage / AppConfig.maxVideosToLoad);
    let videoList: VideoModel[] = [];

    params.maxResults = AppConfig.maxVideosToLoad;
    let requestFlow = this.requestVideos(params);

    let i;
    for (i = 2; i < requestCount; i += 1) {
      requestFlow = requestFlow.pipe(mergeMap((results: VideoConvertedResponse) => {
        videoList = videoList.concat(results.videos);
        return this.partialRequest(params, results.response);
      }));
    }

    return requestFlow.pipe(
      mergeMap((results: VideoConvertedResponse) => {
        videoList = videoList.concat(results.videos);
        const lastItemCount = this.videosPerPage - (requestCount - 1) * AppConfig.maxVideosToLoad;
        return this.partialRequest(params, results.response, lastItemCount);
      }),
      tap(this.updateNextParams),
      map((results: VideoConvertedResponse) => {
        videoList = videoList.concat(results.videos);
        return videoList;
      }),
    );
  }

  private partialRequest(rawParams: YoutubeVideoRequest, results: YoutubeVideoResponse,
                         itemPerPage: number = AppConfig.maxVideosToLoad):
    Observable<VideoConvertedResponse> {

    const params: YoutubeVideoRequest = Object.assign({}, rawParams);
    params.maxResults = itemPerPage;
    params.pageToken = results.nextPageToken;

    if (!params.pageToken) {
      return of({
        response: {} as YoutubeVideoResponse,
        videos: [],
      });
    }

    return this.requestVideos(params);
  }

  private requestVideos(params: YoutubeVideoRequest): Observable<VideoConvertedResponse> {
    return this.youtubeService.requestVideos(params)
      .pipe(
        map((data: YoutubeVideoResponse) => {
          return {
            response: data,
            videos: data.items
              .map((item: YoutubeVideo) => new VideoModel(item))
              .filter((item: VideoModel) => item.id !== ''),
          };
        }),
      );
  }

  private updateNextParams(data: VideoConvertedResponse): void {
    const raw = data.response;
    this.nextPageToken = raw.nextPageToken;

    if (this.remainingCount === -1) {
      this.remainingCount = raw.pageInfo.totalResults - raw.items.length;
    } else if (this.remainingCount > 0) {
      this.remainingCount = this.videosPerPage < this.remainingCount ? this.remainingCount - this.videosPerPage : 0;
    }
  }
}
