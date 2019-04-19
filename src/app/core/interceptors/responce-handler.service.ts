import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResponceHandlerInterceptorService implements HttpInterceptor {

  constructor(
    public authService: AuthService,
    private router: Router,
    public toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     return next.handle(req).pipe(tap((success) => {
       if (success instanceof HttpResponse) {
         if (success.url.endsWith('login')
         || success.url.endsWith('register')
         || success.url.endsWith('create')
         || success.url.endsWith('destroy')
         || success.body.message === 'Post deleted successfully!'
         || success.body.message === 'Comment deleted successfully!') {
           this.toastr.success('Success', success.body.message);
         }
       }
      }), catchError((err) => {
        this.authService.logout();
        this.router.navigate(['/auth/login'])
        console.log('result interceptor', err);
        this.toastr.error('Error', err.error['message']);
        throw err;
      }));
  }
}
