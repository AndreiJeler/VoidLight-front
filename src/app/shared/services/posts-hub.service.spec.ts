import { TestBed } from '@angular/core/testing';

import { PostsHubService } from './posts-hub.service';

describe('PostsHubService', () => {
  let service: PostsHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
