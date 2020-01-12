import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChannelListPageComponent } from '@fav/channel/components/channel-list-page/channel-list-page.component';

export const routes: Routes = [
  { path: '', component: ChannelListPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChannelRoutingModule {
}
