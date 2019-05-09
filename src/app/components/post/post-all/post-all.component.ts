import { Component, OnInit } from '@angular/core';
import { IPost } from '../../shared/models/IPost';
import { ActivatedRoute, Router} from '@angular/router';

import { PostService } from 'src/app/core/services/post.service';
import { PagerService } from 'src/app/core/services/pager.service';
import { paths } from '../../../core/consts'

const ALL_CATEGORY = 'all'
const SOLD_STATUS = 'sold'
@Component ({
  selector: 'app-post-all',
  templateUrl: './post-all.component.html',
  styleUrls: ['./post-all.component.scss']
})
export class PostAllComponent implements OnInit {

  posts: Array<IPost>;
  postsProcessed: Array<IPost>;
  pagedItems: Array<IPost>;
  pager: any = {};
  term: string = '';
  categoryP: string = ALL_CATEGORY;
  isPostsInCat: boolean;
  // testPic: string[];

  constructor(
    private postService: PostService,
    private pagerService: PagerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
     //this.posts = this.route.snapshot.data['posts'];
    //  this.testPic=['HxPJDYYH/28756159', 'L83rfG8r/2149aw']
    this.route.data.subscribe( d => {
      this.posts = d['posts']
      this.postsProcessed = this.posts;
      this.isPostsInCat = this.postsProcessed.length > 0
      this.setPage(1);
    })
  }
  
  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.postsProcessed.length, page);
    this.pagedItems = this.postsProcessed.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.setRouterQueryParams(page);
  }
  
  setRouterQueryParams(page: number) {
    let queryParams = {};
    if(this.term !== '') {
      queryParams['search'] = this.term;
    } else if(this.categoryP !== ALL_CATEGORY) {
      queryParams['category'] = this.categoryP;
    }
    queryParams['page'] = page;
    this.route.queryParams.subscribe(r => {
      console.log(r)
      this.router.navigate(
        [], 
        {
           relativeTo: this.route,
          queryParams: queryParams, 
          fragment: paths.fragmentTop,
          preserveFragment: true,
        }); 
        window.location.hash = paths.fragmentTop;
      })
      
    }

  searchPosts(searchTerm: string){
    this.categoryP = ALL_CATEGORY;
    if(searchTerm !== '') {
      this.term = searchTerm;
      this.postsProcessed = this.posts
        .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
      this.isPostsInCat = this.postsProcessed.length > 0
    } else {
      this.postsProcessed = this.posts;
      this.term = '';
    }
    this.setPage(1);
  }

  filter(category: string) {
    this.categoryP = category;
    this.term = '';
    if (category !== ALL_CATEGORY) {
      this.postsProcessed = this.posts
        .filter(p => p.category === this.categoryP)
      this.isPostsInCat = this.postsProcessed.length > 0
    } else {
      this.postsProcessed = this.posts;
      this.isPostsInCat = this.postsProcessed.length > 0
    }
    this.setPage(1);
  }
}

