import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import { TreeComponent } from '@fav/tree-simple/components/tree/tree.component';
import { TreeNode } from '@fav/tree-simple/models';


const colors: ThemePalette[] = ['primary', 'warn'];

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() node: TreeNode = {} as TreeNode;

  children: TreeNode[] = [];
  colorIndex = 1;
  color: ThemePalette = 'primary';

  constructor(private cd: ChangeDetectorRef) {
    // DELETE line below for observe performance difference
    cd.detach();
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
    TreeComponent.measure.edgeNodeCount += 1;
    if (TreeComponent.measure.edgeNodeCount === TreeComponent.measure.edgeNodeLength) {
      console.timeEnd('TreeBuilding');
      console.log(performance);
    } else if (!this.node.isBinarySubtree) {
      console.timeEnd('TreeNode Add');
    }
  }

  onAddChild(): void {
    console.time('TreeNode Add');
    this.children.push({
      value: this.node.value + 11,
      height: this.node.height + 1,
      maxHeight: this.node.maxHeight,
      isBinarySubtree: false,
    });

    this.detectChanges();
  }

  onDeleteChildren(): void {
    // unsafe operation, only for set up flag used in delete time measurement
    this.children[this.children.length - 1].isBinarySubtree = undefined;
    console.time('TreeNode Delete');

    this.children = [];
    this.detectChanges();
  }

  private initChildren(): void {
    if (!this.node.isBinarySubtree || this.node.height + 1 >= this.node.maxHeight) {
      return;
    }
    let index;
    for (index = 0; index < 2; ++index) {
      this.children.push({
        value: this.node.value + 1,
        height: this.node.height + 1,
        maxHeight: this.node.maxHeight,
        isBinarySubtree: true,
      });
    }
  }

  private changeColorDelayed(): void {
    setTimeout(() => {
      this.color = colors[this.colorIndex];
      this.colorIndex = Number(!Boolean(this.colorIndex));
    });
  }

  private detectChanges(): void {
    this.changeColorDelayed();
    // DELETE line below for observe performance difference
    this.cd.detectChanges();
  }
}
