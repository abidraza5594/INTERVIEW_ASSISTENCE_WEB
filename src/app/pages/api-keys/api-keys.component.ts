import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FirebaseService, UserData } from '../../services/firebase.service';
import { ApiTestingService, ApiTestSummary } from '../../services/api-testing.service';
import { ApiTestResultsDialogComponent } from '../../components/api-test-results-dialog/api-test-results-dialog.component';

@Component({
  selector: 'app-api-keys',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatExpansionModule,
    MatDividerModule,
    MatDialogModule
  ],
  template: `
    <div class="api-keys-container">
      <div class="page-header">
        <h1>API Key Management</h1>
        <p>Securely manage your AI API keys for the Abid Ansari AI Assistant</p>
      </div>

      <div class="content-grid">
        <div class="main-content">
          <mat-card class="api-keys-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>vpn_key</mat-icon>
                Your API Keys
              </mat-card-title>
              <mat-card-subtitle>
                Configure your AI service API keys. All keys are encrypted and stored securely.
              </mat-card-subtitle>
            </mat-card-header>

            <mat-card-content>
              <form [formGroup]="apiKeysForm" (ngSubmit)="saveApiKeys()" class="api-keys-form">
                <mat-tab-group>
                  <mat-tab label="Gemini API">
                    <div class="tab-content">
                      <mat-form-field appearance="outline" class="full-width">
                        <mat-label>Gemini API Key</mat-label>
                        <input matInput type="password" formControlName="gemini" placeholder="AIzaSy...">
                        <mat-icon matSuffix>vpn_key</mat-icon>
                        <mat-hint>Get your API key from Google AI Studio</mat-hint>
                      </mat-form-field>
                      <div class="api-status" [class.active]="hasApiKey('gemini')">
                        <mat-icon>{{ hasApiKey('gemini') ? 'check_circle' : 'radio_button_unchecked' }}</mat-icon>
                        <span>{{ hasApiKey('gemini') ? 'Configured' : 'Not configured' }}</span>
                      </div>
                    </div>
                  </mat-tab>

                  <mat-tab label="Mistral API">
                    <div class="tab-content">
                      <mat-form-field appearance="outline" class="full-width">
                        <mat-label>Mistral API Key</mat-label>
                        <input matInput type="password" formControlName="mistral" placeholder="p7KF...">
                        <mat-icon matSuffix>vpn_key</mat-icon>
                        <mat-hint>Get your API key from Mistral AI Console</mat-hint>
                      </mat-form-field>
                      <div class="api-status" [class.active]="hasApiKey('mistral')">
                        <mat-icon>{{ hasApiKey('mistral') ? 'check_circle' : 'radio_button_unchecked' }}</mat-icon>
                        <span>{{ hasApiKey('mistral') ? 'Configured' : 'Not configured' }}</span>
                      </div>
                    </div>
                  </mat-tab>

                  <mat-tab label="OpenAI API">
                    <div class="tab-content">
                      <mat-form-field appearance="outline" class="full-width">
                        <mat-label>OpenAI API Key</mat-label>
                        <input matInput type="password" formControlName="openai" placeholder="sk-...">
                        <mat-icon matSuffix>vpn_key</mat-icon>
                        <mat-hint>Get your API key from OpenAI Platform</mat-hint>
                      </mat-form-field>
                      <div class="api-status" [class.active]="hasApiKey('openai')">
                        <mat-icon>{{ hasApiKey('openai') ? 'check_circle' : 'radio_button_unchecked' }}</mat-icon>
                        <span>{{ hasApiKey('openai') ? 'Configured' : 'Not configured' }}</span>
                      </div>
                    </div>
                  </mat-tab>

                  <mat-tab label="OpenRouter API">
                    <div class="tab-content">
                      <mat-form-field appearance="outline" class="full-width">
                        <mat-label>OpenRouter API Key</mat-label>
                        <input matInput type="password" formControlName="openrouter" placeholder="sk-or-v1-...">
                        <mat-icon matSuffix>vpn_key</mat-icon>
                        <mat-hint>Get your API key from OpenRouter</mat-hint>
                      </mat-form-field>
                      <div class="api-status" [class.active]="hasApiKey('openrouter')">
                        <mat-icon>{{ hasApiKey('openrouter') ? 'check_circle' : 'radio_button_unchecked' }}</mat-icon>
                        <span>{{ hasApiKey('openrouter') ? 'Configured' : 'Not configured' }}</span>
                      </div>
                    </div>
                  </mat-tab>
                </mat-tab-group>

                <div class="form-actions">
                  <button mat-raised-button color="primary" type="submit" [disabled]="isLoading">
                    <mat-spinner *ngIf="isLoading" diameter="20" class="button-spinner"></mat-spinner>
                    <mat-icon *ngIf="!isLoading">save</mat-icon>
                    <span>{{ isLoading ? 'Saving...' : 'Save API Keys' }}</span>
                  </button>
                  <button mat-button type="button" (click)="testApiKeys()" [disabled]="isLoading || isTesting">
                    <mat-spinner *ngIf="isTesting" diameter="20" class="button-spinner"></mat-spinner>
                    <mat-icon *ngIf="!isTesting">play_arrow</mat-icon>
                    <span>{{ isTesting ? 'Testing...' : 'Test Keys' }}</span>
                  </button>
                </div>
              </form>
            </mat-card-content>
          </mat-card>
        </div>

        <div class="sidebar">
          <mat-card class="info-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>info</mat-icon>
                Security Information
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="security-features">
                <div class="security-item">
                  <mat-icon>lock</mat-icon>
                  <span>End-to-end encryption</span>
                </div>
                <div class="security-item">
                  <mat-icon>cloud_off</mat-icon>
                  <span>No key sharing</span>
                </div>
                <div class="security-item">
                  <mat-icon>visibility_off</mat-icon>
                  <span>Masked display</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="help-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>help</mat-icon>
                Getting API Keys
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>Gemini API</mat-panel-title>
                </mat-expansion-panel-header>
                <p>1. Visit <a href="https://aistudio.google.com/app/apikey" target="_blank">Google AI Studio</a></p>
                <p>2. Create a new API key</p>
                <p>3. Copy and paste it here</p>
              </mat-expansion-panel>

              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>Mistral API</mat-panel-title>
                </mat-expansion-panel-header>
                <p>1. Visit <a href="https://console.mistral.ai/" target="_blank">Mistral Console</a></p>
                <p>2. Go to API Keys section</p>
                <p>3. Generate a new key</p>
              </mat-expansion-panel>

              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>OpenAI API</mat-panel-title>
                </mat-expansion-panel-header>
                <p>1. Visit <a href="https://platform.openai.com/api-keys" target="_blank">OpenAI Platform</a></p>
                <p>2. Create a new secret key</p>
                <p>3. Add billing information</p>
              </mat-expansion-panel>

              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>OpenRouter API</mat-panel-title>
                </mat-expansion-panel-header>
                <p>1. Visit <a href="https://openrouter.ai/keys" target="_blank">OpenRouter</a></p>
                <p>2. Create an account</p>
                <p>3. Generate an API key</p>
              </mat-expansion-panel>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .api-keys-container {
      min-height: 100vh;
      padding: 96px 24px 24px; /* Increased top padding to account for 72px header + margin */
      background-color: #f5f5f5;
      overflow-x: hidden; /* Prevent horizontal scroll */
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

    .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: start; /* Align items to start to prevent stretching */
    }

    .main-content {
      display: flex;
      flex-direction: column;
      min-width: 0; /* Prevent flex item from overflowing */
    }

    .api-keys-card {
      flex: 1;
      width: 100%; /* Ensure full width */
    }

    .api-keys-form {
      margin-top: 16px;
    }

    .tab-content {
      padding: 24px 0;
    }

    .full-width {
      width: 100%;
    }

    .api-status {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
      padding: 8px 12px;
      border-radius: 4px;
      background-color: #f5f5f5;
      color: #666;
    }

    .api-status.active {
      background-color: #e8f5e8;
      color: #2e7d32;
    }

    .api-status mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .form-actions {
      display: flex;
      gap: 16px;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid #e0e0e0;
    }

    .button-spinner {
      margin-right: 8px;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 0; /* Prevent overflow */
    }

    .info-card, .help-card {
      position: sticky;
      top: 96px; /* Match the container padding top */
      max-height: calc(100vh - 120px); /* Prevent cards from being too tall */
      overflow-y: auto; /* Allow scrolling within cards if needed */
    }

    .security-features {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .security-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #4caf50;
    }

    .security-item mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .help-card mat-expansion-panel {
      margin-bottom: 8px;
    }

    .help-card a {
      color: #3f51b5;
      text-decoration: none;
    }

    .help-card a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .content-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .sidebar {
        order: -1;
      }

      .info-card, .help-card {
        position: static; /* Remove sticky on mobile */
        max-height: none; /* Remove height restriction on mobile */
        overflow-y: visible; /* Reset overflow on mobile */
      }

      .api-keys-container {
        padding: 96px 16px 16px; /* Keep consistent with desktop */
      }

      .page-header h1 {
        font-size: 2rem;
      }

      .form-actions {
        flex-direction: column;
        gap: 12px;
      }

      .form-actions button {
        width: 100%;
      }
    }

    @media (max-width: 480px) {
      .api-keys-container {
        padding: 88px 12px 12px; /* Slightly less padding on very small screens */
      }

      .page-header h1 {
        font-size: 1.75rem;
      }

      .page-header p {
        font-size: 1rem;
      }

      .content-grid {
        gap: 12px;
      }
    }
  `]
})
export class ApiKeysComponent implements OnInit {
  apiKeysForm: FormGroup;
  isLoading = false;
  isTesting = false;
  userData: UserData | null = null;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private snackBar: MatSnackBar,
    private apiTestingService: ApiTestingService,
    private dialog: MatDialog
  ) {
    this.apiKeysForm = this.fb.group({
      gemini: [''],
      mistral: [''],
      openai: [''],
      openrouter: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadUserData();
  }

  async loadUserData(): Promise<void> {
    const user = this.firebaseService.getCurrentUser();
    if (user) {
      this.userData = await this.firebaseService.getUserData(user.uid);
      if (this.userData?.apiKeys) {
        // Don't populate the form with actual keys for security
        // Just mark which ones are configured
        this.updateFormStatus();
      }
    }
  }

  updateFormStatus(): void {
    // This method updates the UI to show which keys are configured
    // without exposing the actual key values
  }

  hasApiKey(provider: string): boolean {
    return this.userData?.apiKeys?.[provider as keyof typeof this.userData.apiKeys] ? true : false;
  }

  async saveApiKeys(): Promise<void> {
    if (this.isLoading) {
      return; // Prevent multiple simultaneous saves
    }

    this.isLoading = true;

    try {
      const user = this.firebaseService.getCurrentUser();
      if (!user) {
        this.snackBar.open('Please log in to save API keys', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        return;
      }

      const formValue = this.apiKeysForm.value;
      const apiKeys: any = {};

      // Only include non-empty keys
      Object.keys(formValue).forEach(key => {
        if (formValue[key] && formValue[key].trim()) {
          apiKeys[key] = formValue[key].trim();
        } else if (this.userData?.apiKeys?.[key as keyof typeof this.userData.apiKeys]) {
          // Keep existing key if form field is empty
          apiKeys[key] = this.userData.apiKeys[key as keyof typeof this.userData.apiKeys];
        }
      });

      // Check if at least one API key is provided
      if (Object.keys(apiKeys).length === 0) {
        this.snackBar.open('Please enter at least one API key', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        return;
      }

      console.log('Saving API keys for user:', user.uid);
      const success = await this.firebaseService.updateUserApiKeys(user.uid, apiKeys);

      if (success) {
        this.snackBar.open('API keys saved successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        await this.loadUserData(); // Refresh data
        this.apiKeysForm.reset(); // Clear form for security
      } else {
        throw new Error('Failed to save API keys to database');
      }
    } catch (error: any) {
      console.error('Error saving API keys:', error);
      const errorMessage = error?.message || 'Unknown error occurred';
      this.snackBar.open(`Error saving API keys: ${errorMessage}`, 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    } finally {
      this.isLoading = false;
    }
  }

  async testApiKeys(): Promise<void> {
    const user = this.firebaseService.getCurrentUser();
    if (!user) {
      this.snackBar.open('Please log in to test API keys', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    if (!this.userData?.apiKeys || Object.keys(this.userData.apiKeys).length === 0) {
      this.snackBar.open('No API keys found. Please save some API keys first.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    const configuredKeys = Object.keys(this.userData.apiKeys).filter(
      key => this.userData?.apiKeys?.[key as keyof typeof this.userData.apiKeys]
    );

    if (configuredKeys.length === 0) {
      this.snackBar.open('No valid API keys found to test.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.isTesting = true;

    try {
      const testSummary = await this.apiTestingService.testAllApiKeys(this.userData.apiKeys);
      this.showTestResults(testSummary);
    } catch (error: any) {
      console.error('Error testing API keys:', error);
      this.snackBar.open('Error occurred while testing API keys', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    } finally {
      this.isTesting = false;
    }
  }

  private showTestResults(summary: ApiTestSummary): void {
    const dialogRef = this.dialog.open(ApiTestResultsDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      data: summary
    });

    dialogRef.afterClosed().subscribe(() => {
      // Dialog closed
    });
  }
}
