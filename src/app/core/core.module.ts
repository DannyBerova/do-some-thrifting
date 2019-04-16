import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { ResponceHandlerInterceptorService } from './interceptors/responce-handler.service';
import { SinglePostResolver } from './resolvers/post-details.resolver';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';

@NgModule({
  providers: [
    SinglePostResolver,
    AuthService,
    PostService,
    JwtInterceptorService,
    ResponceHandlerInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ResponceHandlerInterceptorService,
        multi: true
      }
  ]
})
export class CoreModule { }