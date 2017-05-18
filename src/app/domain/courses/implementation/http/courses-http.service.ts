import { Injectable } from '@angular/core';
import { Http, RequestMethod, Request, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

import { Course, CourseData, CoursesService, CoursesSearchParams } from '../../contract';

@Injectable()
export class CoursesHttpService implements CoursesService {
    public constructor(
        private readonly http: Http
    ) { }

    public searchCourses(searchParams: CoursesSearchParams): Observable<Array<Course>> {
        const requestParams: URLSearchParams = new URLSearchParams();

        if (searchParams.text) {
            requestParams.set('title_like', searchParams.text);
        }

        if (searchParams.beginDate) {
            requestParams.set('beginTime_gte', moment(searchParams.beginDate).format());
        }

        if (searchParams.offset) {
            requestParams.set('_start', searchParams.offset.toString());
        }

        if (searchParams.pageSize) {
            requestParams.set('_limit', searchParams.pageSize.toString());
        }

        requestParams.set('_sort', 'beginTime');
        requestParams.set('_order', 'desc');

        const request: Request = new Request({
            method: RequestMethod.Get,
            url: '/courses',
            params: requestParams
        });

        const result: Observable<Array<Course>> = this.http
            .request(request)
            .map(response => response.json())
            .map(items => items.map(item => this.mapToCourse(item)));

        return result;
    }

    private mapToCourse(object: any): Course {
        return {
            id: object.id,
            title: object.title,
            isTopRated: object.isTopRated,
            description: object.description,
            beginTime: object.beginTime,
            duration: object.duration
        };
    }

    public createCourse(courseData: CourseData): Observable<void> {
        throw new Error('not implemented');
    }

    public getCourse(courseId: number): Observable<Course> {
        throw new Error('not implemented');
    }

    public updateCourse(courseId: number, courseData: CourseData): Observable<void> {
        throw new Error('not implemented');
    }

    public deleteCourse(courseId: number): Observable<void> {
        throw new Error('not implemented');
    }
}
