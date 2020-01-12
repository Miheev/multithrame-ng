import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeComponent } from '@fav/tree-simple/components/tree/tree.component';
import { NodeComponent } from '@fav/tree-simple/components/node/node.component';
import { TreePageComponent } from '@fav/tree-simple/components/tree-page/tree-page.component';

import { SharedModule } from '@fav/core/shared.module';
import { TreeSimpleRoutingModule } from '@fav/tree-simple/tree-simple-routing.module';

@NgModule({
  declarations: [
    TreeComponent,
    NodeComponent,
    TreePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,

    TreeSimpleRoutingModule,
  ],
})
export class TreeSimpleModule {
}
