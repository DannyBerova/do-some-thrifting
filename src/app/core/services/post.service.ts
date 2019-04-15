import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/components/shared/models/IPost';

const BASE_URL = 'https://do-some-thrifting-db.herokuapp.com/';
// const BASE_URL = 'https://localhost5000/';

const createP = 'post/create';
const getAllP = 'post/all';
const getMineP = 'post/mine'; //not implemented
const getDetails = 'post/details/';
const editDetails = 'post/edit/';
const deleteP = 'post/delete/';
const starUnstar = 'post/star';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  createPost(data) {
    return this.http.post(BASE_URL + createP, data);
  }

  getAllPosts(): Observable<Array<IPost>> {
    return this.http.get<Array<IPost>>(BASE_URL + getAllP);
  }

  getMinePosts(): Observable<Array<IPost>> {
    return this.http.get<Array<IPost>>(getMineP);
  }

  getSinglePostById(id: string): Observable<IPost> {
    return this.http.get<IPost>(BASE_URL + getDetails + id);
  }

  editSinglePostById(id: string, body: IPost): Observable<IPost> {
    return this.http.post<IPost>(BASE_URL + editDetails + id, body);
  }

  deletePost(id) {
    return this.http.delete( BASE_URL + deleteP + id);
  }

  starUnstarPost(postId) {
    return this.http.post(BASE_URL + starUnstar, postId);
  }
}
