import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import { TreeNode } from '@fav/tree/models';
import { TreeStore } from '@fav/tree/services/tree.store';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() node: TreeNode = {
    children: [],
  } as TreeNode;

  colorIndex = 1;
  color: ThemePalette = 'primary';

  constructor(private cd: ChangeDetectorRef,
              private treeStore: TreeStore) {
    // DELETE line below for observe performance difference
    cd.detach();
  }

  get children(): TreeNode[] {
    return this.node.children;
  }

  get noChildren(): boolean {
    return !this.node.isBinarySubtree || this.node.height + 1 >= this.treeStore.height;
  }

  ngOnInit(): void {
    this.initChildren();
    this.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.node.isBinarySubtree === undefined) {
      console.timeEnd('TreeNode Delete');
    }
  }

  ngAfterViewInit(): void {
    if (!this.node.isBinarySubtree) {
      console.timeEnd('TreeNode Add');
      this.treeStore.timeEnd();
    } else if (this.node.height + 1 >= this.treeStore.height) {
      this.treeStore.timeEnd();
    }
  }

  onAddChild(): void {
    console.time('TreeNode Add');
    this.treeStore.addNodeTo(this.node);
    this.detectChanges();
  }

  onDeleteChildren(): void {
    // unsafe operation, only for set up flag used in delete time measurement
    this.children[this.children.length - 1].isBinarySubtree = undefined;
    console.time('TreeNode Delete');

    this.treeStore.deleteChildren(this.node);
    this.detectChanges();
  }

  private initChildren(): void {
    if (this.noChildren) {
      return;
    }
    this.treeStore.addBinaryTreeChildren(this.node);
  }

  private changeColorDelayed(): void {
    setTimeout(() => {
      this.color = this.treeStore.colors[this.colorIndex];
      this.colorIndex = Number(!Boolean(this.colorIndex));
    });
  }

  private detectChanges(): void {
    this.changeColorDelayed();
    // DELETE line below for observe performance difference
    this.cd.detectChanges();
  }
}
