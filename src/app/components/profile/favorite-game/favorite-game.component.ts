import { Game } from './../../../models/game';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'favorite-game',
  templateUrl: './favorite-game.component.html',
  styleUrls: ['./favorite-game.component.scss'],
})
export class FavoriteGameComponent implements OnInit {
  @Input() game: Game;
  constructor() {}

  ngOnInit() {}
}
