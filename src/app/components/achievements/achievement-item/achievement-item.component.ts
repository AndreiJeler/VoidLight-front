import { Component, OnInit, Input } from '@angular/core';
import { Achievement } from '../../../models/achievement';

@Component({
  selector: 'app-achievement-item',
  templateUrl: './achievement-item.component.html',
  styleUrls: ['./achievement-item.component.scss']
})
export class AchievementItemComponent implements OnInit {
  @Input() achievement: Achievement;

  constructor() { }

  ngOnInit() {
    console.log(this.achievement);
  }

}
