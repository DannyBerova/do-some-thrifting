import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IComment } from '../../shared/models/IComment';
import { CommentService } from 'src/app/core/services/comment.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {

  @Input() postId: string;
  @Input() postCreatorId: string;
  form: FormGroup = new FormGroup({});
  constructor(
    private authService: AuthService,
    private commentService: CommentService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { 
    this.form = this.fb.group({
      content: this.fb.control('', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(300)
      ]),
    });
  }

  ngOnInit() {
  }

  get content() {
    return this.form.get('content');
  }

  createComment() {

    const commentInfo: IComment = {
      createdBy: this.authService.getLoggedUserId(),
      creatorUsername: this.authService.getLoggedUserName(),
      createdOn: null,
      postCreatorId: this.postCreatorId,
      postId: this.postId,
      content: this.form.value.content,
    };
    console.log(commentInfo)
    
    this.commentService.createComment(commentInfo)
      .subscribe((comment) => {
        this.form.reset();
        this.toastr.success('You added a comment to this post!')
      });
  }

}
