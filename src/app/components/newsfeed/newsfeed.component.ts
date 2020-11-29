import { SwalService } from './../../shared/services/swal.service';
import { Constants } from './../../shared/utils/constants';
import {
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

  //start: Filter Posts

  public getPostsForGame(id: number): void {
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
    //this.chosenModal = this._modalService.show(selectedModal);
    const { value: formValues } = await Swal.fire({
      title: 'Add a text post',
      html:
        '<textarea id="swal-input1" class="swal2-input"></textarea>' +
        '<select id="swal-input2" class="swal2-input"><option value="No game">No game</option>' +
        '<option value="Gta V">Gta V</option><option value="Gta San Andreas">Gta San Andreas</option> <option value="Spider-Man Miles Morales">Spider-Man Miles Morales</option> </select>',
      focusConfirm: false,
      customClass: { popup: 'modalAddPost' },
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
          (<HTMLInputElement>document.getElementById('swal-input2')).value,
        ];
      },
    });
    if (formValues) {
      let post: Post = new Post();
      post.text = formValues[0];
      post.userId = this.user.id;
      post.game = formValues[1];
      this._postService.createPost(post).subscribe((res) => {
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
            });
          },
          (error) => {
            console.log(error);
          }
        );

        this.cdr.detectChanges();
      });
    }
  }

  //selectedModal: TemplateRef<any>
  public async openPhotoPostModal() {
    //this.chosenModal = this._modalService.show(selectedModal);
    const { value: formValues } = await Swal.fire({
      title: 'Add a photo post',
      html:
        '<textarea id="swal-input1" class="swal2-input"></textarea>' +
        '<select id="swal-input2" class="swal2-input"><option value="No game">No game</option>' +
        '<option value="Gta V">Gta V</option><option value="Gta San Andreas">Gta San Andreas</option> <option value="Spider-Man Miles Morales">Spider-Man Miles Morales</option> </select>' +
        '<input type="file" class="swal2-input" id="swal-input3">',
      focusConfirm: false,
      customClass: { popup: 'modalAddPost' },
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
          (<HTMLInputElement>document.getElementById('swal-input2')).value,
          (<HTMLInputElement>document.getElementById('swal-input3')).value,
        ];
      },
    });

    if (formValues) {
      let post: Post = new Post();
      const value = formValues[2].split('\\');
      post.contents = [value[value.length - 1]];
      post.text = formValues[0];
      post.userId = this.user.id;
      post.game = formValues[1];
      this._postService.createPost(post).subscribe((res) => {
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
            });
          },
          (error) => {
            console.log(error);
          }
        );

        this.cdr.detectChanges();
      });
    }
  }

  public async openVideoPostModal() {
    //this.chosenModal = this._modalService.show(selectedModal);
    const { value: formValues } = await Swal.fire({
      title: 'Add a Video post',
      html:
        '<textarea id="swal-input1" class="swal2-input"></textarea>' +
        '<select id="swal-input2" class="swal2-input"><option value="No game">No game</option>' +
        '<option value="Gta V">Gta V</option><option value="Gta San Andreas">Gta San Andreas</option> <option value="Spider-Man Miles Morales">Spider-Man Miles Morales</option><option value="Fifa 21">Fifa 21</option> </select>' +
        '<input type="file" class="swal2-input" id="swal-input3" multiple>',
      focusConfirm: false,
      customClass: { popup: 'modalAddPost' },
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
          (<HTMLInputElement>document.getElementById('swal-input2')).value,
          (<HTMLInputElement>document.getElementById('swal-input3')).value,
        ];
      },
    });

    if (formValues) {
      let post: Post = new Post();
      const value = formValues[2].split('\\');
      post.contents = [value[value.length - 1]];
      post.text = formValues[0];
      post.userId = this.user.id;
      post.game = formValues[1];
      this._postService.createPost(post).subscribe((res) => {
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
            });
          },
          (error) => {
            console.log(error);
          }
        );

        this.cdr.detectChanges();
      });
    }
  }

  public closeModal(data: boolean): void {
    this.chosenModal.hide();
    if (data) {
      alert('Post added');
      //TODO replace alert with swal2
    }
  }

  // END REGION BUTTON FUNCTIONS
}
