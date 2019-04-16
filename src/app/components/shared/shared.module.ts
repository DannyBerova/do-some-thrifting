import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardInfoComponent } from './card-info/card-info.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CardInfoComponent  
],
  imports: [
    CommonModule,
     RouterModule
  ],
  exports: [
    CardInfoComponent
  ]
})
export class SharedModule { }