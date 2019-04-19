import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CardsFreeModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    CardsFreeModule,
     ReactiveFormsModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
