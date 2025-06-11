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
  styleUrls: ['./pricing.component.scss'],
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
  `
})
export class PricingComponent {
  pricing = environment.pricing;
}
