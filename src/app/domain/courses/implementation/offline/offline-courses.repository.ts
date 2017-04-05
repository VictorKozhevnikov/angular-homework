import { Injectable } from '@angular/core';
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

    public create(courseData: CourseData): Promise<void> {
        let course = {
            id: ++this.lastId,
            title: courseData.title,
            description: courseData.description,
            duration: courseData.duration,
            beginTime: courseData.beginTime
        };

        this.storage.push(course);

        return Promise.resolve();
    }

    public find(courseId: number): Promise<Course> {
        let course = this.storage.find(item => item.id === courseId);
        return Promise.resolve(course);
    }

    public save(course: Course): Promise<void> {
        let courseIndex = this.storage.findIndex(item => item.id === course.id);
        if (courseIndex === -1) {
            throw new Error('No item with such id in repository');
        }
        this.storage[courseIndex] = (course);
        return Promise.resolve();
    }

    public delete(courseId: number): Promise<void> {
        let courseIndex = this.storage.findIndex(item => item.id === courseId);
        if (courseIndex > -1) {
            this.storage.splice(courseIndex, 1);
        }
        return Promise.resolve();
    }

    public getAll(): Promise<Array<Course>> {
        const copy = { ...this.storage };
        return Promise.resolve(copy);
    }
}
