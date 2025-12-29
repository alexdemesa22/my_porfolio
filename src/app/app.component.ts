import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';
import {LanguageService} from "src/app/services/language/language.service"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'alexander-portfolio';
  showSnow = false;
  snowflakes: any[] = [];
  
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private languageService: LanguageService
    ){
    }
  ngOnInit(): void{
    
    this.languageService.initLanguage()


    this.titleService.setTitle( "Alexander De Mesa | Software Engineer" );

    this.metaService.addTags([
      {name: 'keywords', content: 'Frontend, software, developer, Engineer'},
    ]);
    
    // Check if it's December (month 11 in JavaScript, 0-indexed)
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    
    // Show snow during December until January 2nd
    if (currentMonth === 11 || (currentMonth === 0 && currentDate <= 2)) {
      this.showSnow = true;
      this.generateSnowflakes();
    }
    
    AOS.init(); 

  }

  generateSnowflakes() {
    const numberOfFlakes = 50; // Number of snowflakes
    for (let i = 0; i < numberOfFlakes; i++) {
      this.snowflakes.push({
        left: Math.random() * 100, // Random position from 0-100%
        duration: 5 + Math.random() * 10, // Fall duration 5-15 seconds
        delay: Math.random() * 5, // Delay 0-5 seconds
        size: 10 + Math.random() * 20 // Size 10-30px
      });
    }
  }
}
