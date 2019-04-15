import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private phoneNumberPattern = /^\d{9,}$/;
  private usernamePattern = /^[A-Za-z0-9._]+$/;
  private namePattern = /^[A-Z][a-z]+$/;

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
        Validators.maxLength(20),
        Validators.pattern(this.usernamePattern),
      ]),
      password: this.fb.control(''),
      confirmPassword: this.fb.control(''),
      firstName: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(14),
        Validators.pattern(this.namePattern),
      ]),
      lastName: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(14),
        Validators.pattern(this.namePattern),
      ]),
      email: this.fb.control('', [
        Validators.required,
        Validators.email
      ]),
      phoneNumber: this.fb.control('', [
        Validators.required,
        Validators.pattern(this.phoneNumberPattern),
      ]),
      avatar: this.fb.control('', [
        Validators.required,
      ]),
    });

    const password = this.form.get('password');
    const confirmPassword = this.form.get('confirmPassword');

    password.setValidators([
      Validators.required, 
      Validators.minLength(6),
      Validators.maxLength(20),
      // passwordValidator(confirmPassword)
    ]);
    confirmPassword.setValidators([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      // passwordValidator(password)
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

  // get usernameErrorMessage() { return this.errorService.standartErrorMessage('Username', this.username.errors); }
  // get passwordErrorMessage() { return this.errorService.passwordErrorMessage(this.password.errors); }
  // get confirmPasswordErrorMessage() { return this.errorService.passwordErrorMessage(this.confirmPassword.errors, 'Confirm password'); }
  // get firstNameErrorMessage() { return this.errorService.nameErrorMessage('First name', this.firstName.errors); }
  // get lastNameErrorMessage() { return this.errorService.nameErrorMessage('Last name', this.lastName.errors); }
  // get emailErrorMessage() { return this.errorService.standartErrorMessage('Email', this.email.errors); }
  // get phoneNumberErrorMessage() { return this.errorService.phoneNumberErrorMessage('Phone number', this.phoneNumber.errors); }

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
