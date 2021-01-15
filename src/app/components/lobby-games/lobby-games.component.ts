import { SwalService } from 'src/app/shared/services/swal.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GameInfo } from 'src/app/models/game-info';
import { LobbyGame } from 'src/app/models/lobby-game';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LobbyService } from 'src/app/services/lobby.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby-games',
  templateUrl: './lobby-games.component.html',
  styleUrls: ['./lobby-games.component.scss'],
})
export class LobbyGamesComponent implements OnInit {
  public lobbies: GameInfo[] = [];
  public originalLobbies: GameInfo[];
  public gameLobbies: LobbyGame[] = [];
  public isSelected: boolean = false;
  public user: User;
  public searchTerm: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private lobbyService: LobbyService,
    private authenticationService: AuthenticationService,
    private swalService: SwalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      (user) => (this.user = user)
    );

    this.lobbyService.getGameLobbiesInfo(this.user.id).subscribe((result) => {
      this.lobbies = result;
      this.originalLobbies = this.lobbies;
    });
  }

  public getLobbyForGame(lobby: GameInfo) {
    if (this.isSelected) {
      this.lobbyService
        .getGameLobbiesInfo(this.user.id)
        .subscribe((result) => {
          this.lobbies = null;
          this.lobbies = result;
          this.isSelected = false;
          this.gameLobbies = [];
          this.lobbies = this.originalLobbies;
          this.cdr.detectChanges();
        });
    } else {
      this.lobbyService
        .getAllLobbiesForGame(lobby.gameId)
        .subscribe((result) => {
          this.gameLobbies = result;
          this.lobbies = null;
          this.lobbies = [lobby];
          this.isSelected = true;
          this.cdr.detectChanges();
        });
    }
  }

  public toggleIsSelected() {
    this.isSelected = !this.isSelected;
  }

  public goBack() {
    window.history.back();
  }

  public onKey(event) {
    if (this.searchTerm.length >= 3) {
      var temp = this.originalLobbies;
      temp = temp.filter((lobby) => {
        var res = lobby.gameName
          .toUpperCase()
          .includes(this.searchTerm.toUpperCase());
        return res;
      });
      this.lobbies = temp;
    } else {
      this.lobbies = this.originalLobbies;
    }
  }

  public createLobby() {
    this.swalService
      .createLobbyNotification(
        `Are you sure you want to create a lobby for ${this.lobbies[0].gameName}`
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.lobbyService
            .createLobby(this.user.id, this.lobbies[0].gameId)
            .subscribe((res) => {
              const lobbyId = res.id;
              this.router.navigate([`/lobby/${lobbyId}`]);
            });
        }
      });
  }

  public joinLobby(gameLobby: LobbyGame) {
    this.lobbyService.joinLobby(gameLobby.id, this.user.id).subscribe((res) => {
      const lobbyId = res.id;
      this.router.navigate([`/lobby/${lobbyId}`]);
    });
  }
}
