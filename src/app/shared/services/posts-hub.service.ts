import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Constants } from '../utils/constants';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root',
})
export class PostsHubService {
  private hubConnection: signalR.HubConnection;

  constructor(private swalService: SwalService) {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${Constants.SERVER_BASE_URL}/posts-hub`)
      .build();

    this.hubConnection
      .start()
      .then()
      .catch((err) => {
        this.hubConnection.start().then();
      });
  };

  public addLikeListener = (postId: number, callback) => {
    this.hubConnection.on('like-' + postId, callback);
  };

  public addNewPostListener = (callback) => {
    this.hubConnection.on('new', callback);
  };

  public closeConnection = () => {
    this.hubConnection.stop().then();
  };
}
