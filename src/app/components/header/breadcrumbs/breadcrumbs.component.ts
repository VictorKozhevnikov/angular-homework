import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    OnDestroy
} from '@angular/core';

import { Subject, Observable } from 'rxjs/Rx';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { BreadcrumbsProvider } from './breadcrumbs-provider';

@Component({
    selector: 'breadcrumbs',
    templateUrl: './beradcrumbs.component.html',
    styles: ['.breadcrumb { background: none; margin: 0; }'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
    private static getStateData(
        route: ActivatedRoute
    ): Array<{ title: string, href: string }> {
        const result = new Array<{ title: string, href: string }>();
        while (route != null) {
            if (route.snapshot.data && route.snapshot.data['breadcrumb']) {
                const item = {
                    title: route.snapshot.data['breadcrumb'],
                    href: '/#' + route.snapshot.pathFromRoot
                        .map(i => i.url[0]
                            ? i.url[0].path
                            : '')
                        .join('/')
                };

                result.push(item);
            }
            route = route.firstChild;
        }
        return result;
    }

    public items: Observable<Array<{ title: string, href: string }>>;

    private readonly ngUnsubscribe = new Subject<void>();

    public constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {
    }

    public ngOnInit(): void {
        this.items = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.router.routerState.root)
            .map(route => BreadcrumbsComponent.getStateData(route));
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }


}
