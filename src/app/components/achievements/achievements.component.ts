import { Component, OnInit } from '@angular/core';
import { Achievement } from '../../models/achievement';
import { AchievementService } from '../../services/achievement.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {
  public achievements: Achievement[];

  constructor(private achievementService: AchievementService) { }

  ngOnInit() {
  }

}
