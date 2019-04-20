import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

import { PostService } from '../services/post.service';

const SOLD_STATUS = 'sold'
@Injectable()
export class PostAllResolver implements Resolve<any> {

  constructor(
    private postService: PostService,
  )  { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.url[0].path === 'all') {
        return this.postService.getAllPosts()
        .pipe(
            map(data => {
                return data['posts']
                    .filter(p => p.status !== SOLD_STATUS && p.createdBy.isBlocked === false)
                    .sort((a,b) => {
                        a = new Date(a.createdOn);
                        b = new Date(b.createdOn);
                        return a>b ? -1 : a<b ? 1 : 0;
                      });
                
            }))
        }
    }
}