import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = 'http://do-some-thrifting-db.herokuapp.com/auth/login';
  private readonly registerUrl = 'http://do-some-thrifting-db.herokuapp.com/auth/register';

  constructor(
    private http: HttpClient
  ) {  }

  register(body) {
    return this.http.post(this.registerUrl, body);
  }

  login(body) {
    return this.http.post(this.loginUrl, body);
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
  }

  getJwtToken() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }
}
