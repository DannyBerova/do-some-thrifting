import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

import { IRegisterUser } from 'src/app/components/shared/models/IRegisterUser';
import {api} from '../consts'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  
  getAllUsers(): Observable<Array<IRegisterUser>> {
    return this.http.get<Array<IRegisterUser>>(api.base + api.user.all);
  }

  getSingleUserById(id: string): Observable<IRegisterUser> {
    return this.http.get<IRegisterUser>(api.base + api.user.details + id);
  }

  destroyUser(id: string) {
    return this.http.delete( api.base + api.user.destroy + id);
  }

  blockUnblockUser(userId) {
    return this.http.post(api.base + api.user.blockUnblock + userId, {});
  }
}
