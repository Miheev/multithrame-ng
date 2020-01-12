import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AppConfig } from '@fav/shared/app.config';
import { AppHttpError, AppHttpParams } from '@fav/shared/models';
import {
  YoutubeCategoryRequest,
  YoutubeCategoryResponse,
  YoutubeVideoRequest,
  YoutubeVideoResponse,
} from '@fav/youtubeApi/models';
// import * as videoStub from './video.response.json';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  static apiUrl(url: string) {
    return `https://www.googleapis.com/youtube/v3/${url}`;
  }

  static embedUrl(id: string) {
    return `https://www.youtube.com/embed/${id}??autoplay=1`;
  }

  constructor(private http: HttpClient,
              private toaster: ToastrService) {
  }

  videoExist(id: string): Observable<boolean> {
    const params: YoutubeVideoRequest = {
      part: AppConfig.baseParts,
      id,
      key: AppConfig.youtubeApiKey,
    };

    return this.httpVideos(params).pipe(
      map((data: YoutubeVideoResponse) => Boolean(data.items && data.items.length)),
      catchError(this.handleError('videoExist')),
    );
  }

  requestVideos(params: YoutubeVideoRequest): Observable<YoutubeVideoResponse> {
    return this.httpVideos(params).pipe(
      catchError(this.handleError('requestVideos')),
    );
  }

  videoCategories(countryId: string = 'US'): Observable<YoutubeCategoryResponse> {
    const params: YoutubeCategoryRequest = {
      part: AppConfig.baseParts,
      key: AppConfig.youtubeApiKey,
      regionCode: countryId,
    };

    return this.http.get<YoutubeCategoryResponse>(YoutubeService.apiUrl('videoCategories'),
      { params: params as unknown as AppHttpParams }).pipe(
      catchError(this.handleError('videoCategories')),
    );
  }

  private httpVideos(params: YoutubeVideoRequest): Observable<YoutubeVideoResponse> {
    return this.http.get<YoutubeVideoResponse>(YoutubeService.apiUrl('videos'), { params: params as unknown as AppHttpParams });
    // @ts-ignore
    // return of(videoStub.default).pipe(delay(300));
  }

  private handleError(operation: string) {
    return (error: AppHttpError) => {
      error.operation = operation;
      this.toaster.warning('', 'Requested data could not be loaded, please try again later or contact our support.');
      return throwError(error);
    };
  }
}
