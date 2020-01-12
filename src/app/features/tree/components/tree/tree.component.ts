import { Component, OnInit } from '@angular/core';

import { TreeNode } from '@fav/tree/models';
import { TreeStore } from '@fav/tree/services/tree.store';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  treeList: TreeNode[] = [];

  constructor(private treeStore: TreeStore) {
    this.treeStore.rebuildSubject.subscribe(() => {
      this.newList();
    });

    this.newList();
  }

  ngOnInit(): void {
  }

  private newList(): void {
    this.treeStore.timeStart();
    this.treeList = [ this.treeStore.createRootNode() ];
  }
}
