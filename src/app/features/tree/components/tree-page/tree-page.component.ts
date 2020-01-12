import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { TreeStore } from '@fav/tree/services/tree.store';

@Component({
  selector: 'app-tree-page',
  templateUrl: './tree-page.component.html',
  styleUrls: ['./tree-page.component.scss'],
  providers: [TreeStore],
})
export class TreePageComponent implements OnDestroy {
  heightFormControl: FormControl = new FormControl();

  constructor(public treeStore: TreeStore) {
    this.heightFormControl.setValue(this.treeStore.height);
    this.heightFormControl.setValidators([
      Validators.required,
      Validators.pattern(/[0-9]+/),
      Validators.min(1),
    ]);

    this.heightFormControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        filter(() => this.heightFormControl.valid),
      )
      .subscribe(() => {
        this.treeStore.length = 2 ** this.heightInputValue;
      });
  }

  get heightInputValue(): number {
    return Number.parseInt(this.heightFormControl.value, 10);
  }

  ngOnDestroy(): void {
    this.treeStore.destroy();
  }

  onTreeChange(): void {
    if (this.heightFormControl.valid) {
      this.treeStore.height = this.heightInputValue;
      this.treeStore.rebuildTree();
    }
  }

  onCleanInput(): void {
    this.heightFormControl.setValue(TreeStore.defaultHeight);
    this.treeStore.resetHeight();
  }
}
