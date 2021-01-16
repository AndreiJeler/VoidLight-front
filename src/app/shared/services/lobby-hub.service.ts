import { Constants } from './../utils/constants';
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root',
})
export class LobbyHubService {
  private hubConnection: signalR.HubConnection;

  constructor(private swalService: SwalService) {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${Constants.SERVER_BASE_URL}/lobby-hub`)
      .build();

    this.hubConnection
      .start()
      .then()
      .catch((err) => {
        this.hubConnection.start().then();
      });
  };

  public messageListener = (lobbyId: number, callback) => {
    this.hubConnection.on('message-' + lobbyId, callback);
  };

  public joinListener = (lobbyId: number, callback) => {
    this.hubConnection.on('join-' + lobbyId, callback);
  };

  public startListener = (lobbyId: number, callback) => {
    this.hubConnection.on('start-' + lobbyId, callback);
  };

  public leaveListener = (lobbyId: number, callback) => {
    this.hubConnection.on('leave-' + lobbyId, callback);
  };

  public closeConnection = () => {
    this.hubConnection.stop().then();
  };
}
