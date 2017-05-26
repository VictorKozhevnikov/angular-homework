import { CourseAuthor } from './course-author';

export interface Course {
    id: number;
    title: string;
    description: string;
    duration: number;
    beginTime: Date;
    isTopRated: boolean;
    authors: Array<CourseAuthor>;
}
