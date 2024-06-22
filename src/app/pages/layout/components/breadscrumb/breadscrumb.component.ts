import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Params,
  Router
} from '@angular/router';
import { ReplaySubject, filter, map, takeUntil } from 'rxjs';
import { Breadcrumb, RouteDataModel } from 'src/app/models/layout-header';
import { BreadcrumbService } from './services/breadscrumb.service';

@Component({
  selector: 'app-breadscrumb',
  templateUrl: './breadscrumb.component.html',
  styleUrls: ['./breadscrumb.component.less']
})
export class BreadscrumbComponent {
  pageName: string = '';
  breadcrumb: Breadcrumb[] = [];

  private _destroy$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private asyncPipe: AsyncPipe,
    private titleBuilder: Title,
    private service: BreadcrumbService
  ) {
    this.breadCrumbData();
    this.service.breadscrumbData$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data) => {
        if (!data) {
          return;
        }
        console.log(data);
        this.breadcrumb = data.items;
        this.pageName = data.title;
      });
  }

  private breadCrumbData(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          const routes = [];
          while (route.firstChild) {
            routes.push(route.firstChild);
            route = route.firstChild;
          }
          return { routes: routes, route: route };
        })
      )
      .subscribe((res) => {
        const { items, displayBreadscrumb, title } = this.asyncPipe.transform(
          res.route.data
        ) as RouteDataModel;

        if (displayBreadscrumb === false) {
          this.breadcrumb = [];
          return;
        }

        this.breadcrumb =
          items && items.length > 0
            ? items
            : this.getBreadscrumbData(res.routes);

        if (title) {
          this.pageName = title;
        } else {
          const breadcrumb = this.breadcrumb.at(-1);
          this.pageName = breadcrumb.id ?? breadcrumb.label;
        }

        this.setPageTitle();
      });
  }

  private setPageTitle() {
    const pageTitle: Array<string> = [];
    for (let i = this.breadcrumb.length - 1; i >= 0; i--) {
      pageTitle.push(this.breadcrumb[i].label);
    }

    this.titleBuilder.setTitle(pageTitle.join(' | '));
  }

  private getBreadscrumbData(routes: Array<ActivatedRoute>): Array<Breadcrumb> {
    const breadscrumbData: Array<Breadcrumb> = [];
    let url = '';
    routes.forEach((route: ActivatedRoute, childRouteIndex: number) => {
      let childPath = '';
      const { routeConfig, params }: ActivatedRouteSnapshot = route.snapshot;
      const data = routeConfig.data;

      const urlChunks = routeConfig.path.split('/');
      for (const [chunkIndex, chunk] of urlChunks.entries()) {
        if (!chunk) {
          continue;
        }

        const isLastChild = childRouteIndex === routes.length - 1;
        const isLastChunk =
          urlChunks.length === 1 ||
          (urlChunks.length > 1 && chunkIndex === urlChunks.length - 1);

        if (!isLastChild || !isLastChunk) {
          url += '/' + this.getBreadscumbItemUrl(chunk, params);
          childPath = url;
        }

        if (isLastChild && isLastChunk) {
          childPath = '';
        }

        if (params.id && data?.label) {
          breadscrumbData.push({
            label: data.label,
            url: url + this.getBreadscumbItemUrl(chunk, params),
            id: params.id,
            queryParams: route.params
          });
        }

        breadscrumbData.push({
          label: data?.routingLabel
            ? data.routingLabel
            : this.getBreadscumbItemLabel(chunk, params, data),
          url: childPath,
          id: params.id,
          queryParams: route.params
        });
      }
    });

    return breadscrumbData;
  }

  private getBreadscumbItemUrl(path: string, params: Params): string {
    if (!path.includes(':')) {
      return path;
    }

    const paramID = path.replace(':', '');
    const routerParamValue = params[paramID];
    return path.replace(`:${paramID}`, `${routerParamValue}`);
  }

  private getBreadscumbItemLabel(
    path: string,
    params: Params,
    data: RouteDataModel
  ): string {
    if (path.includes(':') && params) {
      return this.getItemLabelWithParam(path, params, data?.paramLabels);
    }

    if (data?.replaceLbl) {
      return data.replaceLbl;
    }

    const pathWorks: Array<string> = path.split('-');
    if (pathWorks.length > 0) {
      const capitalPath: Array<string> = pathWorks.map((work: string) =>
        this.updateFirstLetter(work)
      );
      return capitalPath.join(' ');
    }

    return this.updateFirstLetter(path);
  }

  private getItemLabelWithParam(
    path: string,
    params?: Params,
    paramLabels?: { [key: string]: string }
  ): string {
    const paramID = path.replace(':', '');

    if (!paramLabels || (paramLabels && Object.keys(paramLabels).length <= 0)) {
      const chunk = params[paramID].toString();
      return chunk[0].toLocaleUpperCase() + chunk.slice(1, chunk.length);
    }

    if (!paramLabels[paramID]) {
      return this.updateFirstLetter(params[paramID]);
    }

    if (typeof paramLabels[paramID] === 'string') {
      return paramLabels[paramID];
    }

    const pathLbl = paramLabels[paramID][params[paramID]];

    return pathLbl ? pathLbl : this.updateFirstLetter(params[paramID]);
  }

  private updateFirstLetter(work: string): string {
    return work[0].toLocaleUpperCase() + work.slice(1, work.length);
  }
}
