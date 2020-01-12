import { Component, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-channel-list-page',
  templateUrl: './channel-list-page.component.html',
  styleUrls: ['./channel-list-page.component.scss'],
})
export class ChannelListPageComponent implements AfterContentChecked{
  constructor() {
    console.time('ChannelListPageComponent');
  }

  private updCounter = 0;
  ngAfterContentChecked() {
    if (++this.updCounter === 2) {
      console.timeEnd('ChannelListPageComponent');
    }
  }
}
