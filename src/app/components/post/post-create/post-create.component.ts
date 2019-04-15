import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {

  private titlePatern = /^[\w\s]{3,50}$/;
  private contentPatern = /^[\w\s]{10,420}$/;
  private defaultPicture = "https://www.union.edu/files/union-marketing-layer/201803/picture.jpg";

  form: FormGroup = new FormGroup({});
  categories:Array<string> = ['clothes', 'toys', 'shoes', 'home', 'outdoor', 'accessories', 'books', 'other'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private postService: PostService,
    private toastr: ToastrService,
  ) {
    this.form = this.fb.group({
      title: this.fb.control('', [
        Validators.required, 
        Validators.pattern(this.titlePatern),
      ]),
      content: this.fb.control('', [
        Validators.required, 
        Validators.pattern(this.contentPatern),
      ]),
      price: this.fb.control('', [
        Validators.required,
        Validators.min(0),
        Validators.max(2000),
      ]),
      images: this.fb.control('', [
        // Validators.required, 
        Validators.pattern('^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|gif|png)$')
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

  onSubmitHandler() {
    const valueForm = this.form.value;
    const img = this.form.value.images !== '' ? this.form.value.images : this.defaultPicture;
    valueForm.images = [img];
    console.log(valueForm)
    this.postService.createPost(valueForm)
    .subscribe((data) => {
      this.router.navigate([ '/post/all' ]);
    });
  }
}

