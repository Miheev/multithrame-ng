import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';

import { AppStore } from '@fav/core/services/app.store';
import { ScrollStateEnum } from '@fav/shared/models';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective implements AfterViewInit, OnDestroy {
  scrollOffset = 30;
  scrollPosition = -1;
  scrollElement: HTMLElement;

  constructor(private appStore: AppStore,
              private element: ElementRef<HTMLElement>) {
  }

  private get scrollEvent(): Observable<Event> {
    return fromEvent(this.scrollElement, 'scroll');
  }

  ngAfterViewInit(): void {
    this.scrollElement = this.element.nativeElement;

    let offset = parseInt(window.getComputedStyle(this.scrollElement)
      .getPropertyValue('--scroll-offset'), 10);
    if (offset && !Number.isNaN(offset)) {
      this.scrollOffset = offset;
    }

    this.scrollInit();
  }

  ngOnDestroy(): void {
    this.scrollElement = {} as HTMLElement;
  }

  scrollInit(): void {
    this.appStore.infiniteScrollSubject.subscribe((value: ScrollStateEnum) => {
      switch (true) {
        case value === ScrollStateEnum.scrollBack && this.scrollPosition > 0:
          this.scrollTo(this.scrollPosition);
          break;
        case value === ScrollStateEnum.resetScroll:
          this.scrollTo(0);
          break;
        case value === ScrollStateEnum.scrollSave:
          const currentPosition = this.scrollElement.scrollTop;
          // should be more then scroll css offset otherwise scroll back feature not visible
          if (currentPosition + this.scrollOffset > this.scrollOffset) {
            this.scrollPosition = currentPosition + this.scrollOffset;
          }
          break;
      }
    });

    this.scrollEvent.pipe(
        takeUntil(this.appStore.destroySubject),
        debounceTime(300),
      )
      .subscribe(() => {
        this.triggerNextPage();
      });
  }

  private scrollTo(position: number): void {
    setTimeout((() => {
      this.scrollElement.scrollTop = position;
    }), 100);
  }

  private triggerNextPage(): void {
    const isLocked = this.appStore.infiniteScrollSubject.getValue();
    if (isLocked === ScrollStateEnum.locked) {
      return;
    }

    const maxHeight = this.scrollElement.scrollHeight - this.scrollElement.offsetHeight;
    const currentPosition = this.scrollElement.scrollTop;
    if (maxHeight - currentPosition >= this.scrollOffset) {
      return;
    }

    this.appStore.infiniteScrollSubject.next(ScrollStateEnum.locked);
  }
}
