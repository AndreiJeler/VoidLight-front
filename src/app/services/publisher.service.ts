import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Constants } from '../shared/utils/constants';
import { Publisher } from '../models/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  private _publisherUrl = `${Constants.SERVER_URL}/publishers`;

  constructor(private http: HttpClient) { }

/**
 * Returns all the publishers
 */
  public getPublisherForUser(): Observable<Publisher[]> {
    return this.http
      .get<Publisher[]>(`${this._publisherUrl}`);
  }
}
