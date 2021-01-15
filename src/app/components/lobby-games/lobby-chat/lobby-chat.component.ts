import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LobbyGame } from 'src/app/models/lobby-game';
import { LobbyMessage } from 'src/app/models/lobby-message';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'lobby-chat',
  templateUrl: './lobby-chat.component.html',
  styleUrls: ['./lobby-chat.component.scss']
})
export class LobbyChatComponent implements OnInit {

  gameLobby: LobbyGame;
  user : User;
  @Input() messages: LobbyMessage[] = [
    {
      id: 1,
      text: "Sa moara bibi",
      username: 'Sully',
      userIcon: '../../../../assets/Images/buni_pic.jpg'
    },
    {
      id: 2,
      text: "Sa traasca bibi",
      username: 'Bibi',
      userIcon: '../../../../assets/Images/buni_pic.jpg'
    }
  ];

  public goBack() {
    window.history.back();
  }

  constructor(
    private lobbyService: LobbyService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      (user) => (this.user = user)
    );

    this.lobbyService.getLobby(this.route.snapshot.params.id).subscribe(
      (result) => {
        this.gameLobby = result;
        console.log(result);
      }
    )
  }

}
