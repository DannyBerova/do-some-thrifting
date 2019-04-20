import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import {messages, paths, regexPatterns} from '../../../core/consts'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    this.form = this.fb.group({
      username: this.fb.control('', [
        Validators.required, 
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern(regexPatterns.username),
      ]),
      password: this.fb.control(''),
      confirmPassword: this.fb.control(''),
      firstName: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(regexPatterns.name),
      ]),
      lastName: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(regexPatterns.name),
      ]),
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern(regexPatterns.phoneNumber),
      ]),
      phoneNumber: this.fb.control('', [
        Validators.required,
        Validators.pattern(regexPatterns.phoneNumber),
      ]),
      avatar: this.fb.control('', [
        Validators.pattern(regexPatterns.imageUrl)
      ]),
    });

    const password = this.form.get('password');
    const confirmPassword = this.form.get('confirmPassword');

    password.setValidators([
      Validators.required, 
      Validators.minLength(6),
      Validators.maxLength(20),
    ]);
    confirmPassword.setValidators([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]);
  }

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get email() { return this.form.get('email'); }
  get phoneNumber() { return this.form.get('phoneNumber'); }
  get avatar() { return this.form.get('avatar'); }

  get usernameErrorMessage() { return messages.errors.userUsername }
  get passwordErrorMessage() { return messages.errors.userPassword }
  get confirmPasswordErrorMessage() { return messages.errors.userConfirmPass }
  get firstNameErrorMessage() { return messages.errors.userFirstName }
  get lastNameErrorMessage() { return messages.errors.userLastName }
  get emailErrorMessage() { return messages.errors.userEmail }
  get phoneNumberErrorMessage() { return messages.errors.userPhoneNumber }
  get avatarErrorMessage() { return messages.errors.userAvatar }

  onSubmitHandler() {
    const {confirmPassword, ...userModel} = this.form.value;
    this.authService.register(this.form.value)
    .subscribe((data) => {
      localStorage.setItem('token', data['token']);
      localStorage.setItem('user', data['username']);
      localStorage.setItem('userId', data['userId']);
      localStorage.setItem('isAdmin', data['isAdmin']);
      localStorage.setItem('isBlocked', data['isBlocked']);
      this.router.navigate([paths.home]);
    });
  }
}
