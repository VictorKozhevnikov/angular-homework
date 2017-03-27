import { Course } from  './course';
import { CourseData } from  './courseData';

export interface CoursesService {

    getCourses(): Promise<Array<Course>>;

    createCourse(courseData: CourseData): Promise<void>;

    getCourse(courseId: number): Promise<Course>;

    updateCourse(courseId: number, courseData: CourseData): Promise<void>;

    deleteCourse(courseId: number): Promise<void>;
}
