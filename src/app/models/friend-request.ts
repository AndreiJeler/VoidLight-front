export class FriendRequest {
  public initializerId: number;
  public receiverId: number;

  constructor(initId, recId) {
    this.initializerId = initId;
    this.receiverId = recId;
  }
}
