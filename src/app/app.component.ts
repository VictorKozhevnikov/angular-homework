/*
 * Angular 2 decorators and services
 */
import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    template: require('./app.component.html'),
    styleUrls: [
        './app.component.scss',
        './course-list-item.scss'
    ]
})
export class AppComponent implements OnInit {

    public currentPage: string;
    public pages = {
        login: 'login',
        search: 'search',
    };

    constructor(
        public appState: AppState
    ) { }

    public ngOnInit() {
        console.log('Initial App State', this.appState.state);


        this.currentPage = this.pages.login;
    }

    public loginSucceeded() {
        this.currentPage = this.pages.search;
    }

}
