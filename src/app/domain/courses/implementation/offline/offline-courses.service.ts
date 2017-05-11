import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Course, CourseData, CoursesService } from '../../contract';
import { OfflineCoureseRepository } from './offline-courses.repository';
import { DummyWorkService } from '../../../../core';

@Injectable()
export class OfflineCoursesService implements CoursesService {
    public constructor(
        private readonly coursesRepository: OfflineCoureseRepository,
        private readonly dummyWorkService: DummyWorkService
    ) { }

    public getCourses(): Observable<Array<Course>> {
        const result = this.coursesRepository.getAll();

        return this.dummyWorkService.workOn(result);
    }

    public createCourse(courseData: CourseData): Observable<void> {
        const result = this.coursesRepository.create(courseData);

        return this.dummyWorkService.workOn(result);
    }

    public getCourse(courseId: number): Observable<Course> {
        const result = this.coursesRepository.find(courseId);

        return this.dummyWorkService.workOn(result);
    }

    public updateCourse(courseId: number, courseData: CourseData): Observable<void> {
        const algorithm = this.coursesRepository.find(courseId)
            .map(course => {
                course.title = courseData.title;
                course.description = courseData.description;
                course.duration = courseData.duration;
                course.beginTime = courseData.beginTime;
                return course;
            })
            .flatMap(course => {
                return this.coursesRepository.save(course);
            });

        return this.dummyWorkService.workOn(algorithm);
    }

    public deleteCourse(courseId: number): Observable<void> {
        const result = this.coursesRepository.delete(courseId);

        return this.dummyWorkService.workOn(result);
    }
}
