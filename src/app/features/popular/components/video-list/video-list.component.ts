import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VideoStore } from '@fav/popular/service/video.store';

/**
 * Stateless component, it's not really needed.
 * Used only for performance reason.
 */
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnInit {
  constructor(public videoStore: VideoStore,
              private cd: ChangeDetectorRef) {
    this.cd.detach();
    /**
     * Leverage overhead of constant re-rendering caused by material lib on filters change.
     * Trade off: update time increased on ~ 30ms
     */
    this.videoStore.loadingStateSubject.subscribe(() => {
      window.queueMicrotask(() => {
        this.cd.detectChanges();
      });
    });
  }

  ngOnInit() {
  }
}
