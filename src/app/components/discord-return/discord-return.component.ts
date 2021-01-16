import { AuthenticationService } from './../../services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from 'src/app/shared/services/swal.service';

@Component({
  selector: 'app-discord-return',
  templateUrl: './discord-return.component.html',
  styleUrls: ['./discord-return.component.scss'],
})
export class DiscordReturnComponent implements OnInit {
  constructor(
    private swalService: SwalService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    var user = this.authenticationService.currentUser.subscribe(
      (res) => (user = res)
    );
    this.route.queryParams.subscribe((params) =>
      this.userService.discordAuth(params.code).subscribe((res) => {
        if (user) {
          this.swalService
            .showSuccessResult('Success', 'You connected with Discord.')
            .then(() => {
              this.router.navigate([`/profile/${user.id}`]);
            });
        } else {
          this.authenticationService.authenticateId(res).subscribe((_) => {
            this.swalService
              .showSuccessResult('Success', 'You signed in with Discord.')
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
                  });
          });
        }
      })
    );
  }
}
