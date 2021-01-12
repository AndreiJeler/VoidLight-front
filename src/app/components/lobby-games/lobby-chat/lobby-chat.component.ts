import { Component, Input, OnInit } from '@angular/core';
import { LobbyMessage } from 'src/app/models/lobby-message';

@Component({
  selector: 'lobby-chat',
  templateUrl: './lobby-chat.component.html',
  styleUrls: ['./lobby-chat.component.scss']
})
export class LobbyChatComponent implements OnInit {

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

  constructor() {  }

  ngOnInit() { }

}
