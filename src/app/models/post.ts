import { Comment } from './comment';

export class Post {
  public id: number;
  public time: Date;
  public game: string;
  public text: string;
  public likes: number;
  public contents: string[];
  public username: string;
  public avatarPath: string;
  public userId: number;
  public comments: Comment[];
  public originalUser: string;
  public originalUserAvatar: string;
  public isShared: boolean;
  public isLiked: boolean;
}

//TODO add foking constructor GULII
