import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsFreeModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';
import { PostRoutingModule } from './post-routing.module';

import { CommentModule } from '../comment/comment.module';
import { SharedModule } from '../shared/shared.module';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostAllComponent } from './post-all/post-all.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostDeleteComponent } from './post-delete/post-delete.component';
import { SinglePostResolver } from 'src/app/core/resolvers/post-details.resolver';


@NgModule({
  declarations: [
    PostCreateComponent, 
    PostAllComponent, 
    PostDetailsComponent, 
    PostEditComponent, 
    PostDeleteComponent,
  ],
  imports: [
    PostRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    CardsFreeModule,
    SharedModule,
    CommentModule
  ],
  providers: [
    SinglePostResolver
  ]
})
export class PostModule { }
