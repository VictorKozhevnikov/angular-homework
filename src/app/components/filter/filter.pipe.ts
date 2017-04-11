import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'myFilter' })
export class FilterPipe implements PipeTransform {
    public transform<T>(collection: Array<T>, filter: Object): Array<T> {
        const filteredCollection: Array<T> = collection.filter(item => {
            for (let propertyName in filter) {
                if (filter.hasOwnProperty(propertyName)) {
                    const filterValue = filter[propertyName];
                    const itemValue = item[propertyName];
                    if (filterValue && itemValue !== filterValue) {
                        console.log('---- filtered away ' + itemValue);
                        return false;
                    }
                }
            }
            return true;
        });

        return filteredCollection;
    }
}
