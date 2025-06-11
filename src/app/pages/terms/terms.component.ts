import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule],
  template: `
    <div class="terms-container">
      <div class="hero-section">
        <h1>Terms of Service</h1>
        <p>Last updated: {{ lastUpdated }}</p>
      </div>

      <div class="terms-content">
        <mat-card class="terms-card">
          <mat-card-content>
            <section class="terms-section">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Abid Ansari AI Assistant service ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section class="terms-section">
              <h2>2. Description of Service</h2>
              <p>
                Abid Ansari AI Assistant is a desktop application that provides AI-powered assistance for technical interviews and coding challenges. The service includes:
              </p>
              <ul>
                <li>AI-powered question answering using multiple AI models</li>
                <li>Screenshot analysis with computer vision capabilities</li>
                <li>Secure API key management</li>
                <li>Stealth mode functionality for discreet usage</li>
                <li>User account management and session tracking</li>
              </ul>
            </section>

            <section class="terms-section">
              <h2>3. User Accounts and Registration</h2>
              <p>
                To use our service, you must:
              </p>
              <ul>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Be responsible for all activities that occur under your account</li>
                <li>Use only one account per device (device restrictions apply)</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section class="terms-section">
              <h2>4. API Keys and Third-Party Services</h2>
              <p>
                Our service requires you to provide your own API keys for third-party AI services including but not limited to:
              </p>
              <ul>
                <li>Google Gemini API</li>
                <li>OpenAI API</li>
                <li>Mistral AI API</li>
                <li>OpenRouter API</li>
              </ul>
              <p>
                You are responsible for:
              </p>
              <ul>
                <li>Obtaining valid API keys from these providers</li>
                <li>Complying with the terms of service of these third-party providers</li>
                <li>Any costs associated with API usage</li>
                <li>Keeping your API keys secure and confidential</li>
              </ul>
            </section>

            <section class="terms-section">
              <h2>5. Payment and Billing</h2>
              <p>
                Our service operates on a pay-per-session model:
              </p>
              <ul>
                <li>Each interview session costs ₹200</li>
                <li>Payment is required before starting a session</li>
                <li>Sessions are limited to 2 hours maximum duration</li>
                <li>No refunds are provided except in cases of technical failure on our part</li>
                <li>Prices may change with 30 days notice</li>
              </ul>
            </section>

            <section class="terms-section">
              <h2>6. Acceptable Use Policy</h2>
              <p>
                You agree not to use the service to:
              </p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit malicious code or harmful content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the service for any illegal or unethical purposes</li>
                <li>Share your account credentials with others</li>
                <li>Reverse engineer or attempt to extract our source code</li>
              </ul>
            </section>

            <section class="terms-section">
              <h2>7. Privacy and Data Protection</h2>
              <p>
                We are committed to protecting your privacy:
              </p>
              <ul>
                <li>We do not store or log your conversations with AI models</li>
                <li>API keys are encrypted and stored securely</li>
                <li>Personal information is collected only as necessary for service provision</li>
                <li>We comply with applicable data protection regulations</li>
                <li>You can request deletion of your data at any time</li>
              </ul>
            </section>

            <section class="terms-section">
              <h2>8. Intellectual Property</h2>
              <p>
                The service and its original content, features, and functionality are and will remain the exclusive property of Abid Ansari AI Assistant and its licensors. The service is protected by copyright, trademark, and other laws.
              </p>
            </section>

            <section class="terms-section">
              <h2>9. Disclaimers and Limitations</h2>
              <p>
                The service is provided "as is" without warranties of any kind:
              </p>
              <ul>
                <li>We do not guarantee the accuracy of AI responses</li>
                <li>Service availability may be interrupted for maintenance</li>
                <li>Third-party API services may be unavailable</li>
                <li>We are not responsible for interview outcomes</li>
                <li>Use of the service during interviews is at your own risk</li>
              </ul>
            </section>

            <section class="terms-section">
              <h2>10. Limitation of Liability</h2>
              <p>
                In no event shall Abid Ansari AI Assistant be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
              </p>
            </section>

            <section class="terms-section">
              <h2>11. Termination</h2>
              <p>
                We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p>
                Upon termination, your right to use the service will cease immediately. If you wish to terminate your account, you may simply discontinue using the service.
              </p>
            </section>

            <section class="terms-section">
              <h2>12. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section class="terms-section">
              <h2>13. Governing Law</h2>
              <p>
                These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions. Any disputes arising from these terms will be subject to the jurisdiction of Indian courts.
              </p>
            </section>

            <section class="terms-section">
              <h2>14. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul>
                <li>Email: abid810418&#64;gmail.com</li>
                <li>WhatsApp: +91 8104184175</li>
                <li>Website: <a routerLink="/contact">Contact Form</a></li>
              </ul>
            </section>

            <section class="terms-section">
              <h2>15. Severability</h2>
              <p>
                If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section class="terms-section">
              <h2>16. Entire Agreement</h2>
              <p>
                These Terms constitute the entire agreement between you and Abid Ansari AI Assistant regarding the use of the service, superseding any prior agreements between you and us relating to your use of the service.
              </p>
            </section>
          </mat-card-content>
        </mat-card>

        <div class="back-to-top">
          <a href="#top" class="back-link">
            <mat-icon>keyboard_arrow_up</mat-icon>
            Back to Top
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .terms-container {
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
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .terms-content {
      max-width: 800px;
      margin: -40px auto 0;
      padding: 0 24px 80px;
    }

    .terms-card {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      margin-bottom: 32px;
    }

    .terms-section {
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 1px solid #e0e0e0;
    }

    .terms-section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .terms-section h2 {
      color: #3f51b5;
      font-size: 1.5rem;
      margin-bottom: 16px;
      font-weight: 600;
    }

    .terms-section p {
      color: #333;
      line-height: 1.7;
      margin-bottom: 16px;
    }

    .terms-section ul {
      color: #333;
      line-height: 1.7;
      margin: 16px 0;
      padding-left: 24px;
    }

    .terms-section li {
      margin-bottom: 8px;
    }

    .terms-section a {
      color: #3f51b5;
      text-decoration: none;
    }

    .terms-section a:hover {
      text-decoration: underline;
    }

    .back-to-top {
      text-align: center;
      margin-top: 32px;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #3f51b5;
      text-decoration: none;
      font-weight: 500;
      padding: 12px 24px;
      border: 2px solid #3f51b5;
      border-radius: 24px;
      transition: all 0.3s ease;
    }

    .back-link:hover {
      background-color: #3f51b5;
      color: white;
    }

    @media (max-width: 768px) {
      .terms-content {
        padding: 0 16px 60px;
      }

      .hero-section {
        padding: 60px 16px 40px;
      }

      .hero-section h1 {
        font-size: 2rem;
      }

      .terms-section h2 {
        font-size: 1.3rem;
      }

      .terms-section ul {
        padding-left: 20px;
      }
    }
  `]
})
export class TermsComponent {
  lastUpdated = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}
