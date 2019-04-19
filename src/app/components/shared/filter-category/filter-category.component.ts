import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-category',
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.scss']
})
export class FilterCategoryComponent {

  @Input()cat: string;
  @Input()search: string;
  @Output('onFilter') filterEmitter = new EventEmitter();
  isTerm: boolean;
  categoryNames: String[] = ['clothes', 'toys', 'shoes', 'home', 'outdoor', 'accessories', 'books', 'other'];

  filter(category: string) {
    if (this.categoryNames.includes(category) || category === 'all') {
      this.filterEmitter.emit(category);
    }
  }
}
