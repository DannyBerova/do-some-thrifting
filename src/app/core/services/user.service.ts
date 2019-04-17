import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegisterUser } from 'src/app/components/shared/models/IRegisterUser';

const BASE_URL = 'https://do-some-thrifting-db.herokuapp.com/';

const getAllUsers = 'user/all';
const getDetails = 'user/details/';
const destroyUser = 'user/destroy/';
const blockUnblock = 'user/block/';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  
  getAllUsers(): Observable<Array<IRegisterUser>> {
    return this.http.get<Array<IRegisterUser>>(BASE_URL + getAllUsers);
  }

  getSingleUserById(id: string): Observable<IRegisterUser> {
    return this.http.get<IRegisterUser>(BASE_URL + getDetails + id);
  }

  destroyUser(id: string) {
    return this.http.delete( BASE_URL + destroyUser + id);
  }

  blockUnblockUser(userId) {
    return this.http.post(BASE_URL + blockUnblock + userId, {});
  }
}
