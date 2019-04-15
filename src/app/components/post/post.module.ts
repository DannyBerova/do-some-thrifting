import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostAllComponent } from './post-all/post-all.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostMineComponent } from './post-mine/post-mine.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PostCardComponent } from './post-card/post-card.component';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    PostCreateComponent, 
    PostAllComponent, 
    PostDetailsComponent, 
    PostEditComponent, 
    PostMineComponent, PostCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    PostRoutingModule,
    // MDBBootstrapModule.forRoot()
  ]
})
export class PostModule { }
