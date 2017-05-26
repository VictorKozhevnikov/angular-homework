import { CourseAuthor } from './course-author';

export interface CourseData {
    title: string;
    description: string;
    duration: number;
    beginTime: Date;
    isTopRated: boolean;
    authors: Array<CourseAuthor>;
}
