import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Constants } from '../shared/utils/constants';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _postUrl = `${Constants.SERVER_URL}/posts`;

  constructor(private http: HttpClient) {}

  /**
   * Returns all the posts for a given user id as an Observable<Post[]>
   * @param id => the user id
   */
  public getPostsForUser(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this._postUrl}/user/${id}`);
  }

  /**
   * Returns all the posts by a given user id as an Observable<Post[]>
   * @param id => the user id
   */
  public getPostsByUser(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this._postUrl}/user/posted/${id}`);
  }

  /**
   * Creates a new post
   * @param post => the post to be added
   */
  public createPost(post: Post) {
    return this.http.post<Post>(`${this._postUrl}`, post);
  }

  /**
   * Like a post
   * @param postId => the id of the post
   * @param userId => the id of the user
   *
   */
  public likePost(postId: number, userId: number) {
    return this.http.post<number>(
      `${this._postUrl}/like/${postId}/${userId}`,
      {}
    );
  }

  /**
   * Will return all the post filtered by a certain game id as an Observable<Post[]>
   * @param id => the game id
   */
  public getPostsForGame(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this._postUrl}/game/${id}`);
  }

  /**
   * Will return all the post filtered by a certain publisher id as an Observable<Post[]>
   * @param id => the publisher id
   */
  public getPostsForPublisher(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this._postUrl}/publisher/${id}`);
  }
}
