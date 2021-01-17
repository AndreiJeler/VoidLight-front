export class User {
  public id: number;
  public fullName: string;
  public username: string;
  public email: string;
  public password: string;
  public confirmationPassword: string;
  public avatarPath: string;
  public token?: string;
  public role: string;
  public playedGame: string;
  public age: number;
}
