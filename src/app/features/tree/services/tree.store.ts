import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';

import { TreeNode } from '@fav/tree/models';
import { IStore } from '@fav/shared/models';


@Injectable()
export class TreeStore implements IStore {
  static readonly defaultHeight = 12;
  static readonly binaryTreeChildrenLength = 2;

  currentValue = 0;
  height = TreeStore.defaultHeight;
  length = 2 ** TreeStore.defaultHeight;

  colors: ThemePalette[] = ['primary', 'warn'];

  tree: TreeNode = null;
  rebuildSubject = new Subject<boolean>();
  edgeNodeCount = 0;
  edgeNodeLength = 0;

  constructor(private toaster: ToastrService) {
  }

  get lengthFormatted(): string {
    return (this.length - 1).toLocaleString();
  }

  destroy(): void {
    this.rebuildSubject.complete();
  }

  nextValue(): number {
    let current = this.currentValue;
    this.currentValue += 1;
    return current;
  }

  resetHeight(): void {
    this.height = TreeStore.defaultHeight;
    this.length = 2 ** TreeStore.defaultHeight;
  }

  rebuildTree(): void {
    this.rebuildSubject.next(true);
  }

  createRootNode(): TreeNode {
    this.currentValue = 0;
    this.tree = {
      value: this.nextValue(),
      height: 0,
      isBinarySubtree: true,
      children: [],
    };

    return this.tree;
  }

  addBinaryTreeChildren(node: TreeNode): TreeNode[] {
    let index;
    for (index = 0; index < TreeStore.binaryTreeChildrenLength; ++index) {
      node.children.push({
        value: this.nextValue(),
        height: node.height + 1,
        isBinarySubtree: true,
        children: [],
      });
    }

    return node.children;
  }

  addNodeTo(node: TreeNode): void {
    node.children.push({
      value: this.nextValue(),
      height: node.height + 1,
      isBinarySubtree: false,
      children: [],
    });
  }

  deleteChildren(node: TreeNode): TreeNode[] {
    node.children = [];
    return node.children;
  }

  timeStart(): void {
    this.edgeNodeLength = this.length / 2;
    this.edgeNodeCount = 0;
    console.time('TreeBuilding');
  }
  timeEnd(): void {
    this.edgeNodeCount += 1;
    if (this.edgeNodeCount === this.edgeNodeLength) {
      console.timeEnd('TreeBuilding');
      console.log(performance);

      setTimeout(() => {
        this.toaster.success('Done!', 'See console for performance details');
      });
    }
  }
}
