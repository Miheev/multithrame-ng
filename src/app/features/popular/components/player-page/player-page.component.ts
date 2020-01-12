import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AppStore } from '@fav/core/services/app.store';
import { YoutubeService } from '@fav/youtubeApi/services/youtube.service';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss'],
})
export class PlayerPageComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  readonly classList = ['l-one-pad'];

  embedUrl: SafeResourceUrl;
  isLoading = true;

  constructor(private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private router: Router,
              private toaster: ToastrService,
              private youtubeService: YoutubeService,
              private appStore: AppStore) {
    // for prevent loading copy of app inside iframe
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('videoId');
    if (!id) {
      this.goBack();
      return;
    }

    /**
     * Video id server side check is needed only for case: opening video directly from url.
     * So this check is skipped in case of opening from video list (should have correct id from Youtube API).
     */
    let videoValidationMethod: Observable<boolean> = this.youtubeService.videoExist(id);
    if (this.appStore.isOpenFromList) {
      videoValidationMethod = of(true);
      this.appStore.isOpenFromList = false;
    }
    videoValidationMethod.subscribe((result: boolean) => {
      if (result) {
        // todo: update should be triggered in clear way
        this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(YoutubeService.embedUrl(id));
      } else {
        this.goBack();
      }
    });
  }

  ngOnDestroy(): void {
  }

  /* Hide loader on video ready */
  onLoadVideo(): void {
    this.isLoading = false;
  }

  private goBack(title: string = 'The video not found. Select another one please.') {
    this.toaster.warning('', title);
    this.router.navigate(['/popular']);
  }
}
