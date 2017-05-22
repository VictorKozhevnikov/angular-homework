import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Course, CourseData, CoursesService } from '../../contract';
import { InternalCourse } from './internalCourse';
import { InternalCourseData } from './internalCourseData';
import { OfflineCoureseRepository } from './offline-courses.repository';

import { DummyWorkService } from '../../../../core';

@Injectable()
export class OfflineCoursesService implements CoursesService {
    public constructor(
        private readonly coursesRepository: OfflineCoureseRepository,
        private readonly dummyWorkService: DummyWorkService
    ) { }

    public getCourses(): Observable<Array<Course>> {
        const result: Observable<Array<Course>> = this.coursesRepository
            .getAll()
            .map(internalCourses => this.mapToCourses(internalCourses));

        return this.dummyWorkService.workOn(result);
    }

    public getLatestCourses(params: {
        beginDate: Date
    }): Observable<Array<Course>> {

        const result: Observable<Array<Course>> = this.coursesRepository
            .getLaterThan(params.beginDate)
            .map(internalCourses => this.mapToCourses(internalCourses));

        return this.dummyWorkService.workOn(result);
    }

    public createCourse(courseData: CourseData): Observable<void> {
        const internalСourseData = this.mapToInternalCourseData(courseData);
        const result = this.coursesRepository.create(internalСourseData);

        return this.dummyWorkService.workOn(result);
    }

    public getCourse(courseId: number): Observable<Course> {
        const result: Observable<Course> = this.coursesRepository
            .find(courseId)
            .map(internalCourse => this.mapToCourse(internalCourse));

        return this.dummyWorkService.workOn(result);
    }

    public updateCourse(courseId: number, courseData: CourseData): Observable<void> {
        const algorithm = this.coursesRepository
            .find(courseId)
            .map(internalCourse => {
                internalCourse.update({
                    title: courseData.title,
                    description: courseData.description,
                    length: courseData.duration,
                    beginDate: courseData.beginTime,
                    isToprated: courseData.isTopRated
                });
                return internalCourse;
            })
            .flatMap(internalCourse => {
                return this.coursesRepository.save(internalCourse);
            });

        return this.dummyWorkService.workOn(algorithm);
    }

    public deleteCourse(courseId: number): Observable<void> {
        const result = this.coursesRepository.delete(courseId);

        return this.dummyWorkService.workOn(result);
    }

    private mapToCourse(internalCourse: InternalCourse): Course {
        return {
            id: internalCourse.internalCourseId,
            title: internalCourse.internalCourseTitle,
            description: internalCourse.desc,
            duration: internalCourse.length,
            beginTime: internalCourse.beginDate,
            isTopRated: internalCourse.isTopRated,
        };
    }

    private mapToCourses(internalCourses: Array<InternalCourse>): Array<Course> {
        return internalCourses.map(internalCourse => this.mapToCourse(internalCourse));
    }

    private mapToInternalCourseData(courseData: CourseData): InternalCourseData {
        return {
            internalCourseTitle: courseData.title,
            desc: courseData.description,
            length: courseData.duration,
            beginDate: courseData.beginTime,
            isTopRated: courseData.isTopRated
        };
    }
}
