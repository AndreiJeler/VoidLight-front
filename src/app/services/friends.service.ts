import { FriendRequest } from './../models/friend-request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Constants } from '../shared/utils/constants';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private _friendsUrl = `${Constants.SERVER_URL}/friends`;

  constructor(private http: HttpClient) {}

  /**
   * Returns all the games for a given user id as an Observable<Game[]>
   * @param id => the user id
   */
  public getFriendsForUser(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this._friendsUrl}/user/${id}`);
  }

  public getFriendRequestsForUser(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this._friendsUrl}/requests/${id}`);
  }

  public sendFriendRequest(friendRequest: FriendRequest): Observable<any> {
    return this.http.post<any>(`${this._friendsUrl}/request`, friendRequest);
  }

  public acceptFriendRequest(friendRequest: FriendRequest): Observable<any> {
    return this.http.post<any>(`${this._friendsUrl}/confirm`, friendRequest);
  }

  public declineFriendRequest(friendRequest: FriendRequest): Observable<any> {
    return this.http.post<any>(`${this._friendsUrl}/decline`, friendRequest);
  }
}
