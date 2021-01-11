import { Component, Input, OnInit } from '@angular/core';
import {GameInfo} from '../../../models/game-info';

@Component({
  selector: 'lobby-card-game',
  templateUrl: './lobby-card.component.html',
  styleUrls: ['./lobby-card.component.scss']
})
export class LobbyCardComponent implements OnInit {

  @Input() gameInfo:GameInfo;
  constructor() { }

  ngOnInit() {
  }

}
