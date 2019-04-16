import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { IPost } from '../../shared/models/IPost';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { IComment } from '../../shared/models/IComment';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnChanges {

  post: IPost
  id: string;
  isCreator: boolean;
  isCreatorOrAdmin: boolean;
  comments: IComment[];
  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { 
    this.post = this.route.snapshot.data['post']['post'];
    const username = this.authService.getLoggedUserName();
    const isAdmin = this.authService.isAdmin();
    this.isCreator = username === this.post.createdBy['username'];
    this.isCreatorOrAdmin = this.isCreator || isAdmin;
    this.commentService.getAllCommentsByPostId(this.post._id).subscribe( res => {
      this.comments = res['comments']
      console.log(this.comments)
    })
  }

  ngOnChanges() {
    this.commentService.getAllCommentsByPostId(this.post._id).subscribe( res => {
      this.comments = res['comments']
      console.log(this.comments)
    })
  }
}

