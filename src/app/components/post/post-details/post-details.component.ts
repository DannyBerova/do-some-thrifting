import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IPost } from '../../shared/models/IPost';
import { IComment } from '../../shared/models/IComment';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostService } from 'src/app/core/services/post.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { ToastrService } from 'ngx-toastr';
import { messages } from '../../../core/consts'

const FAS_ICON = 'fas';
const FAR_ICON = 'far';
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit{
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
    private route: ActivatedRoute,
    private authService: AuthService,
    private postService: PostService,
    private commentService: CommentService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.post = this.route.snapshot.data['res']['post']['post'];
    this.comments = this.route.snapshot.data['res']['comments']['comments'].reverse();

    this.username = this.authService.getLoggedUserName();
    this.isAdmin = this.authService.isAdmin();
    this.isCreator = this.username === this.post.createdBy['username'];
    this.isCreatorOrAdmin = this.isCreator || this.isAdmin;
    this.starsCount = this.post['stars'].length;
    this.isLiked = this.route.snapshot.data['res']['post']['post']['stars'].includes(this.authService.getLoggedUserId());
    this.thumb = this.isLiked ? FAS_ICON : FAR_ICON
    this.testForm = new FormGroup({
      testSelect: new FormControl(this.post['status'])
   });
  }

  loadComments() {
    this.commentService.getAllCommentsByPostId(this.post._id).subscribe( res => {
      this.comments = res['comments'].reverse();
    })
  }

  starUnstar() {
    this.postService.starUnstarPost(this.post._id).subscribe(res => {
      this.toastr.success(messages.success, res['message']);
      this.starsCount = res['starsCount'];
     
      this.isLiked = res['stars'].includes(this.authService.getLoggedUserId());
      this.thumb = this.isLiked ? FAS_ICON : FAR_ICON
    })
  }

  changeStatus() {
    const data = {
      status: this.testForm.value.testSelect,
      createdBy: this.post.createdBy['username']
    }
    this.postService.changeStatus(this.post._id, data).subscribe(res => {
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

