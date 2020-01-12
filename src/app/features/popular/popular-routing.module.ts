import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerPageComponent } from '@fav/popular/components/player-page/player-page.component';
import { VideoListPageComponent } from '@fav/popular/components/video-list-page/video-list-page.component';

export const routes: Routes = [
  { path: '', component: VideoListPageComponent, pathMatch: 'full', data: { shouldReuse: true } },
  { path: ':videoId', component: PlayerPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopularRoutingModule {
}
