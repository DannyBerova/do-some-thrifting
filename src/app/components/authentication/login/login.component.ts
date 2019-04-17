import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    // private errorService: ErrorMessageService,
    private toastr: ToastrService,
    ) {
    this.form = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    });
  }

  ngOnInit() {}

  get username() { return this.form.get('username'); }

  get password() { return this.form.get('password'); }

  get usernameErrorMessage(): string {
    return 'Invalid credentials';
  }

  get passwordErrorMessage(): string {
    return 'Invalid credentials';
  }

  onSubmitHandler() {
    this.authService.login(this.form.value)
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
