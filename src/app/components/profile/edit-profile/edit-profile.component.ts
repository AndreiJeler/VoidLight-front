import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
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


  constructor(private userService: UserService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.fullName = this.user.fullName;
    this.email = this.user.email;
    this.password = this.user.password;
    this.avatarPath = this.user.avatarPath;
  }

  onCancel(): void {
    this.close.emit(undefined);
  }

  onSave(): void {
    const formData = new FormData();

    this.user.fullName = this.fullName;
    this.user.email = this.email;
    this.user.password = this.password;

    formData.append('user', JSON.stringify(this.user));
    this.userService.updateUser(formData).subscribe();
    location.reload();
  }

  chooseImage(): void {

  }

  openPasswordModal(changePasswordModal: TemplateRef<any>): void {
    this.passwordModalRef = this.modalService.show(changePasswordModal);
  }

  onSavePassword(): void {
    if (this.oldPassword === this.password) {
      this.password = this.newPassword;
    }
    this.passwordModalRef.hide();
  }

  onClosePasswordModal(): void {
    this.passwordModalRef.hide();
  }
}
