import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: any;
  constructor(
    private http: HttpClient,
  ) {

    this.http.get('https://do-some-thrifting-db.herokuapp.com/category/').subscribe(data => {
    this.categories = data;
    console.log('data', data);
    console.log(this.categories);
    });
   }

  ngOnInit() {
  }

}
