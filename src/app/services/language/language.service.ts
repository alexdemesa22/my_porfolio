import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language = 'en';

  constructor(
    public translateService: TranslateService,
  ) {}

  initLanguage(): void {
    const language = 'en';
    this.translateService.addLangs([language]);
    this.translateService.setDefaultLang(language);
    this.language = language;
  }

  changeLanguage(language: string): void {
    this.translateService.setDefaultLang(language);
    this.language = language;
  }
}
