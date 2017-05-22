import { Observable } from 'rxjs/Rx';

import { Course } from  './course';
import { CourseData } from  './courseData';

export interface CoursesService {

    getCourses(): Observable<Array<Course>>;

    getLatestCourses(params: {
        beginDate: Date
    }): Observable<Array<Course>>;

    createCourse(courseData: CourseData): Observable<void>;

    getCourse(courseId: number): Observable<Course>;

    updateCourse(courseId: number, courseData: CourseData): Observable<void>;

    deleteCourse(courseId: number): Observable<void>;
}
