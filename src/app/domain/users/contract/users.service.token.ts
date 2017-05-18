import { InjectionToken } from '@angular/core';
import { UsersService } from './users.service';

export const usersServiceToken = new InjectionToken<UsersService>('users.usersService');
