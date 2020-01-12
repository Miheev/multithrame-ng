import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerPageComponent } from '@fav/popular/components/player-page/player-page.component';
import { VideoComponent } from '@fav/popular/components/video/video.component';
import { VideoListPageComponent } from '@fav/popular/components/video-list-page/video-list-page.component';

import { SharedModule } from '@fav/core/shared.module';
import { PopularRoutingModule } from '@fav/popular/popular-routing.module';
import { VideoListComponent } from './components/video-list/video-list.component';

@NgModule({
  declarations: [
    VideoListPageComponent,
    VideoListComponent,
    VideoComponent,
    PlayerPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,

    PopularRoutingModule,
  ],
})

export class PopularModule {
}
