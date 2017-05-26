import { Injectable } from '@angular/core';
import { RequestMethod, Request, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

import { AuthorizedHttp } from '../../../http';

import {
    Course,
    CourseAuthor,
    CourseData,
    CoursesService,
    CoursesSearchParams
} from '../../contract';

@Injectable()
export class CoursesHttpService implements CoursesService {
    public constructor(
        private readonly http: AuthorizedHttp
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

    public searchCourseAuthors(): Observable<Array<CourseAuthor>> {
        const request: Request = new Request({
            method: RequestMethod.Get,
            url: '/authors'
        });

        const result: Observable<Array<CourseAuthor>> = this.http
            .request(request)
            .map(response => response.json())
            .map(items => items.map(item => this.mapToCourseAuthor(item)));

        return result;
    }

    public createCourse(courseData: CourseData): Observable<void> {
        const request: Request = new Request({
            method: RequestMethod.Post,
            url: '/courses',
            body: courseData
        });

        const result: Observable<void> = this.http
            .request(request).map(() => null);

        return result;
    }

    public getCourse(courseId: number): Observable<Course> {
        throw new Error('not implemented');
    }

    public updateCourse(courseId: number, courseData: CourseData): Observable<void> {
        throw new Error('not implemented');
    }

    public deleteCourse(courseId: number): Observable<void> {
        const request: Request = new Request({
            method: RequestMethod.Delete,
            url: '/courses/' + courseId.toString()
        });

        const result: Observable<void> = this.http
            .request(request)
            .map(() => { });

        return result;
    }

    private mapToCourse(object: any): Course {
        return {
            id: object.id,
            title: object.title,
            isTopRated: object.isTopRated,
            description: object.description,
            beginTime: object.beginTime,
            duration: object.duration,
            authors: object.authors.map(a => this.mapToCourseAuthor(a))
        };
    }

    private mapToCourseAuthor(object: any): CourseAuthor {
        return {
            id: object.id,
            firstName: object.firstName,
            lastName: object.lastName
        };
    }
}
