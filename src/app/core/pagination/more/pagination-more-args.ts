import { Observable } from 'rxjs/Rx';

import { Page } from './page';
import { PaginationState } from './pagination-state';

export interface PaginationMoreArgs<TQuery, TItem> {
    query: TQuery;
    pageSize: number;
    fetch: (query: TQuery, page: Page) => Observable<PaginationState<TItem>>;

    more: Observable<void>;
}
