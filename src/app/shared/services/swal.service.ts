import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/src/sweetalert2.js';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  private _swalNotificationCorner: typeof Swal;

  constructor() {
    this._swalNotificationCorner = Swal.mixin({
      toast: true,
      position: 'top-end',
      customClass: {
        popup: 'notification-swal',
      },
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  }

  public showErrorNotification(error = 'Error'): void {
    this._swalNotificationCorner.fire({
      icon: 'error',
      title: error,
    });
  }

  public showSuccessNotification(success = 'Success'): void {
    this._swalNotificationCorner.fire({
      icon: 'success',
      title: success,
    });
  }

  public showSuccessResult(title: string, message: string): any {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      customClass: {
        popup: 'notification-swal',
      },
    });
  }

  public showErrorResult(title: string, message: string): any {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      customClass: {
        popup: 'notification-swal',
      },
    });
  }

  public showFriendNotification(message: string): void {
    this._swalNotificationCorner.fire({
      icon: 'info',
      title: message,
    });
  }

  public createLobbyNotification(message) {
    return Swal.fire({
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });
  }

  public resetPassword() {
    return Swal.fire({
      title: 'Enter your email',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Reset',
      showLoaderOnConfirm: true,
    });
  }
}
