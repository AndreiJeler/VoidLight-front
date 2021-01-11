import { Component, Input, OnInit } from '@angular/core';
import { LobbyMessage } from '../../../../models/lobby-message';

@Component({
  selector: 'lobby-chat-message',
  templateUrl: './lobby-chat-message.component.html',
  styleUrls: ['./lobby-chat-message.component.scss']
})
export class LobbyChatMessageComponent implements OnInit {

  @Input() message: LobbyMessage;
  constructor() { }

  ngOnInit() {
  }

}
