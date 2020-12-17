import { Comment } from './../../models/comment';
import { User } from './../../models/user';
import { AuthenticationService } from './../../services/authentication.service';
import { PostService } from 'src/app/services/post.service';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  EventEmitter,
} from '@angular/core';

import { Post } from '../../models/post';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() event: EventEmitter<Post>;
  timeString: string;
  public images: string[] = [];
  public videos: string[] = [];
  public user: User;
  public commentText: string;
  public areCommentsVisible: boolean = false;
  public isLiked: boolean;

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

    this.isLiked = this.post.isLiked;
  }

  likeAction(): void {
    this.postService
      .likePost(this.post.id, this.user.id)
      .subscribe((res: number) => {
        this.isLiked = !this.isLiked;
        this.post.likes = res;
      });
  }

  viewComments() {
    this.areCommentsVisible = !this.areCommentsVisible;
  }

  comment(): void {
    const comm = new Comment(
      this.post.id,
      this.user.id,
      undefined,
      this.commentText
    );
    console.log(comm);
    this.postService
      .postComment(comm)
      .pipe(first())
      .subscribe((res) => {
        res.user.avatarPath = 'https://localhost:44324/' + res.user.avatarPath;
        this.post.comments.unshift(res);
      });
  }

  share(): void {
    this.postService
      .postShare(this.post.id, this.user.id)
      .pipe(first())
      .subscribe((res) => {
        console.log(res);
        this.event.emit(res);
      });
  }
}
