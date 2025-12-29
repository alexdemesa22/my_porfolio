import { Component, OnInit, AfterViewInit } from '@angular/core';

import {trigger, state, style, animate, transition, stagger, query } from "@angular/animations"
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [
    trigger('bannerTrigger', [
      transition(":enter", [
        query("*", [
          style({ opacity: 0, transform: "translateX(-50px)" }),
          stagger(50, [
            animate(
              "250ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({ opacity: 1, transform: "none" })
            )
          ])
        ])
      ])
    ])
  ]
})
export class BannerComponent implements OnInit {
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

  scroll(el: string) {
    if (document.getElementById(el)) {
      document.getElementById(el).scrollIntoView({ behavior: 'smooth' });
    }
  }
  

}
