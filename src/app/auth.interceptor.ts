import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger
    const token = localStorage.getItem('token');
    if (request.url.includes('/auth/signup') || request.url.includes('/auth/login')) {
      return next.handle(request);
    }
    if (token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)      
      });
      return next.handle(cloned)
    }else {
      return next.handle(request);
    }    
  }
}
