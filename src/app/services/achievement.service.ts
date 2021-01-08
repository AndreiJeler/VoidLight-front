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

public getAchievementsForUser(id: number): Observable<Achievement[]> {
  return this.http.get<Achievement[]>(`${this._achievementUrl}/user/${id}/game/${id}`);
}

}
