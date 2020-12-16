import { SwalService } from './../../shared/services/swal.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-steam-return',
  templateUrl: './steam-return.component.html',
  styleUrls: ['./steam-return.component.scss'],
})
export class SteamReturnComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private swalService: SwalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const id = params.id;
      if (!id) {
        this.swalService
          .showSuccessResult('Success', 'You signed up with Steam.')
          .then(() => {
            this.router.navigate(['/login']);
          });
        return;
      }
      this.authenticationService.authenticateId(id).subscribe(
        (_) =>
          this.swalService
            .showSuccessResult('Success', 'You signed in with Steam.')
            .then(() => {
              this.router.navigate(['/newsfeed']);
            }),
        (error) =>
          this.swalService
            .showErrorResult(
              'Error',
              'Oopsie Daisy we have encountered a problem X('
            )
            .then(() => {
              this.router.navigate(['/login']);
            })
      );
    });
  }
}
