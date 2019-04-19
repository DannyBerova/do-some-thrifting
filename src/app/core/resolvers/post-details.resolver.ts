import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';

@Injectable()
export class SinglePostResolver implements Resolve<any> {

  constructor(
    private postService: PostService,
    private commentService: CommentService
  )  { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    if (route.url[0].path === 'details') {
      return this.postService.getSinglePostById(id)
      .pipe(mergeMap(_ => 
        this.commentService.getAllCommentsByPostId(id),
          (post, comments) => ({post, comments}), 2),
      );
    }
  }
}