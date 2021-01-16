import { Constants } from './../../shared/utils/constants';
import { Post } from './../../models/post';
import { PostService } from './../../services/post.service';
import { GameService } from './../../services/game.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import {Component, OnInit, TemplateRef} from '@angular/core';
import { Gallery, GalleryRef } from 'ng-gallery';
import { User } from 'src/app/models/user';
import { Game } from 'src/app/models/game';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { FriendsService } from '../../services/friends.service';
import { FriendRequest } from 'src/app/models/friend-request';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  galleryId = 'gallery';
  user: User;
  games: Game[];
  posts: Post[];
  friends: User[];
  images: string[] = [];
  videos: string[] = [];
  userId: number;
  isCurrentUserAccount = false;
  friendButtonType: number;
  modalRef: BsModalRef;
  isLoaded: boolean = false;
  protected chosenModal: BsModalRef;

  constructor(
    private route: ActivatedRoute,
    private gallery: Gallery,
    private router: Router,
    private authenticationService: AuthenticationService,
    private gameService: GameService,
    private postService: PostService,
    private profileService: ProfileService,
    private friendsService: FriendsService,
    private modalService: BsModalService,
  ) {}

  ngOnInit(): void {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
    this.userId = +this.route.snapshot.paramMap.get('id');

    if (this.userId == this.authenticationService.currentUserValue.id) {
      this.isCurrentUserAccount = true;
    } else {
      this.friendsService
        .getFriendshipStatus(
          this.authenticationService.currentUserValue.id,
          this.userId
        )
        .subscribe((res) => {
          this.friendButtonType = res;
        });
    }

    this.profileService
      .getUserById(+this.route.snapshot.paramMap.get('id'))
      .subscribe((user) => {
        this.user = user;
        this.user.avatarPath = user.avatarPath;
        this.isLoaded = true;
      });

      this.postService
        .getPostsByUser(
          this.userId,
          this.authenticationService.currentUserValue.id
        )
        .subscribe(
          (result) => {
            this.posts = result;
            this.videos = [];
            this.images = [];
            this.posts.forEach((post) => {
              post.contents.forEach((content) => {
                const value = content.split('.');
                if (value[value.length - 1] === 'mp4') {
                  this.videos.push(content.replace('\\', '/'));
                } else {
                  this.images.push(content.replace('\\', '/'));
                }
              });
            });

            this._initGallery();
          },
          (error) => {
            console.log(error);
          }
        );

    this.gameService
      .getFavoriteGamesForUser(this.userId)
      .subscribe((favouriteGames: Game[]) => (this.games = favouriteGames));

    this.friendsService.getFriendsForUser(this.userId).subscribe(
      (result) => {
        this.friends = result;
        this.friends.forEach((friend: User) => {
          friend.avatarPath = friend.avatarPath;
        });
      },
      (error) => {
        console.log(error);
      }
    );

    // CHECK BELOW FOR USAGE
    // // TODO: https://github.com/MurhafSousli/ngx-gallery/wiki/Mixed-Content-Usage
    // const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);
    // galleryRef.addImage({
    //   src: '../../../assets/1.jpg',
    //   thumb: '../../../assets/1.jpg',
    // });

    // // galleryRef.addVideo({
    // //   src: 'VIDEO_URL',
    // //   thumb: '(OPTIONAL)VIDEO_THUMBNAIL_URL',
    // //   poster: '(OPTIONAL)VIDEO_POSTER_URL'
    // // });
    // galleryRef.addYoutube({
    //   src: 'NGH5YN2cMRg',
    // });
  }

  _initGallery(): void {
    const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);

    this.images.forEach((image) => {
      galleryRef.addImage({
        src: image,
        thumb: image,
      });
    });

    this.videos.forEach((video) => {
      galleryRef.addVideo({
        src: video,
      });
    });
  }

  setActive(id: string): void {
    document.getElementsByClassName('active')[0]?.classList.remove('active');
    document.getElementById(id).classList.add('active');

    if (this.isActive('home')) {
      this._initGallery();
    }

    if (id == 'posts') {
      this.postService
        .getPostsByUser(
          this.userId,
          this.authenticationService.currentUserValue.id
        )
        .subscribe(
          (result) => {
            this.posts = result;
            this.posts.forEach((post) => {
              post.avatarPath = post.avatarPath;
              let contents = [];
              post.contents.forEach((content) => {
                content = content;
                contents.push(content.replace('\\', '/'));
              });
              post.contents = contents;
              contents.forEach((content) => {
                const value = content.split('.');
                if (value[value.length - 1] === 'mp4') {
                  this.videos.push(content.replace('\\', '/'));
                } else {
                  this.images.push(content.replace('\\', '/'));
                }
              });
            });

            this._initGallery();
          },
          (error) => {
            console.log(error);
          }
        );

    }
  }

  isActive(id: string): boolean {
    return document.getElementById(id).classList.contains('active');
  }

  gotToFriendProfile(id: number): void {
    this.router.navigate([`/profile/${id}`]).then(() => location.reload());
  }

  public sendFriendRequest() {
    this.friendsService
      .sendFriendRequest(
        new FriendRequest(
          this.authenticationService.currentUserValue.id,
          this.user.id
        )
      )
      .subscribe((_) => {
        this.friendButtonType = 2;
      });
  }

  public deleteFriend() {
    this.friendsService
      .removeFriend(
        this.authenticationService.currentUserValue.id,
        this.user.id
      )
      .subscribe((_) => {
        this.friendButtonType = 0;
      });
  }

  public deleteFriendRequest() {
    this.friendsService
      .removeFriendRequest(
        this.authenticationService.currentUserValue.id,
        this.user.id
      )
      .subscribe((_) => {
        this.friendButtonType = 0;
      });
  }

  openEditProfileModal(editProfileModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(editProfileModal);
  }

  closeModal(): void {
    this.modalRef.hide();
  public goBack() {
    window.history.back();
  }

  public seeAchievements() {
    this.router.navigate([`/achievements/${this.userId}`]);
  }


  public closeListModal(event) {
    this.chosenModal.hide();
    this.gameService
      .getFavoriteGamesForUser(this.userId)
      .subscribe((favouriteGames: Game[]) => {
        this.games = favouriteGames;
      });
  }

  public openModal(selectedModal) {
    this.chosenModal = this.modalService.show(selectedModal);
  }
}
