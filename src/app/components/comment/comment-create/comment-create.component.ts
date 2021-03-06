import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IComment } from '../../shared/models/IComment';
import { CommentService } from 'src/app/core/services/comment.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { messages } from '../../../core/consts';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {

  @Input() postId: string;
  @Input() postCreatorId: string;
  @Output('onCreateComment') commentEmitter = new EventEmitter<void>();
  
  form: FormGroup = new FormGroup({});
  constructor(
    private authService: AuthService,
    private commentService: CommentService,
    private toastr: ToastrService,
    private fb: FormBuilder,
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
    
    this.commentService.createComment(commentInfo)
      .subscribe((comment) => {
        this.toastr.success(messages.success, messages.addComment);
        this.form.reset();
        this.commentEmitter.emit();
      });
  }

}
