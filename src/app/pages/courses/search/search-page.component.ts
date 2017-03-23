import { Component, OnInit } from '@angular/core';
import { Course } from '../../../domain/courses';

@Component({
    selector: 'courses-search-page',
    template: require('./search-page.component.html')
})
export class SearchPageComponent implements OnInit {
    public courses: Array<Course> = null;

    public constructor() {
        this.courses = new Array<Course>();
    }

    public ngOnInit() {
        this.courses = [1, 2, 3].map((i) => {
            return {
                id: i,
                title: 'Video course' + i,
                description: `Lorem ipsum dolor sit amet, at nobis aliquando scribentur usu, pri delectus oporteat constituto eu, in solet everti omittantur pro. Id clita vocent per, qualisque rationibus te duo. Nihil solet pri ne. Mel id porro libris atomorum, an duo dicat quando gloriatur, labore vidisse veritus sit at. Nec id quas debet, no cum tractatos consulatu dissentiet.`,
                duration: 88 + i,
                beginTime: new Date()
            }
        });
    }

    private deleteCourse(course: Course): void {
        console.log('---- delete course ' + course.id);
    }
}
