import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsHubService {
  private hubConnection: signalR.HubConnection;

  constructor(private swalService: SwalService) {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44324/friends-hub')
      .build();

    this.hubConnection
      .start()
      .then()
      .catch((err) => {
        this.hubConnection.start().then();
      });
  };

  public addFriendRequestListener = (userId: number, callback) => {
    this.hubConnection.on('new-' + userId, callback);
  };

  public addConfirmRequestListener = (userId: number, callback) => {
    this.hubConnection.on('accept-' + userId, callback);
  };

  public addDeclineRequestListener = (userId: number, callback) => {
    this.hubConnection.on('decline-' + userId, callback);
  };

  public addRemovedFriendRequestListener = (userId: number, callback) => {
    this.hubConnection.on('remove-' + userId, callback);
  };

  public closeConnection = () => {
    this.hubConnection.stop().then();
  };
}
