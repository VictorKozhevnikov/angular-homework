import { Injectable } from '@angular/core';
import { Course, CourseData, CoursesService } from '../../contract';
import { OfflineCoureseRepository } from './offline-courses.repository';


@Injectable()
export class OfflineCoursesService implements CoursesService {
    private readonly coursesRepository: OfflineCoureseRepository;

    public constructor(coursesRepository: OfflineCoureseRepository) {
        this.coursesRepository = coursesRepository;
    }

    public getCourses(): Promise<Array<Course>> {
        return this.coursesRepository.getAll();
    }

    public createCourse(courseData: CourseData): Promise<void> {
        return this.coursesRepository.create(courseData);
    }

    public getCourse(courseId: number): Promise<Course> {
        return this.coursesRepository.find(courseId);
    }

    public updateCourse(courseId: number, courseData: CourseData): Promise<void> {
        return this.coursesRepository
            .find(courseId)
            .then(course => {
                course.title = courseData.title;
                course.description = courseData.description;
                course.duration = courseData.duration;
                course.beginTime = courseData.beginTime;
                return course;
            })
            .then(course => {
                this.coursesRepository.save(course);
            });
    }

    public deleteCourse(courseId: number): Promise<void> {
        return this.coursesRepository.delete(courseId);
    }
}
