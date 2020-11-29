/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FriendsService } from './friends.service';

describe('Service: Friends', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FriendsService]
    });
  });

  it('should ...', inject([FriendsService], (service: FriendsService) => {
    expect(service).toBeTruthy();
  }));
});
