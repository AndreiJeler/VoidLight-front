import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../models/user";
import {Constants} from "../shared/utils/constants";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _usersUrl = `${Constants.SERVER_URL}/users`;

  constructor(private http: HttpClient) { }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this._usersUrl}/${id}`);
  }
}
