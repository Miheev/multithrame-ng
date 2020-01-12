import { NgModule } from '@angular/core';
import { MaterialModule } from '@fav/core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { YoutubeApiModule } from '@fav/youtubeApi/youtube-api.module';
import { HeaderComponent } from '@fav/core/components/header/header.component';
import { SlideFiltersComponent } from '@fav/core/components/slide-filters/slide-filters.component';
import { InfiniteScrollDirective } from '@fav/core/directives/infinite-scroll.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    SlideFiltersComponent,
    InfiniteScrollDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    YoutubeApiModule,

    HeaderComponent,
    SlideFiltersComponent,
    InfiniteScrollDirective,
  ],
})
export class SharedModule {
}
