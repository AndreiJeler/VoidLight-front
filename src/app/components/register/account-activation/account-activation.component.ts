import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SwalService } from 'src/app/shared/services/swal.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit {
  private _token: string;

  constructor(
    private swalService: SwalService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this._token = params.token;
      this.userService.activateUserAccount(this._token).subscribe(
        (_) => this.swalService.showSuccessResult("Success", "Your account has been activated ;)")
          .then(() => { this.router.navigate(["/login"]) }),
        (error) => this.swalService.showErrorResult("Error", "Oopsie Daisy we have encountered a problem X(")
          .then(() => { this.router.navigate(["/login"]) }),
      );
    });
  }
}

