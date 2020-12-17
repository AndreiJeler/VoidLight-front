/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FriendsHubService } from './friends-hub.service';

describe('Service: FriendsHub', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FriendsHubService]
    });
  });

  it('should ...', inject([FriendsHubService], (service: FriendsHubService) => {
    expect(service).toBeTruthy();
  }));
});
