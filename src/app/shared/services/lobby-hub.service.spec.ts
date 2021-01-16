/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LobbyHubService } from './lobby-hub.service';

describe('Service: LobbyHub', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LobbyHubService]
    });
  });

  it('should ...', inject([LobbyHubService], (service: LobbyHubService) => {
    expect(service).toBeTruthy();
  }));
});
