import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';

import { loginRoutes } from './login.routes';

@NgModule({
    declarations: [
        LoginComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(loginRoutes)
        ],
    exports: [
        LoginComponent]
})
export class LoginModule {
    constructor() { }
}
