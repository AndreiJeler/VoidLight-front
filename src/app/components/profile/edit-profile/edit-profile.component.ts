import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() user: User;
  @Output() close = new EventEmitter<User>();

  passwordModalRef: BsModalRef;

  public fullName: string;
  public email: string;
  public password: string;
  public avatarPath: string;
  public oldPassword: string;
  public newPassword: string;
  public confirmPassword: string;
  public age: number;
  public file: File;
  public steamKnown: string;
  public discordKnown: string;

  constructor(
    private userService: UserService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.fullName = this.user.fullName;
    this.email = this.user.email;
    this.password = this.user.password;
    this.avatarPath = this.user.avatarPath;
    this.age = this.user.age;
    this.isConnected();
  }

  onCancel(): void {
    this.close.emit(undefined);
  }

  onSave(): void {
    const formData = new FormData();

    this.user.fullName = this.fullName;
    this.user.email = this.email;
    this.user.password = this.password;
    this.user.age = this.age;

    // if (this.file) {
    //   f
    // }
    if (this.file) {
      formData.append(this.file.name, this.file, this.file.name);

      // this.user.avatarPath = this.file.name;
    }

    formData.append('user', JSON.stringify(this.user));
    this.userService.updateUser(formData).subscribe(() => {
      location.reload();
    });
  }

  openPasswordModal(changePasswordModal: TemplateRef<any>): void {
    this.passwordModalRef = this.modalService.show(changePasswordModal);
  }

  onSavePassword(): void {
    if (
      this.oldPassword === this.password &&
      this.newPassword === this.confirmPassword
    ) {
      this.password = this.newPassword;
      this.passwordModalRef.hide();
    } else {
      Swal.fire('Passwords do not match');
    }
  }

  onClosePasswordModal(): void {
    this.passwordModalRef.hide();
  }

  public uploadImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      const value = this.file.name.split('\\');
      // console.log(this.file);
      document.getElementById('selected-file').innerHTML = this.file.name;
      // this.labelText = value[value.length - 1];
    }
  }

  public isConnected() {
    this.userService
      .checkSteamConnected(this.user.id)
      .subscribe((res) => (this.steamKnown = res.knownAs));
    this.userService.checkDiscordConnected(this.user.id).subscribe((res) => {
      this.discordKnown = res.knownAs;
      console.log(res);
    });
  }
  //
  // uploadImage(event: any): void {
  //   this.file = event.target.files[0];
  //   document.getElementById('selected-file').innerHTML = this.file.name;
  // }
}
