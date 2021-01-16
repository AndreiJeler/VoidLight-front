import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Constants } from '../shared/utils/constants';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _gameUrl = `${Constants.SERVER_URL}/games`;

  constructor(private http: HttpClient) {}

  /**
   * Returns all the games for a given user id as an Observable<Game[]>
   * @param id => the user id
   */
  public getGamesForUser(id: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${this._gameUrl}/user/${id}`);
  }

  /**
   * Returns all the favorite games for a given user id as an Observable<Game[]>
   * @param id => the user id
   */
  public getFavoriteGamesForUser(id: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${this._gameUrl}/favorite/user/${id}`);
  }

  public updateFavorite(userId: number, gameId: number): Observable<any> {
    return this.http.get<any>(`${this._gameUrl}/toggle/${userId}/${gameId}`);
  }
}
