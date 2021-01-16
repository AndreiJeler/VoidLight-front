import { UserService } from './../../services/user.service';
import { FriendsHubService } from './../../shared/services/friends-hub.service';
import { SwalService } from './../../shared/services/swal.service';
import { Constants } from './../../shared/utils/constants';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService } from '../../services/post.service';
import { GameService } from '../../services/game.service';
import { PublisherService } from '../../services/publisher.service';
import { FriendsService } from '../../services/friends.service';

import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { Game } from 'src/app/models/game';
import { Publisher } from 'src/app/models/publisher';
import Swal from 'sweetalert2';
import { FriendRequest } from 'src/app/models/friend-request';
import { ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss'],
})
export class NewsfeedComponent implements OnInit {
  public user: User;
  public posts: Post[];
  public games: Game[];
  public publishers: Publisher[];
  public friends: User[];
  protected chosenModal: BsModalRef;
  public numberOfRequests = 0;
  public possibleUsers: User[] = [];
  public possibleFriends: User[] = [];
  public isClickable = true;
  public currentGameId = 0;

  constructor(
    private _postService: PostService,
    private _gameService: GameService,
    private _publisherService: PublisherService,
    private _friendsService: FriendsService,
    private _authenticationService: AuthenticationService,
    private _modalService: BsModalService,
    private _router: Router,
    private cdr: ChangeDetectorRef,
    private friendsHub: FriendsHubService,
    private swalService: SwalService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (!this._authenticationService.currentUserValue) {
      this._router.navigate(['/login']);
    }

    this._authenticationService.currentUser.subscribe(
      (user) => (this.user = user)
    );

    this._postService.getPostsForUser(this.user.id).subscribe(
      (result) => {
        this.posts = result;
      },
      (error) => {
        console.log(error);
      }
    );

    this._gameService.getGamesForUser(this.user.id).subscribe(
      (result) => {
        this.games = result;
      },
      (error) => {
        console.log(error);
      }
    );

    this._publisherService.getPublisherForUser().subscribe(
      (result) => {
        this.publishers = result;
      },
      (error) => {
        console.log(error);
      }
    );

    this._friendsService
      .getFriendRequestsForUser(this.user.id)
      .subscribe((res) => {
        this.numberOfRequests = res.length;
        this.possibleFriends = res;
        this.cdr.detectChanges();
      });

    this.getUserFriends();

    this.friendsHub.startConnection();
    this.startFriendRequestConnection();
    this.startConfirmRequestConnection();
    this.startDeclineRequestConnection();
    this.startRemovedRequestConnection();
  }

  public getUserFriends() {
    this._friendsService.getFriendsForUser(this.user.id).subscribe(
      (result) => {
        this.friends = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // REGION BUTTON FUNCTIONS

  // start: Filter Posts

  public getPostsForGame(id: number): void {
    if (this.currentGameId === id) {
      this._postService.getPostsForUser(this.user.id).subscribe(
        (result) => {
          this.posts = result;
        },
        (error) => {
          console.log(error);
        }
      );
      this.currentGameId = -1;

      document.getElementsByClassName('active')[0].classList.remove('active');

      return;
    }

    if (
      document.getElementsByClassName('active') !== null &&
      document.getElementsByClassName('active') !== undefined
    ) {
      if (document.getElementsByClassName('active')[0] !== undefined) {
        document.getElementsByClassName('active')[0].classList.remove('active');
      }
    }
    document.getElementById('game' + id).classList.add('active');
    this.currentGameId = id;
    this._postService.getPostsForGame(id, this.user.id).subscribe(
      (result) => {
        this.posts = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getPostsForPublisher(id: number): void {
    if (
      document.getElementsByClassName('active') !== null &&
      document.getElementsByClassName('active') !== undefined
    ) {
      if (document.getElementsByClassName('active')[0] !== undefined) {
        document.getElementsByClassName('active')[0].classList.remove('active');
      }
    }
    document.getElementById('publisher' + id).classList.add('active');

    this._postService.getPostsForPublisher(id).subscribe(
      (result) => {
        this.posts = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public logout(): void {
    this._authenticationService.logout();
    this.friendsHub.closeConnection();
    this._router.navigate(['/login']);
  }

  public openProfile(): void {
    this.friendsHub.closeConnection();
    this._router.navigate([`/profile/${this.user.id}`]);
  }

  //start: Modal Operations Region

  public async openModalCreatePost(selectedModal: TemplateRef<any>) {
    this.chosenModal = this._modalService.show(selectedModal);
  }

  public async openPhotoPostModal(selectedModal: TemplateRef<any>) {
    this.chosenModal = this._modalService.show(selectedModal);
  }

  public async openVideoPostModal(selectedModal: TemplateRef<any>) {
    this.chosenModal = this._modalService.show(selectedModal);
  }

  public closeModal(post: Post): void {
    this.chosenModal.hide();
    if (post) {
      this.posts.unshift(post);
      this.cdr.detectChanges();
    }
  }

  public closeFriendRequests(event: boolean): void {
    this.chosenModal.hide();
    this.getUserFriends();
    this.cdr.detectChanges();
    this._friendsService
      .getFriendRequestsForUser(this.user.id)
      .subscribe((res) => {
        this.numberOfRequests = res.length;
        this.possibleFriends = res;
        this.cdr.detectChanges();
      });
  }

  public startFriendRequestConnection() {
    const callback = (data) => {
      this.swalService.showFriendNotification(data);
      this.numberOfRequests += 1;
      this.cdr.detectChanges();
    };
    this.friendsHub.addFriendRequestListener(this.user.id, callback);
  }

  public startConfirmRequestConnection() {
    const callback = (data) => {
      this.swalService.showFriendNotification(data);
      this.getUserFriends();
      this.cdr.detectChanges();
    };
    this.friendsHub.addConfirmRequestListener(this.user.id, callback);
  }

  public startDeclineRequestConnection() {
    const callback = (data) => {
      this.swalService.showFriendNotification(data);
      this.getUserFriends();
      this.cdr.detectChanges();
    };
    this.friendsHub.addDeclineRequestListener(this.user.id, callback);
  }

  public startRemovedRequestConnection() {
    const callback = (data) => {
      this.swalService.showFriendNotification(data);
      this.numberOfRequests -= 1;
      this.cdr.detectChanges();
    };
    this.friendsHub.addRemovedFriendRequestListener(this.user.id, callback);
  }

  // END REGION BUTTON FUNCTIONS

  public newPost(post) {
    this.posts.unshift(post);
    this.cdr.detectChanges();
  }

  public gotToFriendProfile(id: number): void {
    this._router.navigate([`/profile/${id}`]);
  }

  public getUsersByUsername(username: string): void {
    this.userService.getUsersByUsername(username).subscribe((users: User[]) => {
      this.possibleUsers = users;
    });
  }

  public onSearch(event) {
    if (event.term.length < 3) {
      return;
    }
    this.getUsersByUsername(event.term);
  }

  public onChange(event) {
    if (this.isClickable) {
      this.gotToFriendProfile(event.id);
    }
  }

  public sendFriendRequest(friendId: number) {
    this.isClickable = false;
    this._friendsService
      .sendFriendRequest(new FriendRequest(this.user.id, friendId))
      .subscribe();
  }

  public checkValidFriendRequest(userId: number) {
    if (this.possibleFriends.find((user) => user.id == userId)) {
      return false;
    }
    if (this.friends.find((user) => user.id == userId)) {
      return false;
    }
    return true;
  }

  public deleteFriend(userId: number) {
    if (this.friends.find((friend) => friend.id == userId)) {
      this.isClickable = false;
      this._friendsService.removeFriend(this.user.id, userId).subscribe((_) => {
        this.getUserFriends();
      });
    } else {
      this.deleteFriendRequest(userId);
    }
  }

  public deleteFriendRequest(userId: number) {
    this.isClickable = false;
    this._friendsService
      .removeFriendRequest(this.user.id, userId)
      .subscribe((_) => {});
  }

  public openLobbies() {
    this.userService.checkDiscordConnected(this.user.id).subscribe((res) => {
      if (res.knownAs === '-') {
        this.swalService.showErrorResult(
          'Denied',
          'You need to be connected with Discord'
        );
      } else {
        this._router.navigate([`/lobby-games`]);
      }
    });
  }

  public openModal(selectedModal: TemplateRef<any>) {
    this.chosenModal = this._modalService.show(selectedModal);
  }
}
