import { Component, OnInit, EventEmitter, Output, Input, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input()term: string;
  @Output('onSearch') searchEmitter = new EventEmitter();
  isTerm: boolean;
  
  form: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
  ) { 
    this.form = this.fb.group({
      content: this.fb.control('', [
        Validators.required, 
        Validators.minLength(1), 
        Validators.maxLength(30)
      ]),
    });
  }

  get content() {
    return this.form.get('content');
  }

  search() {
    let content = this.form.value.content
    if (this.form.invalid || this.content.invalid) {
      content = ''
    }
      this.term = '';
      this.isTerm = this.term !== '';
      this.searchEmitter.emit(content);
       this.form.reset();
  }

}
