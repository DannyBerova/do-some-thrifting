import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ResponceHandlerInterceptorService implements HttpInterceptor {

  constructor(public toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // const jsonReq = req.clone({
      //   setHeaders: {
      //     Authorization: `Bearer ${this.authService.getJwtToken()}`
      //   }
      // });
     return next.handle(req).pipe(tap((success) => {
       if (success instanceof HttpResponse) {
         if (success.url.endsWith('login')
         || success.url.endsWith('register')
         || success.url.endsWith('create')
         || success.body.message === 'Post deleted successfully!'
         || success.body.message === 'Comment deleted successfully!') {
           this.toastr.success('Success', success.body.message);
         }
       }
      }), catchError((err) => {
        console.log('res interceptor', err);
        this.toastr.error('Error', err.error['message']);
        throw err;
      }));
  }
}
