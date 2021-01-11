import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lobby-games',
  templateUrl: './lobby-games.component.html',
  styleUrls: ['./lobby-games.component.scss']
})
export class LobbyGamesComponent implements OnInit {

  public lobbies: string[] = [];
  constructor() { }

  ngOnInit() {
  }

}
