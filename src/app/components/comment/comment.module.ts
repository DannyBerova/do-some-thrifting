import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CardsFreeModule} from "angular-bootstrap-md"

import { CommentCreateComponent } from './comment-create/comment-create.component';

@NgModule({
  declarations: [CommentCreateComponent],
  imports: [
    CommonModule,
    CardsFreeModule,
    ReactiveFormsModule
  ],
  exports: [
    CommentCreateComponent,
  ]
})
export class CommentModule { }
