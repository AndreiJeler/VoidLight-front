import { PostsHubService } from './../../shared/services/posts-hub.service';
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
  Output,
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
  @Output() event = new EventEmitter<Post>();
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
    private cdr: ChangeDetectorRef,
    private postsHubService: PostsHubService
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
    this.post.originalUserAvatar =
      'https://localhost:44324/' + this.post.originalUserAvatar;

    this.isLiked = this.post.isLiked;
    this.postsHubService.startConnection();
    const callback = (data) => {
      this.post.likes = data;
      this.isLiked = !this.isLiked;
    };
    this.postsHubService.addLikeListener(this.post.id, callback);
  }

  likeAction(): void {
    this.postService
      .likePost(this.post.id, this.user.id)
      .subscribe((res: number) => {
        // this.isLiked = !this.isLiked;
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
        res.avatarPath = 'https://localhost:44324/' + res.avatarPath;
        this.event.emit(res);
      });
  }
}
