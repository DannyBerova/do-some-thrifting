import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { IPost } from '../../shared/models/IPost';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { IComment } from '../../shared/models/IComment';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/core/services/post.service';
import { toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  testForm: FormGroup;
  isLiked: boolean;
  thumb: string;
  starsCount: number;

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { 
    this.post = this.route.snapshot.data['post']['post'];
    this.starsCount = this.post['stars'].length;
    this.isLiked = this.post['stars'].indexOf(this.post._id) != -1;
    const username = this.authService.getLoggedUserName();
    this.username = username;
    const isAdmin = this.authService.isAdmin();
    this.isAdmin = isAdmin;
    this.isCreator = username === this.post.createdBy['username'];
    this.isCreatorOrAdmin = this.isCreator || isAdmin;
    console.log(this.route.snapshot.data['post']['post']['stars'])
    this.isLiked = this.route.snapshot.data['post']['post']['stars'].includes(this.authService.getLoggedUserId());
    this.thumb = this.isLiked ? 'fas' : 'far'
    this.loadComments();
    this.testForm = new FormGroup({
      testSelect: new FormControl(this.post['status'])
   });
  }


  loadComments() {
    this.commentService.getAllCommentsByPostId(this.post._id).subscribe( res => {
      this.comments = res['comments'].reverse();
    })
    // this.comments = this.commentService.getAllCommentsByPostId(this.post._id);
  }

  starUnstar() {
    this.postService.starUnstarPost(this.post._id).subscribe(res => {
      this.toastr.success('Success', res['message']);
      this.starsCount = res['starsCount'];
     
      this.isLiked = res['stars'].includes(this.authService.getLoggedUserId());
      this.thumb = this.isLiked ? 'fas' : 'far'
    })
  }

  changeStatus() {
    const data = {
      status: this.testForm.value.testSelect,
      createdBy: this.post.createdBy['username']
    }
    this.postService.changeStatus(this.post._id, data).subscribe(res => {
      console.log(this.post['status'])
      this.post['status'] = this.testForm.value.testSelect;
      this.toastr.success(res['message'])
      this.loadComments()
    })
  }

  deleteComment(id: string) {
    const creator = this.authService.getLoggedUserId();
    this.commentService.deleteComment(id, creator)
      .subscribe(() => {
        this.loadComments();
      })
  }
}

