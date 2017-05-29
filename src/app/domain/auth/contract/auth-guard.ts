import { Injectable, Inject } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';

import { AuthService } from './auth.service';
import { authServiceToken } from './auth.service.token';

@Injectable()
export class AuthGuard implements CanActivate {
    public constructor(
        @Inject(authServiceToken) private readonly authService: AuthService,
        private readonly router: Router) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authService.IsAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        } else {
            return true;
        }
    }
}
