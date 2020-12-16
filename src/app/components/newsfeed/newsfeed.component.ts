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

  constructor(
    private _postService: PostService,
    private _gameService: GameService,
    private _publisherService: PublisherService,
    private _friendsService: FriendsService,
    private _authenticationService: AuthenticationService,
    private _modalService: BsModalService,
    private _router: Router,
    private cdr: ChangeDetectorRef
  ) { }


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
        this.posts.forEach((post) => {
          post.avatarPath = 'https://localhost:44324/' + post.avatarPath;
          let contents = [];
          post.contents.forEach((content) => {
            content = 'https://localhost:44324/' + content;
            contents.push(content);
          });
          post.contents = contents;
          let comments = [];
          post.comments.forEach((content) => {
            content.user.avatarPath = 'https://localhost:44324/' + content.user.avatarPath;
            comments.push(content);
          });
          post.comments = comments;
        });
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

    this._friendsService.getFriendsForUser(this.user.id).subscribe(
      (result) => {
        this.friends = result;
        this.friends.forEach((friend: User) => {
          friend.avatarPath = 'https://localhost:44324/' + friend.avatarPath;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // REGION BUTTON FUNCTIONS

  // start: Filter Posts

  public getPostsForGame(id: number): void {
    if (document.getElementsByClassName('active') !== null && document.getElementsByClassName('active') !== undefined) {
      if (document.getElementsByClassName('active')[0] !== undefined) {
        document.getElementsByClassName('active')[0].classList.remove('active');
      }
    }
    document.getElementById('game' + id).classList.add('active');

    this._postService.getPostsForGame(id).subscribe(
      (result) => {
        this.posts = result;
        this.posts.forEach((post) => {
          post.avatarPath = 'https://localhost:44324/' + post.avatarPath;
          let contents = [];
          post.contents.forEach((content) => {
            content = 'https://localhost:44324/' + content;
            contents.push(content);
          });
          post.contents = contents;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getPostsForPublisher(id: number): void {
    if (document.getElementsByClassName('active') !== null && document.getElementsByClassName('active') !== undefined) {
      if (document.getElementsByClassName('active')[0] !== undefined) {
        document.getElementsByClassName('active')[0].classList.remove('active');
      }
    }
    document.getElementById('publisher' + id).classList.add('active');

    this._postService.getPostsForPublisher(id).subscribe(
      (result) => {
        this.posts = result;
        this.posts.forEach((post) => {
          post.avatarPath = 'https://localhost:44324/' + post.avatarPath;
          let contents = [];
          post.contents.forEach((content) => {
            content = 'https://localhost:44324/' + content;
            contents.push(content);
          });
          post.contents = contents;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public logout(): void {
    this._authenticationService.logout();
    this._router.navigate(['/login']);
  }

  public openProfile(): void {
    this._router.navigate(['/profile']);
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
      post.avatarPath = 'https://localhost:44324/' + post.avatarPath;
      let contents = [];
      post.contents.forEach((content) => {
        content = 'https://localhost:44324/' + content;
        contents.push(content);
      });
      post.contents = contents;
      this.posts.unshift(post);
      this.cdr.detectChanges();
    }
  }
  // END REGION BUTTON FUNCTIONS


  public newPost(post) {
    this.posts.unshift(post);
  }
}
