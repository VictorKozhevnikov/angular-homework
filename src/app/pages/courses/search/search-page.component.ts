import { Component } from  '@angular/core';
import { Course } from '../../../domain/courses';

@Component({
    selector: 'courses-search-page',
    template: require('./search-page.component.html')
})
export class SearchPageComponent {
    public courses: Array<Course> = [
        {
            title: 'Video course 1',
            description: `Lorem ipsum dolor sit amet, at nobis aliquando scribentur usu, pri delectus oporteat constituto eu, in solet everti omittantur pro. Id clita vocent per, qualisque rationibus te duo. Nihil solet pri ne. Mel id porro libris atomorum, an duo dicat quando gloriatur, labore vidisse veritus sit at. Nec id quas debet, no cum tractatos consulatu dissentiet.`,
            duration: 88,
            beginTime: new Date()
        },
        {
            title: 'Video course 2',
            description: `Lorem ipsum dolor sit amet, at nobis aliquando scribentur usu, pri delectus oporteat constituto eu, in solet everti omittantur pro. Id clita vocent per, qualisque rationibus te duo. Nihil solet pri ne. Mel id porro libris atomorum, an duo dicat quando gloriatur, labore vidisse veritus sit at. Nec id quas debet, no cum tractatos consulatu dissentiet.`,
            duration: 99,
            beginTime: new Date()
        },
        {
            title: 'Video course 3',
            description: `Lorem ipsum dolor sit amet, at nobis aliquando scribentur usu, pri delectus oporteat constituto eu, in solet everti omittantur pro. Id clita vocent per, qualisque rationibus te duo. Nihil solet pri ne. Mel id porro libris atomorum, an duo dicat quando gloriatur, labore vidisse veritus sit at. Nec id quas debet, no cum tractatos consulatu dissentiet.`,
            duration: 1010,
            beginTime: new Date()
        }
    ];
}
