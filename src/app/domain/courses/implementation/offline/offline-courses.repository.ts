import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { CoursesOfflineRepository } from '../courses-offline.repository';
import { Course, CourseData } from '../../contract';
import { storage } from './storage';

@Injectable()
export class OfflineCoureseRepository {
    private readonly storage: Array<Course>;
    private lastId = 0;

    public constructor() {
        this.storage = storage;
    }

    public create(courseData: CourseData): Observable<void> {
        let course = {
            id: ++this.lastId,
            title: courseData.title,
            description: courseData.description,
            duration: courseData.duration,
            beginTime: courseData.beginTime,
            isTopRated: courseData.isTopRated
        };

        this.storage.push(course);

        return Observable.of(null);
    }

    public find(courseId: number): Observable<Course> {
        let course = this.storage.find(item => item.id === courseId);
        return Observable.of(course);
    }

    public save(course: Course): Observable<void> {
        let courseIndex = this.storage.findIndex(item => item.id === course.id);
        if (courseIndex === -1) {
            throw new Error('No item with such id in repository');
        }
        this.storage[courseIndex] = (course);
        return Observable.of(null);
    }

    public delete(courseId: number): Observable<void> {
        let courseIndex = this.storage.findIndex(item => item.id === courseId);
        if (courseIndex > -1) {
            this.storage.splice(courseIndex, 1);
        }
        return Observable.of(null);
    }

    public getAll(): Observable<Array<Course>> {
        const copy: Array<Course> = this.storage.slice();
        return Observable.of(copy);
    }

    public getLaterThan(beginDate: Date): Observable<Array<Course>> {
        const resultCourses: Array<Course> =
            this.storage.filter(course => course.beginTime >= beginDate);

        return Observable.of(resultCourses);
    }
}
