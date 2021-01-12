import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LobbyMessage } from '../../../../models/lobby-message';

@Component({
  selector: 'lobby-chat-message',
  templateUrl: './lobby-chat-message.component.html',
  styleUrls: ['./lobby-chat-message.component.scss']
})
export class LobbyChatMessageComponent implements OnInit {

  @Input() message: LobbyMessage;
  loggedUser: User = {
    id: 1,
    username: 'Bibi',
    fullName: 'BibiVonalas',
    role: 'Gay',
    email: 'gay@gay.com',
    password: 'gat',
    confirmationPassword: 'gat',
    playedGame: "Mata",
    avatarPath: '../../../../assets/Images/buni_pic.jpg'
  }


  constructor() { }

  ngOnInit() { }

}
