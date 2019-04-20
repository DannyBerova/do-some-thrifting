import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment } from 'src/app/components/shared/models/IComment';
import {api} from '../consts'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(data) {
    return this.http.post(api.base + api.comment.create, data);
  }

  getAllCommentsByPostId(id: string): Observable<Array<IComment>> {
    return this.http.get<Array<IComment>>(api.base + api.comment.allByPost + id);
  }

  deleteComment(id: string, creator: string) {
    return this.http.delete( (api.base + api.comment.remove + id + '/' + creator));
  }

}
