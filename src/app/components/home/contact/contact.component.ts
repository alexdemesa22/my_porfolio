import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import emailjs from '@emailjs/browser';

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

  // EmailJS Configuration
  // TODO: Replace these with your actual EmailJS credentials
  // Sign up at https://www.emailjs.com/
  // 1. Create an account
  // 2. Add an email service (Gmail, Outlook, etc.)
  // 3. Create an email template
  // 4. Get your Public Key from Account settings
  private emailJsConfig = {
    serviceId: 'YOUR_SERVICE_ID',        // Replace with your EmailJS Service ID
    templateId: 'YOUR_TEMPLATE_ID',      // Replace with your EmailJS Template ID
    publicKey: 'YOUR_PUBLIC_KEY'         // Replace with your EmailJS Public Key
  };

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

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      const formData = this.contactForm.value;
      
      // Check if EmailJS is configured
      if (this.emailJsConfig.serviceId === 'YOUR_SERVICE_ID') {
        // Fallback to mailto if EmailJS not configured
        this.sendViaMailto(formData);
        return;
      }

      // Send email using EmailJS
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
        (response) => {
          console.log('Email sent successfully!', response.status, response.text);
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.contactForm.reset();
          this.analyticsService.sendAnalyticEvent('contact_form_submit', 'contact', 'success');
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        },
        (error) => {
          console.error('Failed to send email:', error);
          this.isSubmitting = false;
          this.submitError = true;
          this.analyticsService.sendAnalyticEvent('contact_form_submit', 'contact', 'error');
          
          // Hide error message after 5 seconds
          setTimeout(() => {
            this.submitError = false;
          }, 5000);
        }
      );
    }
  }

  private sendViaMailto(formData: any) {
    // Fallback mailto method
    const subject = encodeURIComponent('Portfolio Contact from ' + formData.name);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    
    window.location.href = `mailto:alexdemesa22@gmail.com?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();
      
      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    }, 1000);
  }

}
