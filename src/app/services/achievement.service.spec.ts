/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AchievementService } from './achievement.service';

describe('Service: Achievement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AchievementService]
    });
  });

  it('should ...', inject([AchievementService], (service: AchievementService) => {
    expect(service).toBeTruthy();
  }));
});
