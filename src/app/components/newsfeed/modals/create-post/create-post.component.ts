import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from 'src/app/models/game';

import { PostService } from 'src/app/services/post.service';
import { Post } from '../../../../models/post';

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
 // public withPhoto: boolean = false;
  public withVideo: boolean = false;

  @Input() withPhoto: boolean = false;
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
    if (this.withPhoto){
      const value = this.file.split('\\');
      this.post.contents = [value[value.length - 1]];
    }
    this._postService.createPost(this.post).subscribe(
      (res) => {
        this.close.emit(res);
      },
      (error) => {
        //TODO swalla
        console.log(error);
      },
      
    );
    
  }

  public onCancel(): void {
    this.close.emit(undefined);
  }

}
