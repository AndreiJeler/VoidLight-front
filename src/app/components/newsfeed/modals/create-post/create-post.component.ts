import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { PostService } from 'src/app/services/post.service';
import { Post } from '../../../../models/post';

@Component({
  selector: 'create-post-modal',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  public post: Post;

  @Output() close = new EventEmitter<boolean>();

  constructor(private _postService: PostService) { }

  public ngOnInit() {
    this.post = new Post();
  }

  public onSave(): void {
    this._postService.createPost(this.post).subscribe(
      () => {
        alert("GJ FAM");
        console.log(this.post);
      }, // here we will add the swalpart
      (error) => {
        console.log(error);
      },
    );
  }

  public onCancel(): void {
    this.close.emit(false);
  }

}
