import { Injectable } from '@angular/core';
import { Constants } from './../shared/utils/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private _registerUrl = `${Constants.SERVER_URL}/authentication`;

  constructor(private http: HttpClient)
  {
    
  }
}
