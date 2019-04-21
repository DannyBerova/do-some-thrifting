import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';
import {dbConsts, messages, paths, regexPatterns} from '../../../core/consts'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {

  private defaultPicture = dbConsts.defaultPicture;

  form: FormGroup = new FormGroup({});
  categories:Array<string> = dbConsts.categoryArray;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private postService: PostService,
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
        Validators.min(1),
        Validators.max(2000),
      ]),
      images: this.fb.control('', [
        Validators.pattern(regexPatterns.imageUrl)
      ]),
      category: this.fb.control('other', [
        Validators.required,
      ]),
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
    this.postService.createPost(valueForm)
    .subscribe((data) => {
      this.router.navigate([ paths.dettailsPost + data['data']['_id']]);
    });
  }
}

