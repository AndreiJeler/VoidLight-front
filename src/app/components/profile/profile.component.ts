import { Post } from './../../models/post';
import { PostService } from './../../services/post.service';
import { GameService } from './../../services/game.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryRef } from 'ng-gallery';
import { User } from 'src/app/models/user';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  galleryId = 'posts';
  user: User;
  games: Game[];
  posts: Post[];
  images: string[] = [];
  videos: string[] = [];

  constructor(
    private gallery: Gallery,
    private router: Router,
    private authenticationService: AuthenticationService,
    private gameService: GameService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }

    this.authenticationService.currentUser.subscribe(
      (user) => (this.user = user)
    );

    this.gameService
      .getFavoriteGamesForUser(this.user.id)
      .subscribe((favouriteGames: Game[]) => (this.games = favouriteGames));

    this.postService.getPostsByUser(this.user.id).subscribe(
      (result) => {
        this.posts = result;
        this.posts.forEach((post) => {
          post.avatarPath = 'https://localhost:44324/' + post.avatarPath;
          let contents = [];
          post.contents.forEach((content) => {
            content = 'https://localhost:44324/' + content;
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
      },
      (error) => {
        console.log(error);
      }
    );

    // CHECK BELOW FOR USAGE
    // TODO: https://github.com/MurhafSousli/ngx-gallery/wiki/Mixed-Content-Usage
    const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);
    galleryRef.addImage({
      src: '../../../assets/1.jpg',
      thumb: '../../../assets/1.jpg',
    });

    // galleryRef.addVideo({
    //   src: 'VIDEO_URL',
    //   thumb: '(OPTIONAL)VIDEO_THUMBNAIL_URL',
    //   poster: '(OPTIONAL)VIDEO_POSTER_URL'
    // });
    galleryRef.addYoutube({
      src: 'NGH5YN2cMRg',
    });
  }
}
