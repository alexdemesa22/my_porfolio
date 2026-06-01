import { Injectable, Optional } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    @Optional() private $gaService?: GoogleAnalyticsService
  ) { }

  sendAnalyticEvent(action: string, category: string, label: string): void {
    this.$gaService?.event(action, category, label)
  }

  sendAnalyticPageView(path: string, title: string): void {
    this.$gaService?.pageView(path, title)
  }

}
