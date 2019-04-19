import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {

  private defaultPicture = "https://www.union.edu/files/union-marketing-layer/201803/picture.jpg";

  form: FormGroup = new FormGroup({});
  categories:Array<string> = ['other', 'toys', 'shoes', 'home', 'outdoor', 'accessories', 'books', 'clothes'];

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
        Validators.min(0),
        Validators.max(2000),
      ]),
      images: this.fb.control('', [
        Validators.pattern('^https:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|gif|png)$')
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

  get titleErrorMessage() { return 'Title must be between 3 and 50 symbols.' }
  get contentErrorMessage() { return 'Content must be between 10 and 420 symbols.' }
  get priceErrorMessage() { return 'Price must be positive number between 0 and 2000' }
  get urlErrorMessage() { return 'Provide valid url structure - starts with https:// and ends with .jpg, .png or .gif' }
  get categoryErrorMessage() { return 'Choose valid category.' }

  onSubmitHandler() {
    const valueForm = this.form.value;
    const img = this.form.value.images !== '' ? this.form.value.images : this.defaultPicture;
    valueForm.images = [img];
    this.postService.createPost(valueForm)
    .subscribe((data) => {
      this.router.navigate([ `/post/details/${data['data']['_id']}` ]);
    });
  }
}

