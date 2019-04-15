import { Component, OnInit } from '@angular/core';
import { IPost } from '../../shared/models/IPost';
import { PostService } from 'src/app/core/services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post: IPost;
  id: string;
  isCreator: boolean;
  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { 
    this.route.params.subscribe( data => {
      this.id = data['id'];
      this.postService.getSinglePostById(this.id).subscribe(res => {
        const result = res['post'];
        this.post = result;
        const username = this.authService.getLoggedUserName();
        this.isCreator = username === this.post.createdBy['username'];
      });
    });
  }

  ngOnInit() {
  }

}
