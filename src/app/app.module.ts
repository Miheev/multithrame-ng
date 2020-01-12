import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@fav/core/shared.module';
import { ComponentRouteReuseStrategy } from '@fav/core/services/component-route-reuse.strategy';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useExisting: ComponentRouteReuseStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
