import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../../shared/models/IPost';
import { PostService } from 'src/app/core/services/post.service';
import { PagerService } from 'src/app/core/services/pager.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component ({
  selector: 'app-post-all',
  templateUrl: './post-all.component.html',
  styleUrls: ['./post-all.component.scss']
})
export class PostAllComponent {

  posts: Array<IPost>;
  postsProcessed: Array<IPost>;
   pager: any = {};
   pagedItems: any[];
   term: string = '';

  constructor(
    private postService: PostService,
    private pagerService: PagerService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.initPosts();
  }
  
  initPosts() {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data['posts'].filter(p => p['status'] !== 'sold' && p.createdBy.isBlocked === false).reverse();
      this.postsProcessed = this.posts;
      this.setPage(1);
    });
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.postsProcessed.length, page);
    this.pagedItems = this.postsProcessed.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  searchPosts(tes){
    if(tes !== '') {
      this.term = tes;
      this.postsProcessed = this.posts.filter(p => p.title.toLowerCase().includes(tes.toLowerCase()));
      this.setPage(1);

      this.router.navigate(
        [], 
        {
          relativeTo: this.route,
          queryParams: { search: this.term }, 
        }); 

      } else {
      this.postsProcessed = this.posts;
      this.setPage(1);

      this.router.navigate(
        [], 
        {
          relativeTo: this.route,
          queryParams: {}, 
        });
    }
  }

}
