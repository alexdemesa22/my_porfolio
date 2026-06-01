import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import emailjs from '@emailjs/browser';
import { environment } from 'src/environments/environment';

interface ContactFormValue {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  private emailJsConfig = environment.emailJs;

  constructor(
    private fb: FormBuilder,
    public analyticsService: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      const formData = this.contactForm.value as ContactFormValue;
      
      if (!this.emailJsConfig.serviceId || !this.emailJsConfig.templateId || !this.emailJsConfig.publicKey) {
        this.sendViaMailto(formData);
        return;
      }

      emailjs.send(
        this.emailJsConfig.serviceId,
        this.emailJsConfig.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'alexdemesa22@gmail.com'
        },
        this.emailJsConfig.publicKey
      ).then(
        () => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.contactForm.reset();
          this.analyticsService.sendAnalyticEvent('contact_form_submit', 'contact', 'success');
          
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        },
        () => {
          this.isSubmitting = false;
          this.submitError = true;
          this.analyticsService.sendAnalyticEvent('contact_form_submit', 'contact', 'error');
          
          setTimeout(() => {
            this.submitError = false;
          }, 5000);
        }
      );
    }
  }

  private sendViaMailto(formData: ContactFormValue): void {
    const subject = encodeURIComponent('Portfolio Contact from ' + formData.name);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    
    this.openMailClient(`mailto:alexdemesa22@gmail.com?subject=${subject}&body=${body}`);
    
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();
      
      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    }, 1000);
  }

  private openMailClient(mailtoUrl: string): void {
    window.location.href = mailtoUrl;
  }

}
