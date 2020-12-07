import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from 'src/app/models/game';

import { PostService } from 'src/app/services/post.service';
import { Post } from '../../../../models/post';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

const URL = 'https://localhost:44324/';

@Component({
  selector: 'create-post-modal',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  
  public post: Post;
  public file: string;
  public isLoading: boolean = false;
  public selectedGame: Game = null; 

  @Input() withContent: boolean = false;
  @Input() userId: number;
  @Input() userName: string;
  @Input() games: Game[];
  @Output() close = new EventEmitter<Post>();

  constructor(private _postService: PostService) { }

  public ngOnInit() {
    this.post = new Post();
  }

  public onSave(): void {
    this.post.userId = this.userId;
    this.post.username = this.userName;
    this.post.game = this.selectedGame.name;
    if (this.withContent){
      var value = this.file.replace("C:\\fakepath\\", "");
      this.post.contents = [value[value.length - 1]];
    }
    this._postService.createPost(this.post).subscribe(
      (res) => {
        this.close.emit(res);
      },
      (error) => {
        Swal.fire('An error occured: ' + error);
      },
    );
  }

  public onCancel(): void {
    this.close.emit(undefined);
  }

}
