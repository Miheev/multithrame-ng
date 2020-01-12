import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from '@fav/tree-simple/models';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  // todo: remove later, it's for performance measure only
  static measure = {
    edgeNodeCount: 0,
    edgeNodeLength: 0,
  };

  @Input() height = 1;

  treeList: TreeNode[] = [];
  length = 0;

  constructor() {
  }

  ngOnInit(): void {
    if (this.height < 1) {
      this.height = 1;
      console.error('height should be positive integer');
    }

    this.timeStart();
    this.treeList.push({
      value: 0,
      height: 0,
      maxHeight: this.height,
      isBinarySubtree: true,
    });
  }

  private timeStart(): void {
    this.length = 2 ** this.height;
    TreeComponent.measure.edgeNodeCount = 0;
    TreeComponent.measure.edgeNodeLength = this.length / 2;
    console.time('TreeBuilding');
  }
}
