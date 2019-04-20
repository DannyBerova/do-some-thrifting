import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { dbConsts } from '../../../core/consts'

const ALL_CATEGORY = 'all'
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
  categoryNames: String[] = dbConsts.categoryArray; //out in const

  filter(category: string) {
    if (this.categoryNames.includes(category) || category === ALL_CATEGORY) {
      this.filterEmitter.emit(category);
    }
  }
}
