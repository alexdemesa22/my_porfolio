import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

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
    this.calculateYearsOfExperience();
  }

  calculateYearsOfExperience(): void {
    const startDate = new Date(2019, 10, 1); // November 2019 (month is 0-indexed)
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    this.yearsOfExperience = Math.floor(diffYears);
  }

}
