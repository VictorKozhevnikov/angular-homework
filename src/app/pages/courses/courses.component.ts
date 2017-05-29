import { Component } from '@angular/core';

@Component({
    template: `
<section class='container'>
    <router-outlet></router-outlet>
</section>
    `})
export class CoursesComponent {
    public constructor() {
    }
}

