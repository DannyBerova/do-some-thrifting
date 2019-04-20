import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { messages, paths } from '../consts'

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
         || success.body.message === 'Post edited successfully.'
         || success.body.message === 'Comment deleted successfully!') {
           this.toastr.success(messages.success, success.body.message);
         }
       }
      }), catchError((err) => {
        this.authService.logout();
        this.router.navigate([paths.login])
        this.toastr.error(messages.error, err.error['message']);
        
        console.log('result interceptor', err);
        throw err;
      }));
  }
}
