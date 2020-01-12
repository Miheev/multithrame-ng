import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AppStore } from '@fav/core/services/app.store';
import { VideoCategory, VideoCountry, VideoFilterModel, VideoLocatedCategory } from '@fav/shared/models';
import { AppConfig } from '@fav/shared/app.config';

@Component({
  selector: 'app-slide-filters',
  templateUrl: './slide-filters.component.html',
  styleUrls: ['./slide-filters.component.scss'],
})
export class SlideFiltersComponent implements OnInit {
  countryFormControl: FormControl = new FormControl();
  filteredCountries$: Observable<VideoCountry[]>;
  categoryFormControl: FormControl = new FormControl();
  filteredCategories$: Observable<VideoCategory[]>;
  categories: VideoCategory[] = [];

  constructor(public appStore: AppStore) {
    this.displayCountry = this.displayCountry.bind(this);
    this.displayCategory = this.displayCategory.bind(this);
  }

  get countries(): VideoCountry[] {
    return AppConfig.countryList;
  }

  ngOnInit(): void {
    this.countryFormControl.setValue(this.appStore.videoFilterData.country);

    this.appStore.loadVideoCategories().subscribe((categories: VideoCategory[]) => {
      this.setCategories(categories);
      this.categoryFormControl.setValue(this.appStore.videoFilterData.category);
    });

    this.filteredCountries$ = this.countryFormControl.valueChanges
      .pipe(
        startWith(''),
        map((term: string) => term ? this.filterContries(term) : this.countries.slice()),
      );

    this.filteredCategories$ = this.categoryFormControl.valueChanges
      .pipe(
        startWith(''),
        map((term: string) => term ? this.filterCategories(term) : this.categories.slice()),
      );
  }

  displayCategory(categoryId?: string): string | undefined {
    if (!categoryId && categoryId !== '') {
      return undefined;
    }

    const category = this.categories.find((item: VideoCategory) => item.id === categoryId);
    if (!category) {
      return undefined;
    }

    return category.name;
  }

  displayCountry(countryId?: string): string | undefined {
    if (!countryId) {
      return undefined;
    }

    const country = this.countries.find((item: VideoCountry) => item.code === countryId);
    if (!country) {
      return undefined;
    }

    return country.name;
  }

  onCleanInput(formControl: FormControl): void {
    formControl.setValue(undefined);
  }

  onCategorySelected(value: string): void {
    this.appStore.videoFilterData = { category: value } as unknown as VideoFilterModel;
  }

  onCountrySelected(countryId: string): void {
    // reload categories with selected country
    this.appStore.loadCategoriesForNewCountry(countryId)
      .subscribe((localCategory: VideoLocatedCategory) => {
        this.setCategories(localCategory.categories);
        this.categoryFormControl.setValue(localCategory.selectedCategoryId);
        this.appStore.videoFilterData = {
          category: localCategory.selectedCategoryId,
          country: countryId,
        } as unknown as VideoFilterModel;
      });
  }

  onVideoCountChange(count: number): void {
    this.appStore.videoFilterData = { videosPerPage: count } as VideoFilterModel;
  }

  private setCategories(categories: VideoCategory[]): void {
    this.categories = categories;
    this.categories.unshift(AppConfig.defaultCategory);
  }

  private filterContries(term: string): VideoCountry[] {
    const filterValue = term.toLowerCase();
    return this.countries.filter((country: VideoCountry) => {
      return country.name.toLowerCase().indexOf(filterValue) === 0;
    });
  }

  private filterCategories(term: string): VideoCategory[] {
    const filterValue = term.toLowerCase();
    return this.categories.filter((category: VideoCategory) => {
      return category.name.toLowerCase().indexOf(filterValue) === 0;
    });
  }
}
