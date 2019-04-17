import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../../shared/models/IPost';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-post-all',
  templateUrl: './post-all.component.html',
  styleUrls: ['./post-all.component.scss']
})
export class PostAllComponent implements OnInit {

  posts: Array<IPost>;
  constructor(
    private postService: PostService
  ) { 
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data['posts'].filter(p => p['status'] !== 'sold' && p.createdBy.isBlocked === false);
    });
  }

  ngOnInit() {
  }

}
