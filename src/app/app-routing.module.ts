import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'youtube', pathMatch: 'full' },
  { path: 'popular', loadChildren: () => import('@fav/popular/popular.module').then((module) => module.PopularModule) },
  { path: 'channel', loadChildren: () => import('@fav/channel/channel.module').then((module) => module.ChannelModule) },
  { path: 'tree', loadChildren: () => import('@fav/tree/tree.module').then((module) => module.TreeModule) },
  { path: 'tree-simple', loadChildren: () => import('@fav/tree-simple/tree-simple.module').then((module) => module.TreeSimpleModule) },
  { path: '**', redirectTo: 'popular' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: Boolean(history.pushState) === false,
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
