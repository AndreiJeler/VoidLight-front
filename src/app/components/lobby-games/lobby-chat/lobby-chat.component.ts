import { DiscordUser } from './../../../models/discord-user';
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
  discordUser: DiscordUser;
  messageText: string;
  isLoaded = false;
  messages: LobbyMessage[] = [];

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
        this.discordUser = this.gameLobby.users.find(
          (u) => u.userId == this.user.id
        );
        this.lobbyHub.startConnection();
        this.startMessageListener();
        this.startJoinListener();
        this.startLeaveListener();
        this.startStartListener();
        this.isLoaded = true;
      });
  }

  public startMessageListener() {
    const callback = (data: LobbyMessage) => {
      this.messages.push(data);
      this.cdr.detectChanges();
    };
    this.lobbyHub.messageListener(this.gameLobby.id, callback);
  }

  public startJoinListener() {
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
      console.log(typeof data);
      if (typeof data === typeof LobbyMessage) {
        return;
      }
      console.log(data);
      this.swalService.showSuccessResult(
        'Channel opened',
        'The initializer opened the channel. The channel name is' + data
      );
      this.cdr.detectChanges();
    };
    this.lobbyHub.startListener(this.gameLobby.id, callback);
  }

  public sendMessage() {
    const message = new LobbyMessage();
    message.id = this.gameLobby.id;
    message.userIcon = this.discordUser.avatarPicture;
    message.text = this.messageText;
    message.userId = this.discordUser.userId;
    message.username = this.discordUser.username;
    this.messageText = '';
    this.lobbyService.sendMessage(message).subscribe();
  }

  public startLobby() {
    this.lobbyService.startLobby(this.gameLobby.id).subscribe();
  }

  public leaveLobby() {
    this.lobbyService.leavelobby(this.gameLobby.id, this.user.id).subscribe();
  }
}
