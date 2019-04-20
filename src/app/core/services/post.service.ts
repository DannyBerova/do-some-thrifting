import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { IPost } from 'src/app/components/shared/models/IPost';
import {api} from '../consts'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  createPost(data) {
    return this.http.post(api.base + api.post.create, data);
  }

  getAllPosts(): Observable<Array<IPost>> {
    return this.http.get<Array<IPost>>(api.base + api.post.all);
  }

  getSinglePostById(id: string): Observable<IPost> {
    return this.http.get<IPost>(api.base + api.post.details + id);
  }

  editSinglePostById(id: string, body: IPost): Observable<IPost> {
    return this.http.post<IPost>(api.base + api.post.edit + id, body);
  }

  deletePost(id: string, creator: string) {
    return this.http.delete( api.base + api.post.remove + id + '/' + creator);
  }

  starUnstarPost(postId) {
    return this.http.post(api.base + api.post.starUnstar + postId, {});
  }

  changeStatus(postId, data) {
    return this.http.post(api.base + api.post.status + postId, data);
  }
}
