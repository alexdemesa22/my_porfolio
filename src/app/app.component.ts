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
    
    
    AOS.init(); 

  }
}
