import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-category',
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.scss']
})
export class FilterCategoryComponent implements OnInit {

  @Input()cat: string;
  @Output('onFilter') filterEmitter = new EventEmitter();
  isTerm: boolean;
  categoryNames: String[] = ['clothes', 'toys', 'shoes', 'home', 'outdoor', 'accessories', 'books', 'other'];
  activeAll: string = 'active';
  activeClothes: string;
  activeToys: string;
  activeShoes: string;
  activeHome: string;
  activeOutdoor: string;
  activeAccess: string;
  activeBooks: string;
  activeOther: string;
  constructor() { }

  ngOnInit() {
  }

  filter(category: string) {
    this.initActive(category)
    if (this.categoryNames.includes(category) || category === 'all') {
      this.filterEmitter.emit(category);
    }
  }

  initActive(cat: string) {
    const active = 'active';
    const unactive = '';
    this.activeAll = cat === 'all' ? active : unactive;
    this.activeClothes = cat === 'clothes' ? active : unactive;
    this.activeToys = cat === 'toys' ? active : unactive;
    this.activeShoes = cat === 'shoes' ? active : unactive;
    this.activeHome = cat === 'home' ? active : unactive;
    this.activeOutdoor = cat === 'outdoor' ? active : unactive;
    this.activeAccess = cat === 'accessories' ? active : unactive;
    this.activeBooks = cat === 'books' ? active : unactive;
    this.activeOther = cat === 'other' ? active : unactive;
  }

}
