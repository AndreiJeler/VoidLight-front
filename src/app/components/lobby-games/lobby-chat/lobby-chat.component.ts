import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lobby-chat',
  templateUrl: './lobby-chat.component.html',
  styleUrls: ['./lobby-chat.component.scss']
})
export class LobbyChatComponent implements OnInit {

  @Input() messages: string[]=[];
  constructor() { }

  ngOnInit() {
  }

}
