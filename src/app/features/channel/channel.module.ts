import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelListPageComponent } from './components/channel-list-page/channel-list-page.component';

import { SharedModule } from '@fav/core/shared.module';
import { ChannelRoutingModule } from '@fav/channel/channel-routing.module';

@NgModule({
  declarations: [ChannelListPageComponent],
  imports: [
    CommonModule,
    SharedModule,

    ChannelRoutingModule,
  ],
})
export class ChannelModule {
}
