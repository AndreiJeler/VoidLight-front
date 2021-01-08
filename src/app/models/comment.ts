import { User } from './user';
export class Comment {
  postId: number;
  userId: number;
  user: User;
  commentText: string;

  constructor(postId, userId, user, text) {
    this.postId = postId;
    this.user = user;
    this.userId = userId;
    this.commentText = text;
  }
}
