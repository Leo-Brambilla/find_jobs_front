import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {

    this.authService.login(this.loginData).subscribe({
      next: () => {        
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = 'Login ou senha inválidos';
        console.error('Erro no login:', err);
      }
    });
  }
}
