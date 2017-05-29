import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NoContentComponent } from './pages/no-content';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: '**', component: NoContentComponent }
];
