import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeComponent } from '@fav/tree/components/tree/tree.component';
import { NodeComponent } from '@fav/tree/components/node/node.component';
import { TreePageComponent } from '@fav/tree/components/tree-page/tree-page.component';

import { SharedModule } from '@fav/core/shared.module';
import { TreeRoutingModule } from '@fav/tree/tree-routing.module';

@NgModule({
  declarations: [
    TreeComponent,
    NodeComponent,
    TreePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,

    TreeRoutingModule,
  ],
})
export class TreeModule {
}
