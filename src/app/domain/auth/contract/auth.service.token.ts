import { InjectionToken } from '@angular/core';
import { AuthService } from './auth.service';

export const authServiceToken = new InjectionToken<AuthService>('auth.authService');
