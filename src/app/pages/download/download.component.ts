import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule
  ],
  template: `
    <div class="download-container">
      <div class="page-header">
        <h1>Download Abid Ansari AI Assistant</h1>
        <p>Get the latest version of the AI-powered interview assistant</p>
      </div>

      <div class="download-content">
        <div class="main-download">
          <mat-card class="download-card">
            <mat-card-header>
              <div class="download-header">
                <mat-icon class="app-icon">smart_toy</mat-icon>
                <div class="version-info">
                  <mat-card-title>Abid Ansari AI Assistant</mat-card-title>
                  <mat-card-subtitle>Version {{ appDownload.version }}</mat-card-subtitle>
                </div>
                <mat-chip-set>
                  <mat-chip color="primary">Latest</mat-chip>
                  <mat-chip color="accent">Stable</mat-chip>
                </mat-chip-set>
              </div>
            </mat-card-header>

            <mat-card-content>
              <div class="download-info">
                <div class="feature-highlights">
                  <h3>What's Included</h3>
                  <div class="features-grid">
                    <div class="feature-item">
                      <mat-icon>psychology</mat-icon>
                      <span>Multiple AI Models</span>
                    </div>
                    <div class="feature-item">
                      <mat-icon>screenshot</mat-icon>
                      <span>Screenshot Analysis</span>
                    </div>
                    <div class="feature-item">
                      <mat-icon>keyboard</mat-icon>
                      <span>Hotkey Controls</span>
                    </div>
                    <div class="feature-item">
                      <mat-icon>security</mat-icon>
                      <span>Stealth Mode</span>
                    </div>
                    <div class="feature-item">
                      <mat-icon>vpn_key</mat-icon>
                      <span>Secure API Keys</span>
                    </div>
                    <div class="feature-item">
                      <mat-icon>code</mat-icon>
                      <span>Technical Interview Support</span>
                    </div>
                  </div>
                </div>

                <mat-divider></mat-divider>

                <div class="system-requirements">
                  <h3>System Requirements</h3>
                  <div class="requirements-list">
                    <div class="requirement-item">
                      <mat-icon>computer</mat-icon>
                      <div>
                        <strong>Operating System:</strong>
                        <span>Windows 10/11 (64-bit)</span>
                      </div>
                    </div>
                    <div class="requirement-item">
                      <mat-icon>memory</mat-icon>
                      <div>
                        <strong>RAM:</strong>
                        <span>4 GB minimum, 8 GB recommended</span>
                      </div>
                    </div>
                    <div class="requirement-item">
                      <mat-icon>storage</mat-icon>
                      <div>
                        <strong>Storage:</strong>
                        <span>500 MB free space</span>
                      </div>
                    </div>
                    <div class="requirement-item">
                      <mat-icon>wifi</mat-icon>
                      <div>
                        <strong>Internet:</strong>
                        <span>Required for AI services</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </mat-card-content>

            <mat-card-actions class="download-actions">
              <button mat-raised-button color="primary" class="download-button" (click)="downloadApp()">
                <mat-icon>download</mat-icon>
                Download for Windows ({{ appDownload.fileSize }})
              </button>
              <button mat-button routerLink="/documentation">
                <mat-icon>description</mat-icon>
                View Documentation
              </button>
            </mat-card-actions>
          </mat-card>
        </div>

        <div class="sidebar">
          <mat-card class="installation-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>install_desktop</mat-icon>
                Installation Guide
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="installation-steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h4>Download</h4>
                    <p>Click the download button to get the installer</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h4>Install</h4>
                    <p>Run the installer and follow the setup wizard</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h4>Configure</h4>
                    <p>Login and set up your API keys</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h4>Use</h4>
                    <p>Start using hotkeys during interviews</p>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="support-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>help</mat-icon>
                Need Help?
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="support-options">
                <a mat-button routerLink="/documentation" class="support-link">
                  <mat-icon>description</mat-icon>
                  Documentation
                </a>
                <a mat-button routerLink="/contact" class="support-link">
                  <mat-icon>contact_support</mat-icon>
                  Contact Support
                </a>
                <a mat-button href="https://wa.me/{{ contact.whatsapp }}" target="_blank" class="support-link">
                  <mat-icon>chat</mat-icon>
                  WhatsApp Support
                </a>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="pricing-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>monetization_on</mat-icon>
                Pricing
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="pricing-info">
                <div class="price">
                  <span class="currency">{{ pricing.currency }}</span>
                  <span class="amount">{{ pricing.sessionPrice }}</span>
                  <span class="period">per session</span>
                </div>
                <p>Pay only for what you use. No monthly subscriptions.</p>
                <a mat-button routerLink="/pricing" color="primary">
                  View Pricing Details
                </a>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <div class="changelog-section">
        <mat-card class="changelog-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>update</mat-icon>
              What's New in Version {{ appDownload.version }}
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="changelog-content">
              <div class="changelog-item">
                <mat-icon color="primary">auto_awesome</mat-icon>
                <div>
                  <h4>Cascading API Fallback System</h4>
                  <p>Automatic failover between Gemini → Mistral → OpenRouter → OpenAI for maximum reliability.</p>
                </div>
              </div>
              <div class="changelog-item">
                <mat-icon color="primary">email</mat-icon>
                <div>
                  <h4>Email-Only Authentication</h4>
                  <p>Secure Firebase authentication without passwords - just enter your email to login.</p>
                </div>
              </div>
              <div class="changelog-item">
                <mat-icon color="primary">timer</mat-icon>
                <div>
                  <h4>Session Timer with Auto-Logout</h4>
                  <p>Prominent countdown timer with automatic logout when session expires.</p>
                </div>
              </div>
              <div class="changelog-item">
                <mat-icon color="primary">download</mat-icon>
                <div>
                  <h4>Optimized for Web Distribution</h4>
                  <p>Lightweight download (64MB) with lazy loading for minimal initial footprint.</p>
                </div>
              </div>
              <div class="changelog-item">
                <mat-icon color="primary">security</mat-icon>
                <div>
                  <h4>Enhanced Security & Contact Integration</h4>
                  <p>Direct WhatsApp/Email support links and improved API key management.</p>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .download-container {
      min-height: 100vh;
      padding: 80px 24px 24px;
      background-color: #f5f5f5;
    }

    .page-header {
      text-align: center;
      margin-bottom: 32px;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    .page-header h1 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 8px;
    }

    .page-header p {
      font-size: 1.1rem;
      color: #666;
    }

    .download-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto 32px;
    }

    .main-download {
      display: flex;
      flex-direction: column;
    }

    .download-card {
      flex: 1;
    }

    .download-header {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
    }

    .app-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #3f51b5;
    }

    .version-info {
      flex: 1;
    }

    .download-info {
      margin-top: 16px;
    }

    .feature-highlights h3 {
      margin-bottom: 16px;
      color: #333;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
      margin-bottom: 24px;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }

    .feature-item mat-icon {
      color: #3f51b5;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .system-requirements {
      margin-top: 24px;
    }

    .system-requirements h3 {
      margin-bottom: 16px;
      color: #333;
    }

    .requirements-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .requirement-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .requirement-item mat-icon {
      color: #666;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .requirement-item strong {
      margin-right: 8px;
      color: #333;
    }

    .requirement-item span {
      color: #666;
    }

    .download-actions {
      padding-top: 16px;
      display: flex;
      gap: 16px;
    }

    .download-button {
      font-size: 16px;
      padding: 12px 24px;
      font-weight: 600;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .installation-steps {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .step {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .step-number {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #3f51b5;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      flex-shrink: 0;
    }

    .step-content h4 {
      margin: 0 0 4px 0;
      color: #333;
    }

    .step-content p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }

    .support-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .support-link {
      justify-content: flex-start;
      text-align: left;
    }

    .pricing-info {
      text-align: center;
    }

    .price {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 4px;
      margin-bottom: 8px;
    }

    .currency {
      font-size: 1.2rem;
      color: #666;
    }

    .amount {
      font-size: 2rem;
      font-weight: 600;
      color: #3f51b5;
    }

    .period {
      font-size: 1rem;
      color: #666;
    }

    .pricing-info p {
      color: #666;
      margin-bottom: 16px;
    }

    .changelog-section {
      max-width: 1200px;
      margin: 0 auto;
    }

    .changelog-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .changelog-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .changelog-item mat-icon {
      margin-top: 2px;
    }

    .changelog-item h4 {
      margin: 0 0 4px 0;
      color: #333;
    }

    .changelog-item p {
      margin: 0;
      color: #666;
      line-height: 1.4;
    }

    @media (max-width: 768px) {
      .download-content {
        grid-template-columns: 1fr;
      }

      .sidebar {
        order: -1;
      }

      .download-container {
        padding: 80px 16px 16px;
      }

      .page-header h1 {
        font-size: 2rem;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .download-header {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class DownloadComponent {
  appDownload = environment.appDownload;
  pricing = environment.pricing;
  contact = environment.contact;

  downloadApp(): void {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = this.appDownload.downloadUrl;
    link.download = this.appDownload.fileName || 'AbidAnsariAI-Setup.exe';

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success message
    console.log(`Downloading ${this.appDownload.fileName} (${this.appDownload.fileSize})`);
  }
}
