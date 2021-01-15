import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Achievement } from '../../models/achievement';
import { User } from '../../models/user';
import { Game } from 'src/app/models/game';

import { AchievementService } from '../../services/achievement.service';
import { AuthenticationService } from '../../services/authentication.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {
  public user: User;
  public achievements: Achievement[];
  public isLoading: boolean = true;
  public selectedGame: Game = null;
  public games: Game[];
  userId: number;
  isCurrentUserAccount = false;

  constructor(
    private _achievementService: AchievementService,
    private _authenticationService: AuthenticationService,
    private _gameService: GameService,
    private _cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id');

    if (this.userId == this._authenticationService.currentUserValue.id) {
      this.isCurrentUserAccount = true;
    }
    else {
      this._authenticationService.currentUser.subscribe(
        (user) => (this.user = user)
      );
    }

    this._gameService.getGamesForUser(this.userId).subscribe(
      (games) => {
        this.games = games;
        this.isLoading = false;
      }
    )
  }

  public checkAchievements(): void {
    this._achievementService.postNewAchievements(this.userId, this.selectedGame.id).subscribe(
      (result) => {
        this.achievements = result.concat(this.achievements);
        this._cdr.detectChanges();
      }
    );
  }

  public onChange(event): void {
    this._achievementService.getAchievementsForUser(this.userId, event.id).subscribe(
      (result) => {
        this.achievements = result;
        this._cdr.detectChanges();
      }
    );
  }
}
