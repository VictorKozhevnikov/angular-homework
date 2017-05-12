export class InternalCourse {
    public internalCourseId: number;
    public internalCourseTitle: string;
    public desc: string;
    public length: number;
    public beginDate: Date;
    public isTopRated: boolean;

    public constructor(values: {
        id: number;
        title: string;
        description: string;
        length: number;
        beginDate: Date;
        isTopRated: boolean
    }) {
        this.internalCourseId = values.id;
        this.internalCourseTitle = values.title;
        this.desc = values.description;
        this.length = values.length;
        this.beginDate = values.beginDate;
        this.isTopRated = values.isTopRated;
    }

    public update(values: {
        title: string;
        description: string;
        length: number;
        beginDate: Date;
        isToprated: boolean
    }) {
        this.internalCourseTitle = values.title;
        this.desc = values.description;
        this.length = values.length;
        this.beginDate = values.beginDate;
        this.isTopRated = values.isToprated;
    }

    public shiftTime(days: number) {
        this.beginDate.setDate(this.beginDate.getDate() + days);
    }
}
