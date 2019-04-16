import { Component, OnInit, Input } from '@angular/core';
import { IPost } from '../models/IPost';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent{

  @Input() post: IPost;
  username: string;
  constructor(
    private authService: AuthService
  ) {
    this.username = this.authService.getLoggedUserName();
  }
}
