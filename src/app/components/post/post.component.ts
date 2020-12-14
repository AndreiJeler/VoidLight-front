import { User } from './../../models/user';
import { AuthenticationService } from './../../services/authentication.service';
import { PostService } from 'src/app/services/post.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { Post } from '../../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  timeString: string;
  public images: string[] = [];
  public videos: string[] = [];
  public user: User;
  public isLiked: boolean = false;

  constructor(
    private postService: PostService,
    private authenticationService: AuthenticationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(
      (user) => (this.user = user)
      
    );
    this.post.contents.forEach((content) => {
      const value = content.split('.');
      if (value[value.length - 1] === 'mp4') {
        this.videos.push(content);
      } else {
        this.images.push(content);
      }
    });
    this.timeString = new Date(this.post.time)
      .toString()
      .split(' ')
      .slice(0, 4)
      .join(' ');
  }

  likeAction(): void {
    this.postService
      .likePost(this.post.id, this.user.id)
      .subscribe((res: number) => {
        this.isLiked = !this.isLiked;
        this.post.likes = res;      
      });
  }
}
