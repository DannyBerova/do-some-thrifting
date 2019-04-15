import { OnInit, Component, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements DoCheck {
  categories: any;
  username: string;
  constructor(
    private http: HttpClient,
  ) {
    this.username = localStorage.getItem('user') || '';
  }


  ngDoCheck() {
    this.username = localStorage.getItem('user') || '';
  }

}
