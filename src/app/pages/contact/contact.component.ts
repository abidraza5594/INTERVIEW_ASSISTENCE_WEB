import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  template: `
    <div class="contact-container">
      <div class="hero-section">
        <h1>Contact & Payment</h1>
        <p>Get in touch with our team for support, payments, questions, or feedback</p>
      </div>

      <div class="contact-content">
        <div class="contact-grid">
          <!-- Contact Form -->
          <mat-card class="contact-form-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>email</mat-icon>
              <mat-card-title>Send us a Message</mat-card-title>
              <mat-card-subtitle>We'll get back to you within 24 hours</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Name</mat-label>
                  <input matInput formControlName="name" placeholder="Your full name">
                  <mat-error *ngIf="contactForm.get('name')?.hasError('required')">
                    Name is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Email</mat-label>
                  <input matInput type="email" formControlName="email" placeholder="your@email.com">
                  <mat-error *ngIf="contactForm.get('email')?.hasError('required')">
                    Email is required
                  </mat-error>
                  <mat-error *ngIf="contactForm.get('email')?.hasError('email')">
                    Please enter a valid email
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Subject</mat-label>
                  <mat-select formControlName="subject">
                    <mat-option value="payment">Payment & Purchase Time</mat-option>
                    <mat-option value="billing">Billing & Account Issues</mat-option>
                    <mat-option value="technical-support">Technical Support</mat-option>
                    <mat-option value="feature-request">Feature Request</mat-option>
                    <mat-option value="bug-report">Bug Report</mat-option>
                    <mat-option value="general">General Inquiry</mat-option>
                    <mat-option value="partnership">Partnership</mat-option>
                  </mat-select>
                  <mat-error *ngIf="contactForm.get('subject')?.hasError('required')">
                    Please select a subject
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Message</mat-label>
                  <textarea matInput formControlName="message" rows="6" 
                           placeholder="Please describe your question or issue in detail..."></textarea>
                  <mat-error *ngIf="contactForm.get('message')?.hasError('required')">
                    Message is required
                  </mat-error>
                  <mat-error *ngIf="contactForm.get('message')?.hasError('minlength')">
                    Message must be at least 10 characters long
                  </mat-error>
                </mat-form-field>

                <button mat-raised-button color="primary" type="submit" 
                        [disabled]="contactForm.invalid || isSubmitting" class="submit-button">
                  <mat-icon *ngIf="!isSubmitting">send</mat-icon>
                  <mat-icon *ngIf="isSubmitting" class="spinning">refresh</mat-icon>
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </button>
              </form>
            </mat-card-content>
          </mat-card>

          <!-- Contact Information -->
          <div class="contact-info">
            <mat-card class="info-card">
              <mat-card-header>
                <mat-icon mat-card-avatar>support</mat-icon>
                <mat-card-title>Get Support</mat-card-title>
                <mat-card-subtitle>Multiple ways to reach us</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="contact-methods">
                  <div class="contact-method">
                    <mat-icon>email</mat-icon>
                    <div class="method-info">
                      <h4>Email Support</h4>
                      <p>{{ contact.email }}</p>
                      <a mat-button color="primary" [href]="'mailto:' + contact.email">
                        Send Email
                      </a>
                    </div>
                  </div>

                  <div class="contact-method">
                    <mat-icon>chat</mat-icon>
                    <div class="method-info">
                      <h4>WhatsApp Support & Payment</h4>
                      <p>+91 {{ contact.whatsapp }}</p>
                      <p class="payment-note">💳 Quick payment processing available</p>
                      <a mat-button color="primary"
                         [href]="'https://wa.me/91' + contact.whatsapp + '?text=Hi, I want to purchase AI Assistant time'" target="_blank">
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>

                  <div class="contact-method">
                    <mat-icon>schedule</mat-icon>
                    <div class="method-info">
                      <h4>Response Time</h4>
                      <p>We typically respond within 2-4 hours during business hours</p>
                      <p class="business-hours">Mon-Fri: 9 AM - 6 PM IST</p>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>

            <mat-card class="info-card">
              <mat-card-header>
                <mat-icon mat-card-avatar>help</mat-icon>
                <mat-card-title>Quick Help</mat-card-title>
                <mat-card-subtitle>Common questions and resources</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="quick-help">
                  <div class="help-item">
                    <mat-icon>description</mat-icon>
                    <div>
                      <h4>Documentation</h4>
                      <p>Complete user guide and tutorials</p>
                      <a mat-button routerLink="/documentation">View Docs</a>
                    </div>
                  </div>

                  <div class="help-item">
                    <mat-icon>download</mat-icon>
                    <div>
                      <h4>Download Issues</h4>
                      <p>Having trouble downloading the app?</p>
                      <a mat-button routerLink="/download">Download Page</a>
                    </div>
                  </div>

                  <div class="help-item">
                    <mat-icon>vpn_key</mat-icon>
                    <div>
                      <h4>API Key Setup</h4>
                      <p>Need help configuring your API keys?</p>
                      <a mat-button routerLink="/api-keys">API Keys Guide</a>
                    </div>
                  </div>

                  <div class="help-item">
                    <mat-icon>payment</mat-icon>
                    <div>
                      <h4>Billing Questions</h4>
                      <p>Questions about pricing or payments?</p>
                      <a mat-button routerLink="/pricing">View Pricing</a>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </div>

        <!-- FAQ Section -->
        <mat-card class="faq-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>quiz</mat-icon>
            <mat-card-title>Frequently Asked Questions</mat-card-title>
            <mat-card-subtitle>Quick answers to common questions</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="faq-grid">
              <div class="faq-item">
                <h4>How do I get started?</h4>
                <p>Register for an account, configure your API keys, download the application, and start your first session.</p>
              </div>
              <div class="faq-item">
                <h4>What AI models are supported?</h4>
                <p>We support Google Gemini, OpenAI GPT, Mistral AI, and OpenRouter with automatic fallback between models.</p>
              </div>
              <div class="faq-item">
                <h4>Is my data secure?</h4>
                <p>Yes, your API keys are encrypted and stored securely. We don't log conversations or store personal data unnecessarily.</p>
              </div>
              <div class="faq-item">
                <h4>Can I get a refund?</h4>
                <p>Yes, we offer a satisfaction guarantee. Contact us within 24 hours of your session if you're not satisfied.</p>
              </div>
              <div class="faq-item">
                <h4>Do you offer technical support?</h4>
                <p>Yes, we provide comprehensive technical support via email and WhatsApp during business hours.</p>
              </div>
              <div class="faq-item">
                <h4>How does the stealth mode work?</h4>
                <p>Stealth mode makes the application window transparent and provides hotkeys for discreet usage during interviews.</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
      min-height: 100vh;
      padding-top: 64px;
      background-color: #f5f5f5;
    }

    .hero-section {
      background: linear-gradient(135deg, #3f51b5, #2196f3);
      color: white;
      padding: 80px 24px 60px;
      text-align: center;
    }

    .hero-section h1 {
      font-size: 3rem;
      margin-bottom: 16px;
      font-weight: 600;
    }

    .hero-section p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }

    .contact-content {
      max-width: 1200px;
      margin: -40px auto 0;
      padding: 0 24px 80px;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      margin-bottom: 32px;
    }

    .contact-form-card {
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .full-width {
      width: 100%;
    }

    .submit-button {
      padding: 16px 32px !important;
      font-size: 16px !important;
      font-weight: 600 !important;
      margin-top: 16px;
    }

    .spinning {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .info-card {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .contact-method {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .contact-method mat-icon {
      color: #3f51b5;
      font-size: 24px;
      width: 24px;
      height: 24px;
      margin-top: 4px;
    }

    .method-info h4 {
      margin: 0 0 8px 0;
      color: #333;
      font-size: 1.1rem;
    }

    .method-info p {
      margin: 0 0 12px 0;
      color: #666;
      line-height: 1.5;
    }

    .business-hours {
      font-size: 0.9rem;
      color: #888 !important;
    }

    .payment-note {
      font-size: 0.9rem;
      color: #4caf50 !important;
      font-weight: 500;
    }

    .quick-help {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .help-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #fafafa;
    }

    .help-item mat-icon {
      color: #3f51b5;
      font-size: 20px;
      width: 20px;
      height: 20px;
      margin-top: 2px;
    }

    .help-item h4 {
      margin: 0 0 4px 0;
      color: #333;
      font-size: 1rem;
    }

    .help-item p {
      margin: 0 0 8px 0;
      color: #666;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .faq-card {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .faq-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .faq-item {
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #3f51b5;
    }

    .faq-item h4 {
      margin: 0 0 12px 0;
      color: #3f51b5;
      font-size: 1.1rem;
    }

    .faq-item p {
      margin: 0;
      color: #666;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .contact-content {
        padding: 0 16px 60px;
        margin: -20px auto 0;
      }

      .hero-section {
        padding: 60px 16px 40px;
      }

      .hero-section h1 {
        font-size: 2rem;
      }

      .hero-section p {
        font-size: 1rem;
        padding: 0 16px;
      }

      .contact-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .faq-grid {
        grid-template-columns: 1fr;
      }

      .contact-method {
        flex-direction: column;
        text-align: center;
        padding: 16px;
      }

      .help-item {
        flex-direction: column;
        text-align: center;
        padding: 16px;
      }

      .contact-form {
        gap: 12px;
      }

      .submit-button {
        padding: 12px 24px !important;
        font-size: 14px !important;
      }

      .method-info h4 {
        font-size: 1rem;
      }

      .method-info p {
        font-size: 0.9rem;
      }
    }

    @media (max-width: 480px) {
      .hero-section h1 {
        font-size: 1.8rem;
      }

      .contact-content {
        margin: -10px auto 0;
        padding: 0 12px 40px;
      }

      .contact-form-card,
      .info-card,
      .faq-card {
        margin: 0 -4px;
      }

      .contact-method,
      .help-item {
        padding: 12px;
      }
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  contact = environment.contact;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real application, you would send this data to your backend
        const formData = this.contactForm.value;
        console.log('Contact form submitted:', formData);
        
        this.snackBar.open('Message sent successfully! We\'ll get back to you soon.', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        
        this.contactForm.reset();
      } catch (error) {
        this.snackBar.open('Failed to send message. Please try again.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
