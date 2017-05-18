import { NgModule } from '@angular/core';

import { usersServiceToken } from '../../contract';

import { UsersHttpService } from  './users-http.service';

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [
        {provide: usersServiceToken, useClass: UsersHttpService }]
})
export class UsersHttpModule {
    constructor() { }
}
