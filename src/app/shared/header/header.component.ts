import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'ROLE_USER,ADMIN';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
