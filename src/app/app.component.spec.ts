import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AppStore } from '@fav/core/services/app.store';
import { createAppStore } from '@fav/shared/utils/create-app-store';

describe('AppComponent', () => {
  let appStore: AppStore;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    appStore = createAppStore();

    TestBed.configureTestingModule({
        declarations: [AppComponent],
        providers: [
          { provide: AppStore, useValue: appStore },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
