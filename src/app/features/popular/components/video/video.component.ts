import { Component, Input, NgZone } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';

import { AppStore } from '@fav/core/services/app.store';
import { isUrlHashUsed } from '@fav/shared/utils/url-hash-handling';
import { VideoModel } from '@fav/popular/models';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent {
  @Input() video: VideoModel;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private zone: NgZone,
              private appStore: AppStore) {
  }

  onVideoOpen(event: MouseEvent): void {
    if (!event.ctrlKey) {
      this.appStore.isOpenFromList = true;

      this.zone.run(() => {
        this.router.navigate([this.video.id], { relativeTo: this.route });
      });
      return;
    }

    const urlTree: UrlTree = this.router.createUrlTree([this.video.id], { relativeTo: this.route });
    let url = this.router.serializeUrl(urlTree);
    if (isUrlHashUsed()) {
      url = '/#/' + url;
    }

    window.open(url, '_blank');
  }
}
