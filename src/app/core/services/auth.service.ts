import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {api, storageState} from '../consts'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) {  }

  register(body) {
    console.log(api.base + api.auth.register)
    return this.http.post(api.base + api.auth.register, body);
  }

  login(body) {
    return this.http.post(api.base + api.auth.login, body);
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    return localStorage.getItem(storageState.token) !== null;
  }

  getLoggedUserName() {
    return localStorage.getItem(storageState.user);
  }

  getLoggedUserId() {
    return localStorage.getItem(storageState.userId);
  }

  isAdmin() {
    return localStorage.getItem(storageState.isAdmin) === 'true';
  }

  isBlocked() {
    return localStorage.getItem(storageState.isBlocked) === 'true';
  }

  getJwtToken() {
    return localStorage.getItem(storageState.token) ? localStorage.getItem(storageState.token) : '';
  }
}
