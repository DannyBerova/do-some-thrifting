import { Component, Input } from '@angular/core';
import { IPost } from '../../shared/models/IPost';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent{
  @Input() post: IPost;
  username: string;
  constructor(
    private authService: AuthService
  ) {
    this.username = this.authService.getLoggedUserName();
  }
}
