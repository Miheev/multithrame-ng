import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TreePageComponent } from '@fav/tree-simple/components/tree-page/tree-page.component';

export const routes: Routes = [
  { path: '', component: TreePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreeSimpleRoutingModule {
}
