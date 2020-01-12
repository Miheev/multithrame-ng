import { Component, OnDestroy, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, skip, tap } from 'rxjs/operators';

import { AppStore } from '@fav/core/services/app.store';
import { ReusableComponentAbstract, ScrollStateEnum } from '@fav/shared/models';
import { VideoStore } from '@fav/popular/service/video.store';

@Component({
  selector: 'app-video-list-page',
  templateUrl: './video-list-page.component.html',
  styleUrls: ['./video-list-page.component.scss'],
  providers: [VideoStore],
})
export class VideoListPageComponent extends ReusableComponentAbstract implements OnInit, OnDestroy, DoCheck {
  private subscriptions = new Subscription();

  private checkCounter = 0;
  private isUpdating = false;

  constructor(router: Router,
              route: ActivatedRoute,
              public videoStore: VideoStore,
              private appStore: AppStore) {
    super(router, route);
    console.time('VideoListPageComponent');
  }

  ngOnInit(): void {
    this.isComponentActive.pipe(
      skip(1),
      filter((value: boolean) => !value),
    ).subscribe(() => {
      this.appStore.infiniteScrollSubject.next(ScrollStateEnum.scrollSave);
    });

    let filterUpdateCounter = 0;
    const sub1 = this.appStore.videoFilterSubject.subscribe(() => {
      this.isUpdating = true;
      if (filterUpdateCounter++ > 0) {
        console.time('VideoListPageComponent');
        this.checkCounter = 5;
      }
      this.videoStore.loadVideos();
      this.appStore.infiniteScrollSubject.next(ScrollStateEnum.resetScroll);
    });

    const sub2 = this.appStore.infiniteScrollSubject.pipe(
      filter((value: ScrollStateEnum) => value === ScrollStateEnum.locked && this.isActive),
      tap(() => {
        // case for < 0 not included due to default scroll event behavior (triggered after DOM loaded automatically)
        if (this.videoStore.remainingVideos === 0) {
          this.appStore.infiniteScrollSubject.next(ScrollStateEnum.unlocked);
        }
      }),
      filter(() => this.videoStore.remainingVideos > 0)
    )
    .subscribe(() => {
      this.isUpdating = true;
      console.time('VideoListPageComponent');
      this.checkCounter = 5;

      this.videoStore.loadVideos(true);
    });

    // not really sure that necessary
    const sub3 = this.appStore.destroySubject.subscribe(() => {
      this.ngOnDestroy();
    });

    this.subscriptions.add(sub1);
    this.subscriptions.add(sub2);
    this.subscriptions.add(sub3);
  }

  ngDoCheck(): void {
    if (this.checkCounter === 4 || this.isUpdating && this.checkCounter === 6) {
      window.queueMicrotask(() => {
        console.timeEnd('VideoListPageComponent');
        this.isUpdating = false;
      });
    }
    ++this.checkCounter;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscriptions.unsubscribe();
    this.videoStore.destroy();
  }

  reuseAfterInit(): void {
    console.timeEnd('VideoListPageComponent component reuse');
    this.appStore.infiniteScrollSubject.next(ScrollStateEnum.scrollBack);
  }
}
