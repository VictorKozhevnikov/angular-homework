import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'myOrderBy' })
export class OrderByPipe implements PipeTransform {
    private static emptyCollection: Array<Object> = new Array<Object>();

    public transform(
        collection: Array<Object>,
        fieldName: string,
        direction: 'asc' | 'desc' | undefined): Array<Object> {
        if (!collection) {
            return OrderByPipe.emptyCollection;
        }

        if (!fieldName) {
            throw new Error('field name must be provided');
        }

        direction = direction || 'asc';

        let compareFunction: (a: any, b: any) => number = null;

        switch (direction) {
            case 'asc':
                compareFunction = (a, b) => a[fieldName] < b[fieldName] ? -1 : 1;
                break;
            case 'desc':
                compareFunction = (a, b) => a[fieldName] > b[fieldName] ? -1 : 1;
                break;
            default:
                throw new Error('must provide ordering direction');
        }

        const orderedcollection = collection.sort(compareFunction);
        return orderedcollection;
    }
}
