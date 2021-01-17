import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Constants } from '../shared/utils/constants';
import { Post } from '../models/post';
import { Comment } from '../models/comment';

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
  public getPostsByUser(id: number, feedUserId: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${this._postUrl}/user/posted/${id}/${feedUserId}`
    );
  }

  /**
   * Creates a new post
   * @param post => the post to be added
   */
  public createPost(formData: any): Observable<Post> {
    return this.http.post<Post>(`${this._postUrl}`, formData);
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
  public getPostsForGame(id: number, userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this._postUrl}/game/${id}/${userId}`);
  }

  /**
   * Will return all the post filtered by a certain publisher id as an Observable<Post[]>
   * @param id => the publisher id
   */
  public getPostsForPublisher(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this._postUrl}/publisher/${id}`);
  }

  public postComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this._postUrl}/comment`, comment);
  }

  public postShare(postId: number, userId: number): Observable<Post> {
    return this.http.get<Post>(`${this._postUrl}/share/${postId}/${userId}`);
  }

  public getCommentsForPost(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this._postUrl}/comment/${id}`);
  }
}
