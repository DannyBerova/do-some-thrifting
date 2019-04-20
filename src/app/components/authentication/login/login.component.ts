import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { messages, paths, storageState} from '../../../core/consts'


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
    return messages.errors.userLogin;
  }

  get passwordErrorMessage(): string {
    return messages.errors.userLogin;
  }

  onSubmitHandler() {
    this.authService.login(this.form.value)
    .subscribe((data) => {
      localStorage.setItem( storageState.token, data['token']);
      localStorage.setItem( storageState.user, data['username']);
      localStorage.setItem( storageState.userId, data['userId']);
      localStorage.setItem( storageState.isAdmin, data['isAdmin']);
      localStorage.setItem( storageState.isBlocked, data['isBlocked']);
      this.router.navigate([paths.home]);
    });
  }
}
