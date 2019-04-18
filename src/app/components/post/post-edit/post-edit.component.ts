import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';
import { ToastrService } from 'ngx-toastr';
import { IPost } from '../../shared/models/IPost';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent {

  private titlePatern = /^[\w\s]{3,50}$/;
  private contentPatern = /^[\w\s]{10,420}$/;
  private defaultPicture = "https://www.union.edu/files/union-marketing-layer/201803/picture.jpg";

  id: string;
  post: IPost
  form: FormGroup = new FormGroup({});
  categories:Array<string> = ['other', 'toys', 'shoes', 'home', 'outdoor', 'accessories', 'books', 'clothes'];

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
        // Validators.required, 
        Validators.pattern('^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|gif|png)$')
      ]),
      category: this.fb.control('other', [
        Validators.required,
      ]),
      createdOn: this.fb.control(''),
      createdBy: this.fb.control(''),
    });

    this.route.params.subscribe( data => {
      this.id = data['id'];
      this.postService.getSinglePostById(this.id).subscribe(res => {
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

  get titleErrorMessage() { return 'Title must be between 3 and 50 symbols.' }
  get contentErrorMessage() { return 'Content must be between 10 and 420 symbols.' }
  get priceErrorMessage() { return 'Price must be positive number between 0 and 2000' }
  get urlErrorMessage() { return 'Provide valid url structure - starts with https:// and ends with .jpg, .png or .gif' }
  get categoryErrorMessage() { return 'Choose valid category.' }

  onSubmitHandler() {
    const valueForm = this.form.value;
    const img = this.form.value.images !== '' ? this.form.value.images : this.defaultPicture;
    valueForm.images = [img];
    valueForm._id = this.id;
    this.postService.editSinglePostById(this.id, valueForm)
    .subscribe((data) => {
      this.toastr.success('Success', 'Post edited successfully.')
      this.router.navigate([ `/post/details/${this.id}` ]);
    });
  }
}

