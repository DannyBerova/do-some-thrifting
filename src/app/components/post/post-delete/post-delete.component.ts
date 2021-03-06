import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PostService } from 'src/app/core/services/post.service';
import { paths } from '../../../core/consts'
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.scss']
})
export class PostDeleteComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private postService: PostService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( params => {
      this.id = params.get('id');
      this.name = params.get('name');
    })
  }

  deletePost() {
    const creator = this.authService.getLoggedUserId();
    this.postService.deletePost(this.id, creator)
      .subscribe(data => {
        this.router.navigate([paths.allPost]);
    })
  }

}
