import { OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

export abstract class ReusableComponentAbstract implements OnDestroy {
  protected isComponentActive = new BehaviorSubject<boolean>(true);
  protected router: Router;
  protected route: ActivatedRoute;

  constructor(router, route) {
    this.router = router;
    this.route = route;
    this.route.snapshot.routeConfig['instance'] = this;
  }

  get isActive(): boolean {
    return this.isComponentActive.getValue();
  }

  set isActive(value: boolean) {
    if (this.isActive !== value) {
      this.isComponentActive.next(value);
    }
  }

  ngOnDestroy(): void {
    if (this.route && this.route.snapshot && this.route.snapshot.routeConfig) {
      delete this.route.snapshot.routeConfig['instance'];
    }
    this.isComponentActive.complete();
  }

  reuseInit(): void {
    console.time('VideoListPageComponent component reuse');
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      take(1),
    ).subscribe(() => {
      this.isActive = true;
      this.reuseAfterInit();
    });
  }

  abstract reuseAfterInit(): void;
}
