import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { InternalCourse } from './internalCourse';
import { InternalCourseData } from './internalCourseData';

import { storage } from './storage';

@Injectable()
export class OfflineCoureseRepository {
    private readonly storage: Array<InternalCourse>;
    private lastId = 0;

    public constructor() {
        this.storage = storage;
    }

    public create(courseData: InternalCourseData): Observable<void> {

        const  course = new InternalCourse({
            id: ++this.lastId,
            title: courseData.internalCourseTitle,
            description: courseData.desc,
            length: courseData.length,
            beginDate: courseData.beginDate,
            isTopRated: courseData.isTopRated
        });

        this.storage.push(course);

        return Observable.of(null);
    }

    public find(internalCourseId: number): Observable<InternalCourse> {
        let course = this.storage.find(item => item.internalCourseId === internalCourseId);
        return Observable.of(course);
    }

    public save(internalCourse: InternalCourse): Observable<void> {
        let courseIndex = this.storage
            .findIndex(item => item.internalCourseId === internalCourse.internalCourseId);
        if (courseIndex === -1) {
            throw new Error('No item with such id in repository');
        }
        this.storage[courseIndex] = (internalCourse);
        return Observable.of(null);
    }

    public delete(internalCourseId: number): Observable<void> {
        let courseIndex = this.storage
            .findIndex(item => item.internalCourseId === internalCourseId);
        if (courseIndex > -1) {
            this.storage.splice(courseIndex, 1);
        }
        return Observable.of(null);
    }

    public getAll(): Observable<Array<InternalCourse>> {
        const copy: Array<InternalCourse> = this.storage.slice();
        return Observable.of(copy);
    }

    public getLaterThan(beginDate: Date): Observable<Array<InternalCourse>> {
        const resultCourses: Array<InternalCourse> =
            this.storage.filter(course => course.beginDate >= beginDate);

        return Observable.of(resultCourses);
    }
}
