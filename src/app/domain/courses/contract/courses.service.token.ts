import { InjectionToken } from '@angular/core';
import { CoursesService } from './courses.service';

export const coursesServiceToken = new InjectionToken<CoursesService>('courses.coursesService');
