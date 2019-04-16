import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IComment } from 'src/app/components/shared/models/IComment';
import { Observable } from 'rxjs';

const BASE_URL = 'https://do-some-thrifting-db.herokuapp.com/';

const createC = 'comment/create';
const getAllByPost = 'comment/allByPost/';
const deleteC = 'comment/remove/';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(data) {
    return this.http.post(BASE_URL + createC, data);
  }

  getAllCommentsByPostId(id: string): Observable<Array<IComment>> {
    return this.http.get<Array<IComment>>(BASE_URL + getAllByPost + id);
  }

  deleteComment(id: string, creator: string) {
    console.log('creator:', creator)
    return this.http.delete( (BASE_URL + deleteC + id + '/' + creator));
  }

}
