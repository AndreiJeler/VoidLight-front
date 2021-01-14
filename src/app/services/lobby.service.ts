import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameInfo } from '../models/game-info';
import {LobbyGame} from '../models/lobby-game';
import { Constants } from '../shared/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  private _lobbyUrl = `${Constants.SERVER_URL}/lobby`;

  constructor(private http: HttpClient) { }

  /**
   * Return all the Game Lobbies as an Observable<GameInfo[]>
   * @param id => the user id
   */
  public getGameLobbbiesInfo(id: number): Observable<GameInfo[]> {
    return this.http.get<GameInfo[]>(`${this._lobbyUrl}/games/${id}`);
  }

  /**
   * Return all lobbies for a given game as an Observable<GameInfo[]>
   * @param id => the game id
   */
  public getAllLobbiesForGame(id:number): Observable<LobbyGame[]>{
    return this.http.get<LobbyGame[]>(`${this._lobbyUrl}/game/${id}`);
  }
}
