import { User } from './../models/user';
import { Constants } from './../shared/utils/constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private _authUrl = `${Constants.SERVER_URL}/authentication`;

  constructor(private http: HttpClient) {
    this._currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem(Constants.AUTH_CURRENT_USER_KEY))
    );
    this.currentUser = this._currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this._currentUserSubject.value;
  }

  public setCurrentUserValue(user: User): void {
    localStorage.setItem(Constants.AUTH_CURRENT_USER_KEY, JSON.stringify(user));
    localStorage.setItem('token', user.token);
    this._currentUserSubject.next(user);
  }

  public login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this._authUrl}/authenticate`, { username, password })
      .pipe(
        map((user) => {
          localStorage.setItem(
            Constants.AUTH_CURRENT_USER_KEY,
            JSON.stringify(user)
          );
          localStorage.setItem('token', user.token);
          this._currentUserSubject.next(user);
          return user;
        })
      );
  }

  public logout(): void {
    localStorage.removeItem(Constants.AUTH_CURRENT_USER_KEY);
    localStorage.removeItem('token');
    this._currentUserSubject.next(null);
  }

  public isAuthenticated(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.post<any>(
      `${this._authUrl}/isAuthenticated`,
      { token },
      { headers: headers }
    );
  }
}
