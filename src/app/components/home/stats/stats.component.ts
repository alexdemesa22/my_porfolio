import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  stats = [
    { value: 0, target: 6, suffix: '+', label: 'Years Experience', icon: 'fas fa-calendar-alt' },
    { value: 0, target: 50, suffix: '+', label: 'Projects Completed', icon: 'fas fa-code' },
    { value: 0, target: 20, suffix: '+', label: 'Technologies Mastered', icon: 'fas fa-tools' },
    { value: 0, target: 100, suffix: '%', label: 'Client Satisfaction', icon: 'fas fa-smile' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.animateCounters();
  }

  animateCounters(): void {
    this.stats.forEach((stat, index) => {
      const increment = stat.target / 50;
      const timer = setInterval(() => {
        stat.value += increment;
        if (stat.value >= stat.target) {
          stat.value = stat.target;
          clearInterval(timer);
        }
      }, 30 + (index * 10));
    });
  }
}
