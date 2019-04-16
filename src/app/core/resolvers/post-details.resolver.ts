import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PostService } from '../services/post.service';

@Injectable()
export class SinglePostResolver implements Resolve<any> {

  constructor(
    private postService: PostService
  )  { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    if (route.url[0].path === 'details') {
      return this.postService.getSinglePostById(id);
    }
  }
}