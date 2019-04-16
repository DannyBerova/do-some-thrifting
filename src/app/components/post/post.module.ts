import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostAllComponent } from './post-all/post-all.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostDeleteComponent } from './post-delete/post-delete.component';
import { CardsFreeModule } from 'angular-bootstrap-md';
import { SinglePostResolver } from 'src/app/core/resolvers/post-details.resolver';
import { CommentModule } from '../comment/comment.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PostCreateComponent, 
    PostAllComponent, 
    PostDetailsComponent, 
    PostEditComponent, 
    PostDeleteComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PostRoutingModule,
    CardsFreeModule,
    CommentModule
  ],
  providers: [
    SinglePostResolver
  ]
})
export class PostModule { }
