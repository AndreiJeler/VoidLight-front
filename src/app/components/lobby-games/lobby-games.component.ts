import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GameInfo } from 'src/app/models/game-info';
import { LobbyGame } from 'src/app/models/lobby-game';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'app-lobby-games',
  templateUrl: './lobby-games.component.html',
  styleUrls: ['./lobby-games.component.scss']
})
export class LobbyGamesComponent implements OnInit {

  public lobbies: GameInfo[] = [];

  public gameLobbies: LobbyGame[] = [];
  public isSelected: boolean = false;
  public user: User;

  constructor(
    private cdr: ChangeDetectorRef,
    private lobbyService: LobbyService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      (user) => (this.user = user)
    );

    this.lobbyService.getGameLobbbiesInfo(this.user.id).subscribe(
      (result) => {
        this.lobbies = result;
      });
  }

  public getLobbyForGame(lobby: GameInfo) {
    if (this.lobbies.length == 1) {
      this.lobbyService.getGameLobbbiesInfo(this.user.id).subscribe(
        (result) => {
          this.lobbies = null;
          this.lobbies = result;
          this.isSelected = false;
          this.cdr.detectChanges();
        });
    } else {
      this.lobbyService.getAllLobbiesForGame(lobby.gameId).subscribe(
        (result) => {
          this.gameLobbies = result;
          this.lobbies = null;
          this.lobbies = [lobby];
          this.isSelected = true;
          this.cdr.detectChanges();
        }
      );
    }
  }

  public toggleIsSelected() {
    this.isSelected = !this.isSelected;
  }

  public goBack() {
    window.history.back();
  }
}