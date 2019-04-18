import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CardsFreeModule } from 'angular-bootstrap-md';

import { CardInfoComponent } from './card-info/card-info.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    CardInfoComponent,
    SearchComponent
],
  imports: [
    CommonModule,
     RouterModule,
     CardsFreeModule,
     ReactiveFormsModule

  ],
  exports: [
    CardInfoComponent,
    SearchComponent
  ]
})
export class SharedModule { }