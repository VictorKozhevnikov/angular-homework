import { Observable } from 'rxjs/Rx';

import { Page } from './page';
import { PaginationState } from './pagination-state';

export function defaultFetch<TQuery, TItem>(
    fetch: (q: TQuery, p: Page) => Observable<Array<TItem>>
): (q: TQuery, p: Page) => Observable<PaginationState<TItem>> {

    function df(query: TQuery, page: Page) {

        const extendedPage: Page = page.extend(1);

        return fetch(query, extendedPage)
            .map(items => {

                const hasMore = items.length > page.take;
                if (hasMore) {
                    items.pop();
                }

                return new PaginationState(items, hasMore);
            });
    }

    return df;
}
