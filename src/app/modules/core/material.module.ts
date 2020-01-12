import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  exports: [
    A11yModule,
    // CdkStepperModule,
    // CdkTableModule,
    // CdkTreeModule,
    // DragDropModule,
    MatAutocompleteModule,
    // MatBadgeModule,
    // MatBottomSheetModule,
    MatButtonModule,
    // MatButtonToggleModule,
    MatCardModule,
    // MatCheckboxModule,
    // MatChipsModule,
    // MatStepperModule,
    // MatDatepickerModule,
    // MatDialogModule,
    // MatDividerModule,
    // MatExpansionModule,
    // MatGridListModule,
    MatIconModule,
    MatInputModule,
    // MatListModule,
    MatMenuModule,
    // MatNativeDateModule,
    // MatPaginatorModule,
    MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatTableModule,
    // MatTabsModule,
    // MatToolbarModule,
    MatTooltipModule,
    // MatTreeModule,
    // PortalModule,
    ScrollingModule,
  ],
})
export class MaterialModule {
}
