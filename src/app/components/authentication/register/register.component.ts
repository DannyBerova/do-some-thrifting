import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private phoneNumberPattern = '^[0-9]{9,20}$';
  private usernamePattern = /^[A-Za-z0-9._]+$/;
  private namePattern = /^[A-Z][a-z]+$/;
  private emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  private urlPattern = '^https:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|gif|png)$'

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
        Validators.pattern(this.usernamePattern),
      ]),
      password: this.fb.control(''),
      confirmPassword: this.fb.control(''),
      firstName: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(this.namePattern),
      ]),
      lastName: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(this.namePattern),
      ]),
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      phoneNumber: this.fb.control('', [
        Validators.required,
        Validators.pattern(this.phoneNumberPattern),
      ]),
      avatar: this.fb.control('', [
        Validators.pattern(this.urlPattern)
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

  get usernameErrorMessage() { return 'Username must be between 5 and 30 symbols - latin letters, numbers and underscores.' }
  get passwordErrorMessage() { return 'Password must be between 6 and 30 symbols' }
  get confirmPasswordErrorMessage() { return 'Passwords must match.' }
  get firstNameErrorMessage() { return 'First Name must be between 2 and 30 symbols - Only latin letters starting with capital letter' }
  get lastNameErrorMessage() { return 'Last Name must be between 2 and 30 symbols - Only latin letters starting with capital letter' }
  get emailErrorMessage() { return 'Provide valid email structure.' }
  get phoneNumberErrorMessage() { return 'Phone number must be between 9 and 20 symbols, numbers only.' }
  get avatarErrorMessage() { return 'Provide valid url structure - starts with https:// and ends with .jpg, .png or .gif' }

  onSubmitHandler() {
    const {confirmPassword, ...userModel} = this.form.value;
    this.authService.register(this.form.value)
    .subscribe((data) => {
      localStorage.setItem('token', data['token']);
      localStorage.setItem('user', data['username']);
      localStorage.setItem('userId', data['userId']);
      localStorage.setItem('isAdmin', data['isAdmin']);
      localStorage.setItem('isBlocked', data['isBlocked']);
      this.router.navigate([ '/home' ]);
    });
  }
}
