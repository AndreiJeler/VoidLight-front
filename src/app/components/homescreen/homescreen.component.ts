import { trigger, transition, style, query, animateChild,group, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss']
})
export class HomescreenComponent implements OnInit {

  constructor( private route: ActivatedRoute,
    protected router: Router) { }

  ngOnInit(): void {
  }

  public fireApp(){
    this.router.navigate(['\login']);
  }
}
