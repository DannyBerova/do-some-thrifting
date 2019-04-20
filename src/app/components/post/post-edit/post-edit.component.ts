import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/core/services/post.service';
import { IPost } from '../../shared/models/IPost';
import{ dbConsts, messages, paths ,regexPatterns } from '../../../core/consts'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit, OnDestroy{

  private defaultPicture = dbConsts.defaultPicture;

  id: string;
  post: IPost
  form: FormGroup = new FormGroup({});
  categories:Array<string> = dbConsts.categoryArray;
  getPostSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private toastr: ToastrService,
  ) {
    this.form = this.fb.group({
      title: this.fb.control('', [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      content: this.fb.control('', [
        Validators.required, 
        Validators.minLength(10),
        Validators.maxLength(420),
      ]),
      price: this.fb.control('', [
        Validators.required,
        Validators.min(0),
        Validators.max(2000),
      ]),
      images: this.fb.control('', [
        Validators.pattern(regexPatterns.imageUrl)
      ]),
      category: this.fb.control('other', [
        Validators.required,
      ]),
      createdOn: this.fb.control(''),
      createdBy: this.fb.control(''),
    });
  }

  ngOnInit() {
    this.route.params.subscribe( data => {
      this.id = data.id;
      this.getPostSub = this.postService.getSinglePostById(this.id).subscribe(res => {
        const result = res['post'];
        this.form.setValue({
          title: result.title,
          content: result.content,
          price: result.price,
          images: result.images[0],
          category: result.category,
          createdBy: result.createdBy.username,
          createdOn: result.createdOn,
        });
      });
    });
  }

  get title() { return this.form.get('title'); }
  get content() { return this.form.get('content'); }
  get price() { return this.form.get('price'); }
  get images() { return this.form.get('images'); }
  get category() { return this.form.get('category'); }

  get titleErrorMessage() { return messages.errors.postTitle }
  get contentErrorMessage() { return messages.errors.postContent }
  get priceErrorMessage() { return messages.errors.postPricee }
  get urlErrorMessage() { return messages.errors.postUrl }
  get categoryErrorMessage() { return messages.errors.postCategory }

  onSubmitHandler() {
    const valueForm = this.form.value;
    const img = this.form.value.images !== '' ? this.form.value.images : this.defaultPicture;
    valueForm.images = [img];
    valueForm._id = this.id;
    this.postService.editSinglePostById(this.id, valueForm)
      .subscribe((data) => {
        this.router.navigate([ paths.dettailsPost + this.id ]);
    });
  }
  ngOnDestroy() {
    this.getPostSub.unsubscribe();
  }
}

