import { Constants } from './../../../../shared/utils/constants';
import { FriendRequest } from './../../../../models/friend-request';
import { FriendsService } from './../../../../services/friends.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.scss'],
})
export class FriendRequestsComponent implements OnInit {
  @Input() userId: number;
  @Output() close = new EventEmitter<boolean>();
  public friends: User[];

  constructor(private friendsService: FriendsService) {}

  ngOnInit(): void {
    this._loadFriendRequests();
  }

  private _loadFriendRequests() {
    this.friendsService
      .getFriendRequestsForUser(this.userId)
      .subscribe((friends) => {
        friends.forEach(
          (friend) =>
            (friend.avatarPath =
              `${Constants.SERVER_BASE_URL}/` + friend.avatarPath)
        );

        this.friends = friends;
      });
  }

  public confirm(friendId: number) {
    const request = new FriendRequest(friendId, this.userId);
    this.friendsService.acceptFriendRequest(request).subscribe((_) => {
      this.friends = this.friends.filter((friend) => friend.id != friendId);
    });
  }

  public decline(friendId: number) {
    const request = new FriendRequest(friendId, this.userId);
    this.friendsService.declineFriendRequest(request).subscribe((_) => {
      this.friends = this.friends.filter((friend) => friend.id != friendId);
    });
  }

  public onCancel(): void {
    this.close.emit(undefined);
  }
}
