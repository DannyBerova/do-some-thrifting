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
export class PostDetailsComponent {

  post: IPost
  id: string;
  isAdmin: boolean;
  isCreator: boolean;
  username: string;
  isCreatorOrAdmin: boolean;
  isCommentCreatorOrAdmin: boolean;
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
    this.username = username;
    const isAdmin = this.authService.isAdmin();
    this.isAdmin = isAdmin;
    this.isCreator = username === this.post.createdBy['username'];
    this.isCreatorOrAdmin = this.isCreator || isAdmin;
    this.loadComments();
  }


  loadComments() {
    this.commentService.getAllCommentsByPostId(this.post._id).subscribe( res => {
      this.comments = res['comments'].reverse();
      console.log(this.comments)
    })
  }

  deleteComment(id: string) {
    const creator = this.authService.getLoggedUserId();
    console.log(creator)
    this.commentService.deleteComment(id, creator)
      .subscribe(() => {
        this.loadComments();
      })
  }
}

