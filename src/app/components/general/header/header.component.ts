import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, query, transition, stagger, animate } from '@angular/animations';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { UntypedFormControl } from '@angular/forms';
import { LanguageService } from 'src/app/services/language/language.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[
    trigger("animateMenu",[
      transition(":enter",[
        query("*", [
          style({opacity: 0, transform: "translateY(-50%)"}),
          stagger(50,[
            animate(
              "250ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({opacity: 1, transform: "none"}))
          ])
        ])
      ])
    ])
  ]
})



export class HeaderComponent implements OnInit, OnDestroy {

  responsiveMenuVisible = false;
  pageYPosition = 0;
  languageFormControl: UntypedFormControl = new UntypedFormControl();
  cvName = '';
  isDarkMode = true;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    public analyticsService: AnalyticsService,
    public languageService: LanguageService,
    private modalService: NgbModal,
    public themeService: ThemeService
  ) { }

  ngOnInit(): void {

    this.languageFormControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val: string) => this.languageService.changeLanguage(val));

    this.languageFormControl.setValue(this.languageService.language);

    this.themeService.isDarkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDark => {
        this.isDarkMode = isDark;
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  scroll(el: string): void {
    const targetElement = document.getElementById(el);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/home']).then(() => document.getElementById(el)?.scrollIntoView({ behavior: 'smooth' }));
    }
    this.responsiveMenuVisible = false;
  }

  downloadCV(): void {
    this.languageService.translateService.get('Header.cvName').subscribe((val: string) => {
      this.cvName = val;
      const pdfUrl = `assets/cv/${this.cvName}`;
      
      const modalRef = this.modalService.open(PdfViewerComponent, {
        size: 'xl',
        centered: true,
        windowClass: 'pdf-modal'
      });
      
      modalRef.componentInstance.pdfUrl = pdfUrl;
      this.responsiveMenuVisible = false;
    });
  }

  @HostListener('window:scroll')
  getScrollPosition(): void {
    this.pageYPosition = window.pageYOffset;
  }

  changeLanguage(language: string): void {
    this.languageFormControl.setValue(language);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.analyticsService.sendAnalyticEvent('toggle_theme', 'theme', this.isDarkMode ? 'light' : 'dark');
  }
}
