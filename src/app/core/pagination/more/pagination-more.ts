import { Observable } from 'rxjs/Rx';

import { Page } from './page';
import { PaginationMoreArgs } from './pagination-more-args';
import { PaginationState } from './pagination-state';

export class PaginationMore<TQuery, TItem>{
    public readonly paginationState: Observable<PaginationState<TItem>>;

    public constructor(args: PaginationMoreArgs<TQuery, TItem>) {

        const pages: Observable<Page> = args.more
            .startWith(null)
            .scan((page, _) => page.nextPage(args.pageSize), Page.emptyPage);

        this.paginationState = pages
            .map(page => args.fetch(args.query, page))
            .concatAll()
            .scan((state, fetchResult) => state.append(fetchResult), PaginationState.initialState);
    }
}
