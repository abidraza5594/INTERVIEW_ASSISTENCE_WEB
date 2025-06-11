import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <div class="pricing-container">
      <div class="hero-section">
        <h1>Simple, Transparent Pricing</h1>
        <p>Choose between pay-per-session or monthly subscription. No hidden fees.</p>
      </div>

      <div class="pricing-section">
        <div class="pricing-grid">
          <!-- Pay Per Session -->
          <div class="pricing-card">
            <mat-card class="pricing-card-content">
              <mat-card-header>
                <mat-icon mat-card-avatar class="pricing-icon session-icon">smart_toy</mat-icon>
                <mat-card-title>Per Interview Session</mat-card-title>
                <mat-card-subtitle>Pay as you go</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="price-display">
                  <span class="currency">{{ pricing.currency }}</span>
                  <span class="amount">{{ pricing.sessionPrice }}</span>
                  <span class="period">per session</span>
                </div>

                <div class="price-features">
                  <div class="feature-item">
                    <mat-icon>schedule</mat-icon>
                    <span>5 minutes free trial</span>
                  </div>
                  <div class="feature-item">
                    <mat-icon>access_time</mat-icon>
                    <span>Up to 2 hours per session</span>
                  </div>
                  <div class="feature-item">
                    <mat-icon>api</mat-icon>
                    <span>All AI models supported</span>
                  </div>
                  <div class="feature-item">
                    <mat-icon>security</mat-icon>
                    <span>Your own API keys</span>
                  </div>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <a mat-raised-button color="primary" routerLink="/register" class="cta-button">
                  Get Started
                </a>
              </mat-card-actions>
            </mat-card>
          </div>

          <!-- Monthly Subscription -->
          <div class="pricing-card featured">
            <div class="popular-badge">Most Popular</div>
            <mat-card class="pricing-card-content">
              <mat-card-header>
                <mat-icon mat-card-avatar class="pricing-icon subscription-icon">star</mat-icon>
                <mat-card-title>Monthly Subscription</mat-card-title>
                <mat-card-subtitle>Best value for regular users</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="price-display">
                  <span class="currency">{{ pricing.currency }}</span>
                  <span class="amount">{{ pricing.monthlySubscription }}</span>
                  <span class="period">per month</span>
                </div>

                <div class="savings-info">
                  <mat-chip color="accent">Save up to 80%</mat-chip>
                  <span class="savings-text">Equivalent to 5+ sessions</span>
                </div>

              <div class="features-list">
                <div class="feature-item">
                  <mat-icon>check_circle</mat-icon>
                  <span>Unlimited AI questions during session</span>
                </div>
                <div class="feature-item">
                  <mat-icon>check_circle</mat-icon>
                  <span>Screenshot analysis with AI vision</span>
                </div>
                <div class="feature-item">
                  <mat-icon>check_circle</mat-icon>
                  <span>Multiple AI models (Gemini, OpenAI, Mistral)</span>
                </div>
                <div class="feature-item">
                  <mat-icon>check_circle</mat-icon>
                  <span>Stealth mode for interviews</span>
                </div>
                <div class="feature-item">
                  <mat-icon>check_circle</mat-icon>
                  <span>Hotkey controls</span>
                </div>
                <div class="feature-item">
                  <mat-icon>check_circle</mat-icon>
                  <span>Secure API key management</span>
                </div>
                <div class="feature-item">
                  <mat-icon>check_circle</mat-icon>
                  <span>Technical interview optimization</span>
                </div>
                <div class="feature-item">
                  <mat-icon>check_circle</mat-icon>
                  <span>Real-time assistance</span>
                </div>
              </div>

              <div class="session-info">
                <mat-chip-set>
                  <mat-chip>
                    <mat-icon>schedule</mat-icon>
                    Session Duration: Up to 2 hours
                  </mat-chip>
                  <mat-chip>
                    <mat-icon>security</mat-icon>
                    Your API Keys Required
                  </mat-chip>
                </mat-chip-set>
              </div>
            </mat-card-content>
            <mat-card-actions>
              <a mat-raised-button color="primary" routerLink="/register" class="cta-button">
                Get Started Now
              </a>
              <a mat-button routerLink="/download" class="secondary-button">
                Download App
              </a>
            </mat-card-actions>
          </mat-card>
        </div>

        <!-- Payment Instructions -->
        <div class="payment-section">
          <mat-card class="payment-card">
            <mat-card-header>
              <mat-icon mat-card-avatar class="payment-icon">payment</mat-icon>
              <mat-card-title>How to Pay</mat-card-title>
              <mat-card-subtitle>Simple payment process via WhatsApp or Email</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="payment-methods">
                <div class="payment-method">
                  <mat-icon class="method-icon">chat</mat-icon>
                  <div class="method-info">
                    <h4>WhatsApp Payment</h4>
                    <p>Contact us on WhatsApp for quick payment processing</p>
                    <a href="https://wa.me/918104184175" target="_blank" mat-raised-button color="primary">
                      <mat-icon>chat</mat-icon>
                      WhatsApp: +91 8104184175
                    </a>
                  </div>
                </div>

                <div class="payment-method">
                  <mat-icon class="method-icon">email</mat-icon>
                  <div class="method-info">
                    <h4>Email Payment</h4>
                    <p>Send payment details via email for processing</p>
                    <a href="mailto:abid810418&#64;gmail.com" mat-raised-button color="accent">
                      <mat-icon>email</mat-icon>
                      abid810418&#64;gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Value Proposition -->
        <div class="value-section">
          <h2>Why This Pricing Model?</h2>
          <div class="value-grid">
            <div class="value-item">
              <mat-icon>savings</mat-icon>
              <h3>Cost Effective</h3>
              <p>Pay only when you actually use the service. No monthly fees or unused subscriptions.</p>
            </div>
            <div class="value-item">
              <mat-icon>transparency</mat-icon>
              <h3>Transparent</h3>
              <p>Simple, upfront pricing with no hidden costs. You know exactly what you're paying for.</p>
            </div>
            <div class="value-item">
              <mat-icon>security</mat-icon>
              <h3>Your API Keys</h3>
              <p>Use your own AI API keys for maximum control and privacy. We don't mark up API costs.</p>
            </div>
            <div class="value-item">
              <mat-icon>support</mat-icon>
              <h3>Full Support</h3>
              <p>Complete technical support and regular updates included with every session.</p>
            </div>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div class="faq-grid">
            <div class="faq-item">
              <h4>What's the difference between ₹200 and ₹1000 plans?</h4>
              <p><strong>₹200 per session:</strong> Pay for one interview session (up to 2 hours). <strong>₹1000 per month:</strong> Unlimited sessions for 1 month. Both plans have identical features and functionality.</p>
            </div>
            <div class="faq-item">
              <h4>What counts as a session?</h4>
              <p>A session starts when you begin using the AI assistant and ends when you close the application or after 2 hours of inactivity, whichever comes first.</p>
            </div>
            <div class="faq-item">
              <h4>Do I need my own API keys?</h4>
              <p>Yes, you'll need to provide your own API keys for AI services (Gemini, OpenAI, etc.). This ensures you have full control and the best possible rates.</p>
            </div>
            <div class="faq-item">
              <h4>Can I use multiple AI models?</h4>
              <p>Absolutely! The application supports multiple AI models and automatically falls back to alternatives if one is unavailable.</p>
            </div>
            <div class="faq-item">
              <h4>Is there a free trial?</h4>
              <p>New users get 5 minutes of free usage to try the AI Assistant. After that, it's ₹200 per session or ₹1000 per month.</p>
            </div>
            <div class="faq-item">
              <h4>How do I pay?</h4>
              <p>Contact us via WhatsApp (+91 8104184175) or email (abid810418&#64;gmail.com) for payment processing. We accept UPI, bank transfers, and other secure payment methods.</p>
            </div>
            <div class="faq-item">
              <h4>What if I'm not satisfied?</h4>
              <p>We offer a satisfaction guarantee. If you're not happy with your session, contact us within 24 hours for a refund.</p>
            </div>
          </div>
        </div>

        <!-- Comparison -->
        <div class="comparison-section">
          <h2>Compare with Alternatives</h2>
          <div class="comparison-table">
            <div class="comparison-header">
              <div class="feature-col">Feature</div>
              <div class="us-col">Abid Ansari AI</div>
              <div class="other-col">Other Solutions</div>
            </div>
            <div class="comparison-row">
              <div class="feature-col">Pricing Model</div>
              <div class="us-col">₹200 per session</div>
              <div class="other-col">$20-50/month</div>
            </div>
            <div class="comparison-row">
              <div class="feature-col">API Key Control</div>
              <div class="us-col">✅ Your own keys</div>
              <div class="other-col">❌ Their keys only</div>
            </div>
            <div class="comparison-row">
              <div class="feature-col">Multiple AI Models</div>
              <div class="us-col">✅ 4+ models</div>
              <div class="other-col">❌ Usually 1-2</div>
            </div>
            <div class="comparison-row">
              <div class="feature-col">Screenshot Analysis</div>
              <div class="us-col">✅ Advanced vision AI</div>
              <div class="other-col">❌ Limited or none</div>
            </div>
            <div class="comparison-row">
              <div class="feature-col">Stealth Mode</div>
              <div class="us-col">✅ Professional stealth</div>
              <div class="other-col">❌ Basic or none</div>
            </div>
            <div class="comparison-row">
              <div class="feature-col">Interview Optimization</div>
              <div class="us-col">✅ Specialized prompts</div>
              <div class="other-col">❌ Generic responses</div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="cta-section">
          <h2>Ready to Ace Your Next Interview?</h2>
          <p>Join hundreds of developers who have successfully used our AI assistant in their technical interviews.</p>
          <div class="cta-buttons">
            <a mat-raised-button color="primary" routerLink="/register" class="cta-button">
              Start Your Free Session
            </a>
            <a mat-button routerLink="/documentation" class="secondary-button">
              Learn More
            </a>
          </div>
          <div class="guarantee">
            <mat-icon>verified</mat-icon>
            <span>30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pricing-container {
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

    .pricing-section {
      max-width: 1200px;
      margin: 40px auto 0;
      padding: 0 24px 80px;
    }

    .pricing-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
      margin-bottom: 60px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .pricing-card {
      position: relative;
    }

    .pricing-card.featured {
      transform: scale(1.05);
      z-index: 2;
    }

    .popular-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #ff9800, #f57c00);
      color: white;
      padding: 8px 24px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      z-index: 3;
      box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
    }

    .pricing-card-content {
      height: 100%;
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .pricing-card:hover .pricing-card-content {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.15);
    }

    .price-features {
      margin: 24px 0;
    }

    .savings-info {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin: 16px 0;
    }

    .savings-text {
      font-size: 14px;
      color: #666;
      font-style: italic;
    }

    .pricing-icon {
      background: linear-gradient(135deg, #3f51b5, #2196f3);
      color: white;
    }

    .price-display {
      text-align: center;
      margin: 32px 0;
      padding: 24px;
      background: linear-gradient(135deg, #e8f5e8, #f0f8ff);
      border-radius: 12px;
      border: 2px solid #4caf50;
    }

    .currency {
      font-size: 2rem;
      font-weight: 600;
      color: #2e7d32;
      vertical-align: top;
    }

    .amount {
      font-size: 4rem;
      font-weight: 700;
      color: #2e7d32;
      margin: 0 8px;
    }

    .period {
      font-size: 1.2rem;
      color: #666;
      font-weight: 500;
    }

    .features-list {
      margin: 32px 0;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      padding: 8px 0;
    }

    .feature-item mat-icon {
      color: #4caf50;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .feature-item span {
      font-size: 16px;
      line-height: 1.5;
    }

    .session-info {
      margin: 24px 0;
      text-align: center;
    }

    .session-info mat-chip {
      margin: 4px;
    }

    .cta-button {
      width: 100%;
      padding: 16px !important;
      font-size: 18px !important;
      font-weight: 600 !important;
      margin-bottom: 12px !important;
    }

    .secondary-button {
      width: 100%;
      padding: 12px !important;
      font-size: 16px !important;
    }

    .payment-section {
      margin: 40px 0;
    }

    .payment-card {
      max-width: 800px;
      margin: 0 auto;
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    }

    .payment-icon {
      background: linear-gradient(135deg, #ff9800, #f57c00);
      color: white;
    }

    .payment-methods {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 16px;
    }

    .payment-method {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }

    .method-icon {
      color: #3f51b5;
      font-size: 32px;
      width: 32px;
      height: 32px;
      margin-top: 4px;
    }

    .method-info h4 {
      margin: 0 0 8px 0;
      color: #333;
      font-size: 1.2rem;
    }

    .method-info p {
      margin: 0 0 16px 0;
      color: #666;
      line-height: 1.5;
    }

    .method-info a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .value-section, .faq-section, .comparison-section {
      margin: 60px 0;
    }

    .value-section h2, .faq-section h2, .comparison-section h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 40px;
      color: #333;
    }

    .value-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
    }

    .value-item {
      text-align: center;
      padding: 32px 24px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .value-item mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #3f51b5;
      margin-bottom: 16px;
    }

    .value-item h3 {
      margin: 0 0 12px 0;
      color: #333;
      font-size: 1.5rem;
    }

    .value-item p {
      margin: 0;
      color: #666;
      line-height: 1.6;
    }

    .faq-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .faq-item {
      background: white;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .faq-item h4 {
      margin: 0 0 12px 0;
      color: #3f51b5;
      font-size: 1.2rem;
    }

    .faq-item p {
      margin: 0;
      color: #666;
      line-height: 1.6;
    }

    .comparison-table {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .comparison-header {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      background: #3f51b5;
      color: white;
      font-weight: 600;
    }

    .comparison-row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      border-bottom: 1px solid #e0e0e0;
    }

    .comparison-row:last-child {
      border-bottom: none;
    }

    .feature-col, .us-col, .other-col {
      padding: 16px;
      display: flex;
      align-items: center;
    }

    .us-col {
      background: #e8f5e8;
      color: #2e7d32;
      font-weight: 600;
    }

    .other-col {
      background: #fafafa;
      color: #666;
    }

    .cta-section {
      background: linear-gradient(135deg, #3f51b5, #2196f3);
      color: white;
      padding: 60px 40px;
      border-radius: 16px;
      text-align: center;
      margin: 60px 0 0 0;
    }

    .cta-section h2 {
      font-size: 2.5rem;
      margin-bottom: 16px;
      color: white;
    }

    .cta-section p {
      font-size: 1.2rem;
      margin-bottom: 32px;
      opacity: 0.9;
    }

    .cta-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .cta-buttons .cta-button {
      width: auto;
      padding: 16px 32px !important;
    }

    .cta-buttons .secondary-button {
      width: auto;
      padding: 16px 32px !important;
      color: white;
      border-color: white;
    }

    .guarantee {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .guarantee mat-icon {
      color: #4caf50;
    }

    @media (max-width: 768px) {
      .pricing-section {
        padding: 0 16px 60px;
        margin: 20px auto 0;
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

      .pricing-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .pricing-card.featured {
        transform: none;
      }

      .price-display {
        padding: 16px;
        margin: 16px 0;
      }

      .currency {
        font-size: 1.5rem;
      }

      .amount {
        font-size: 3rem;
      }

      .period {
        font-size: 1rem;
      }

      .payment-methods {
        grid-template-columns: 1fr;
      }

      .payment-method {
        flex-direction: column;
        text-align: center;
        padding: 16px;
      }

      .value-section h2, .faq-section h2, .comparison-section h2 {
        font-size: 2rem;
      }

      .value-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .faq-grid {
        grid-template-columns: 1fr;
      }

      .comparison-header, .comparison-row {
        grid-template-columns: 1fr;
      }

      .comparison-header {
        display: none;
      }

      .feature-col {
        font-weight: 600;
        background: #f5f5f5;
      }

      .cta-section {
        padding: 40px 20px;
      }

      .cta-section h2 {
        font-size: 2rem;
      }

      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }

      .cta-buttons .cta-button,
      .cta-buttons .secondary-button {
        width: 100%;
        max-width: 300px;
      }
    }

    @media (max-width: 480px) {
      .hero-section h1 {
        font-size: 1.8rem;
      }

      .pricing-section {
        margin: 10px auto 0;
        padding: 0 12px 40px;
      }

      .pricing-grid {
        gap: 16px;
      }

      .pricing-card-content {
        margin: 0 -4px;
      }

      .amount {
        font-size: 2.5rem;
      }

      .popular-badge {
        font-size: 12px;
        padding: 6px 16px;
      }
    }
  `]
})
export class PricingComponent {
  pricing = environment.pricing;
}
