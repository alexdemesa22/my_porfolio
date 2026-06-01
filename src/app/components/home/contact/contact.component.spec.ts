import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ContactComponent } from './contact.component';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactComponent ],
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: AnalyticsService,
          useValue: { sendAnalyticEvent: jasmine.createSpy('sendAnalyticEvent') },
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps submit disabled while the form is invalid', () => {
    expect(component.contactForm.invalid).toBeTrue();
  });

  it('falls back to a mailto link when EmailJS is not configured', () => {
    spyOn<any>(component, 'openMailClient');
    jasmine.clock().install();

    component.contactForm.setValue({
      name: 'Alex',
      email: 'alex@example.com',
      message: 'Hello',
    });

    component.onSubmit();
    jasmine.clock().tick(1000);

    expect((component as any).openMailClient).toHaveBeenCalledWith(jasmine.stringMatching(/^mailto:/));
    expect(component.submitSuccess).toBeTrue();
    jasmine.clock().uninstall();
  });
});
