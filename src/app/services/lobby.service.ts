import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameInfo } from '../models/game-info';
import { LobbyGame } from '../models/lobby-game';
import { Constants } from '../shared/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private _lobbyUrl = `${Constants.SERVER_URL}/lobby`;

  constructor(private http: HttpClient) { }

  /**
   * Return all the Game Lobbies as an Observable<GameInfo[]>
   * @param id => the user id
   */
  public getGameLobbiesInfo(id: number): Observable<GameInfo[]> {
    return this.http.get<GameInfo[]>(`${this._lobbyUrl}/games/${id}`);
  }

  /**
   * Return all lobbies for a given game as an Observable<GameInfo[]>
   * @param id => the game id
   */
  public getAllLobbiesForGame(id: number): Observable<LobbyGame[]> {
    return this.http.get<LobbyGame[]>(`${this._lobbyUrl}/game/${id}`);
  }

  /**
   * Return a LobbyGame by it's id
   * @param id => the lobby id
   */
  public getLobby(id: number): Observable<LobbyGame> {
    return this.http.get<LobbyGame>(`${this._lobbyUrl}/${id}`);
  }

  public joinLobby(lobbyId: number, userId: number): Observable<LobbyGame> {
    return this.http.get<LobbyGame>(
      `${this._lobbyUrl}/join/${lobbyId}/${userId}`
    );
  }

  public createLobby(userId: number, gameId: number): Observable<LobbyGame> {
    return this.http.post<LobbyGame>(`${this._lobbyUrl}/create`, {
      userId: userId,
      gameId: gameId,
    });
  }
}
