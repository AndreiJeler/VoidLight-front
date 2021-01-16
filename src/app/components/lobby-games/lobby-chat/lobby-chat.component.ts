import { SwalService } from 'src/app/shared/services/swal.service';
import { LobbyHubService } from './../../../shared/services/lobby-hub.service';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LobbyGame } from 'src/app/models/lobby-game';
import { LobbyMessage } from 'src/app/models/lobby-message';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'lobby-chat',
  templateUrl: './lobby-chat.component.html',
  styleUrls: ['./lobby-chat.component.scss'],
})
export class LobbyChatComponent implements OnInit {
  gameLobby: LobbyGame;
  user: User;
  @Input() messages: LobbyMessage[] = [
    {
      id: 1,
      text: 'Sa moara bibi',
      username: 'Sully',
      userIcon: '../../../../assets/Images/buni_pic.jpg',
    },
    {
      id: 2,
      text: 'Sa traasca bibi',
      username: 'Bibi',
      userIcon: '../../../../assets/Images/buni_pic.jpg',
    },
  ];

  public goBack() {
    window.history.back();
    this.lobbyHub.closeConnection();
  }

  constructor(
    private lobbyService: LobbyService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private lobbyHub: LobbyHubService,
    private cdr: ChangeDetectorRef,
    private swalService: SwalService
  ) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      (user) => (this.user = user)
    );

    this.lobbyService
      .getLobby(this.route.snapshot.params.id)
      .subscribe((result) => {
        this.gameLobby = result;
        console.log(result);
      });

    this.lobbyHub.startConnection();
    this.startMessageListener();
    this.startJoinistener();
    this.startLeaveListener();
    this.startStartListener();
  }

  public startMessageListener() {
    const callback = (data: LobbyMessage) => {
      console.log(data);
      this.messages.push(data);
      this.cdr.detectChanges();
    };
    this.lobbyHub.messageListener(this.gameLobby.id, callback);
  }

  public startJoinistener() {
    const callback = (data: LobbyGame) => {
      console.log(data);
      this.gameLobby = data;
      this.cdr.detectChanges();
    };
    this.lobbyHub.joinListener(this.gameLobby.id, callback);
  }

  public startLeaveListener() {
    const callback = (data: LobbyGame) => {
      console.log(data);
      this.gameLobby = data;
      this.cdr.detectChanges();
    };
    this.lobbyHub.leaveListener(this.gameLobby.id, callback);
  }

  public startStartListener() {
    const callback = (data: string) => {
      console.log(data);
      this.swalService.showSuccessResult(
        'Channel opened',
        'The initializer opened the channel. The channel name is' + data
      );
      this.cdr.detectChanges();
    };
    this.lobbyHub.messageListener(this.gameLobby.id, callback);
  }
}
