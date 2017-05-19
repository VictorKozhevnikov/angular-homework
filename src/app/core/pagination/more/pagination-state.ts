export class PaginationState<T>{
    public static readonly initialState = new PaginationState([], false);

    public constructor(
        public readonly items: Array<T>,
        public readonly hasMore: boolean) {
    }

    public append(newState: PaginationState<T>) {
        return new PaginationState(this.items.concat(newState.items), newState.hasMore);
    }
}
