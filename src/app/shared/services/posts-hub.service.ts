import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root',
})
export class PostsHubService {
  private hubConnection: signalR.HubConnection;

  constructor(private swalService: SwalService) {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/posts-hub')
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
