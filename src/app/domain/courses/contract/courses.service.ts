import { Observable } from 'rxjs/Rx';

import { Course } from  './course';
import { CourseData } from  './courseData';
import { CoursesSearchParams } from './coursesSearchParams';

export interface CoursesService {

    searchCourses(params: CoursesSearchParams): Observable<Array<Course>>;

    createCourse(courseData: CourseData): Observable<void>;

    getCourse(courseId: number): Observable<Course>;

    updateCourse(courseId: number, courseData: CourseData): Observable<void>;

    deleteCourse(courseId: number): Observable<void>;
}
