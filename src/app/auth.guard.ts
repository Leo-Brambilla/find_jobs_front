import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './services/auth/auth.component'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable< boolean | UrlTree > | Promise < boolean | UrlTree > | boolean | UrlTree {
    const isLoggedIn = this.authService.isAuthenticated();
    const userRole = this.authService.getUserRole();
    

    if (isLoggedIn && (userRole === 'ROLE_USER' || userRole === 'ROLE_ADMIN' || userRole === 'ROLE_USER,ADMIN')) {      
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
