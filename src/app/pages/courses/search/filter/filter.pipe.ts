import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../../../domain/courses';

@Pipe({ name: 'myFilter' })
export class FilterPipe implements PipeTransform {
    public transform(collection: Array<Course>, titleFilter: string): Array<Course> {
        if (!titleFilter) {
            return collection;
        }

        titleFilter = titleFilter.toLowerCase();
        const filteredCollection: Array<Course> = collection.filter(course => {
            return course.title.toLowerCase().includes(titleFilter);
        });

        return filteredCollection;
    }
}
