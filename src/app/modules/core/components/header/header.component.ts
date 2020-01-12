import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @HostBinding('class') readonly classList = ['l-one-pad'];
  @Input() showVideoFilter = false;
  @Output() filterToggle = new EventEmitter<boolean>();

  constructor() {
  }

  onFilterOpen(): void {
    this.filterToggle.emit(true);
  }
}
