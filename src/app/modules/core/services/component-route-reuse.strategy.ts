import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

import { ReusableComponentAbstract } from '@fav/shared/models';

/**
 * See default implementation in
 * https://github.com/angular/angular/blob/da2880d7c495022405102f89b8c641b23516388d/packages/router/src/route_reuse_strategy.ts#L65
 */
@Injectable({
  providedIn: 'root',
})
export class ComponentRouteReuseStrategy implements RouteReuseStrategy {
  private handlers = new WeakMap<any, DetachedRouteHandle>();

  constructor() {
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const shouldDetach = Boolean(route.data.shouldReuse);
    /* istanbul ignore else */
    if (shouldDetach) {
      const reusable: ReusableComponentAbstract = this.reusableComponent(route);
      reusable.isActive = false;
    }
    return shouldDetach;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    if (!route.data.shouldReuse) {
      return;
    }
    if (handle === null) {
      this.handlers.delete(route.component);
    } else {
      this.handlers.set(route.component, handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const shouldAttach = Boolean(route.routeConfig) && route.component && this.handlers.has(route.component);
    if (shouldAttach) {
      const reusable: ReusableComponentAbstract = this.reusableComponent(route);
      reusable.reuseInit();
    }
    return shouldAttach;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig || !route.component ||
      !route.data.shouldReuse || !this.handlers.has(route.component)) {
      return null;
    }
    return this.handlers.get(route.component);
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    const shouldReusePrev = future.data.shouldReuse;
    const shouldReuseSame = future.routeConfig === curr.routeConfig;

    return shouldReuseSame || shouldReusePrev;
  }

  private reusableComponent(route: ActivatedRouteSnapshot): ReusableComponentAbstract {
    return route.routeConfig['instance'] as ReusableComponentAbstract;
  }
}
