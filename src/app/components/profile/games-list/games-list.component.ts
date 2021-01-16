import { UserService } from 'src/app/services/user.service';
import { GameService } from './../../../services/game.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from 'src/app/models/game';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit {
  @Input() user: User;
  @Output() close = new EventEmitter<boolean>();
  public selectedGame: Game = null;
  public favouriteGames: Game[] = [];
  games: Game[];
  originalGames: Game[];

  constructor(
    private gameService: GameService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.gameService.getGamesForUser(this.user.id).subscribe((res) => {
      this.games = res;
      this.originalGames = this.games;
    });
    this.gameService.getFavoriteGamesForUser(this.user.id).subscribe((res) => {
      this.favouriteGames = res;
    });
  }

  onCancel() {
    this.close.emit(true);
  }

  public onChange(event): void {
    if (!this.selectedGame) {
      this.games = this.originalGames;
      return;
    }
    this.games = [event];
  }

  public getAllGames() {
    this.gameService.getGamesForUser(this.user.id).subscribe((res) => {
      this.games = res;
      this.originalGames = this.games;
      if (this.selectedGame) {
        this.games = [this.selectedGame];
      }
    });
    this.gameService.getFavoriteGamesForUser(this.user.id).subscribe((res) => {
      this.favouriteGames = res;
    });
  }

  public isFavorite(game: Game) {
    return this.favouriteGames.findIndex((g) => g.id == game.id) === -1;
  }

  public updateFavorite(game: Game) {
    this.gameService.updateFavorite(this.user.id, game.id).subscribe(() => {
      this.getAllGames();
    });
  }

  public refresh() {
    this.userService.refreshGames(this.user.id).subscribe(() => {
      this.getAllGames();
    });
  }
}
