import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('statsSection') statsSection: ElementRef<HTMLElement>;

  stats = [
    { value: 0, target: 6, suffix: '+', label: 'Years Experience', icon: 'fas fa-calendar-alt' },
    { value: 0, target: 50, suffix: '+', label: 'Projects Completed', icon: 'fas fa-code' },
    { value: 0, target: 20, suffix: '+', label: 'Technologies Mastered', icon: 'fas fa-tools' },
    { value: 0, target: 100, suffix: '%', label: 'Client Satisfaction', icon: 'fas fa-smile' }
  ];

  private observer?: IntersectionObserver;
  private hasAnimated = false;
  private counterTimers: number[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      this.setFinalValues();
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || this.hasAnimated) {
          return;
        }

        this.animateCounters();
        this.observer?.disconnect();
      },
      { threshold: 0.35 }
    );

    this.observer.observe(this.statsSection.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.counterTimers.forEach(timer => window.clearInterval(timer));
  }

  animateCounters(): void {
    if (this.hasAnimated) {
      return;
    }

    this.hasAnimated = true;

    this.stats.forEach((stat, index) => {
      const increment = stat.target / 50;
      const timer = window.setInterval(() => {
        stat.value += increment;
        if (stat.value >= stat.target) {
          stat.value = stat.target;
          window.clearInterval(timer);
        }
      }, 30 + (index * 10));
      this.counterTimers.push(timer);
    });
  }

  private setFinalValues(): void {
    this.stats.forEach(stat => {
      stat.value = stat.target;
    });
    this.hasAnimated = true;
  }
}
