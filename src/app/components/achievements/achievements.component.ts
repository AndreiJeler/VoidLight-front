import { Component, OnInit } from '@angular/core';

import { Achievement } from '../../models/achievement';
import { User } from '../../models/user';

import { AchievementService } from '../../services/achievement.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {
  public user: User;
  public achievements: Achievement[];

  constructor(
    private _achievementService: AchievementService,
    private _authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    this._authenticationService.currentUser.subscribe(
      (user) => (this.user = user)
    );

    this._achievementService.getAchievementsForUser(this.user.id).subscribe(
      (result) => {
        this.achievements = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
