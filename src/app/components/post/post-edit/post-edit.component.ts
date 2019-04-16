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
        console.log(this.form.value)
      });
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
    valueForm._id = this.id;
    console.log(valueForm)
    this.postService.editSinglePostById(this.id, valueForm)
    .subscribe((data) => {
      this.router.navigate([ `/post/details/${this.id}` ]);
    });
  }
}

