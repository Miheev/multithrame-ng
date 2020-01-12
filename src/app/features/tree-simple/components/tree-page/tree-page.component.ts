import { Component } from '@angular/core';

@Component({
  selector: 'app-tree-page',
  templateUrl: './tree-page.component.html',
  styleUrls: ['./tree-page.component.scss'],
})
export class TreePageComponent {
  height = 12;

  constructor() {
  }

  get lengthFormatted(): string {
    return (2 ** this.height - 1).toLocaleString();
  }
}
