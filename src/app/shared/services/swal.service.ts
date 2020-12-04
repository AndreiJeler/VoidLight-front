import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

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
      title: success
    });
  }
}
