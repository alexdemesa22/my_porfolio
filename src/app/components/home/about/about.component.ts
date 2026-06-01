import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { calculateYearsOfExperience } from 'src/app/utils/experience';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  yearsOfExperience: number;

  constructor(
    public analyticsService: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.yearsOfExperience = calculateYearsOfExperience();
  }

}
