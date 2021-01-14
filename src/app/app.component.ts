import { Component } from '@angular/core';
import { slideInAnimation} from './shared/utils/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation,
  ]
})
export class AppComponent {
  title = 'web-app';
  
  prepareRoute(outlet: RouterOutlet) {
    console.log("fasfasfsafsafa");
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
