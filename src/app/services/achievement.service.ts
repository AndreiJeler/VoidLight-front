import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Constants } from '../shared/utils/constants';
import { Achievement } from '../models/achievement';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
  private _achievementUrl = `${Constants.SERVER_URL}/achievements`;

constructor(private http: HttpClient) { }

public getAchievementsForUser(id: number, gameId: number): Observable<Achievement[]> {
  console.log(id, gameId);
  return this.http.get<Achievement[]>(`${this._achievementUrl}/user/${id}/game/${gameId}`);
}

public postNewAchievements(userId: number, gameId: number): Observable<Achievement[]> {
  return this.http.post<Achievement[]>(`${this._achievementUrl}/refresh`, {
    gameId: gameId, userId: userId
  });
}

}
