export class Page {
    public static readonly emptyPage: Page = new Page({ skip: 0, take: 0 });

    public readonly skip: number;
    public readonly take: number;

    public constructor(args: { skip: number; take: number }) {
        this.skip = args.skip;
        this.take = args.take;
    }

    public nextPage(pageSize: number) {
        return new Page({
            skip: this.skip + this.take,
            take: pageSize
        });
    }

    public extend(count: number) {
        return new Page({
            skip: this.skip,
            take: this.take + count
        });
    }
}
