import { ChangeDetectionStrategy, Component, HostListener, OnDestroy } from '@angular/core';
import { AppStore } from '@fav/core/services/app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  constructor(private appStore: AppStore) {
  }

  @HostListener('window:unload')
  unloadHandler(): void {
    this.ngOnDestroy();
  }

  ngOnDestroy(): void {
    this.appStore.destroy();
  }
}
