import { CourseAuthor } from './course-author';
import { CourseData } from './course-data';

export class Course {
    public readonly id: number;
    public readonly title: string;
    public readonly description: string;
    public readonly duration: number;
    public readonly beginTime: Date;
    public readonly isTopRated: boolean;
    public readonly authors: Array<CourseAuthor>;

    public constructor(args: {
        id: number;
        title: string;
        description: string;
        duration: number;
        beginTime: Date;
        isTopRated: boolean;
        authors: Array<CourseAuthor>;
    }
    ) {
        this.id = args.id;
        this.title = args.title;
        this.description = args.description;
        this.duration = args.duration;
        this.beginTime = args.beginTime;
        this.isTopRated = args.isTopRated;
        this.authors = args.authors;
    }


    public extractCourseData(): CourseData {
        return {
            title: this.title,
            isTopRated: this.isTopRated,
            description: this.description,
            beginTime: this.beginTime,
            duration: this.duration,
            authors: this.authors
        };
    }
}
