import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApiTestSummary, ApiTestResult } from '../../services/api-testing.service';

@Component({
  selector: 'app-api-test-results-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule
  ],
  template: `
    <div class="test-results-dialog">
      <h2 mat-dialog-title>
        <mat-icon>assessment</mat-icon>
        API Key Test Results
      </h2>

      <mat-dialog-content class="dialog-content">
        <!-- Summary Section -->
        <div class="summary-section">
          <div class="summary-cards">
            <div class="summary-card success">
              <mat-icon>check_circle</mat-icon>
              <div class="summary-info">
                <div class="summary-number">{{ data.successfulTests }}</div>
                <div class="summary-label">Successful</div>
              </div>
            </div>
            
            <div class="summary-card failed">
              <mat-icon>error</mat-icon>
              <div class="summary-info">
                <div class="summary-number">{{ data.failedTests }}</div>
                <div class="summary-label">Failed</div>
              </div>
            </div>
            
            <div class="summary-card total">
              <mat-icon>api</mat-icon>
              <div class="summary-info">
                <div class="summary-number">{{ data.totalTests }}</div>
                <div class="summary-label">Total Tests</div>
              </div>
            </div>
            
            <div class="summary-card time">
              <mat-icon>schedule</mat-icon>
              <div class="summary-info">
                <div class="summary-number">{{ data.averageResponseTime }}ms</div>
                <div class="summary-label">Avg Response</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Individual Results -->
        <div class="results-section">
          <h3>Individual Test Results</h3>
          <div class="results-list">
            <mat-card *ngFor="let result of data.results" class="result-card" [class.success]="result.success" [class.failed]="!result.success">
              <mat-card-header>
                <mat-icon mat-card-avatar [class.success-icon]="result.success" [class.error-icon]="!result.success">
                  {{ result.success ? 'check_circle' : 'error' }}
                </mat-icon>
                <mat-card-title>{{ getProviderDisplayName(result.provider) }}</mat-card-title>
                <mat-card-subtitle>
                  <mat-chip [class.success-chip]="result.success" [class.error-chip]="!result.success">
                    {{ result.success ? 'Success' : 'Failed' }}
                  </mat-chip>
                </mat-card-subtitle>
              </mat-card-header>
              
              <mat-card-content>
                <div class="result-details">
                  <div class="result-message">{{ result.message }}</div>
                  <div class="result-meta">
                    <span class="response-time">
                      <mat-icon>schedule</mat-icon>
                      {{ result.responseTime }}ms
                    </span>
                    <span *ngIf="result.details?.response" class="response-preview">
                      <mat-icon>chat</mat-icon>
                      Response received
                    </span>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="recommendations-section" *ngIf="data.failedTests > 0">
          <h3>Recommendations</h3>
          <div class="recommendations">
            <div class="recommendation" *ngFor="let recommendation of getRecommendations()">
              <mat-icon>lightbulb</mat-icon>
              <span>{{ recommendation }}</span>
            </div>
          </div>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="close()">Close</button>
        <button mat-raised-button color="primary" (click)="retryTests()" *ngIf="data.failedTests > 0">
          <mat-icon>refresh</mat-icon>
          Retry Failed Tests
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .test-results-dialog {
      max-width: 100%;
    }

    .dialog-content {
      max-height: 70vh;
      overflow-y: auto;
      padding: 0 24px;
    }

    h2[mat-dialog-title] {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 0;
    }

    .summary-section {
      margin-bottom: 24px;
    }

    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 16px;
      margin-bottom: 16px;
    }

    .summary-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      border-radius: 8px;
      background: #f5f5f5;
    }

    .summary-card.success {
      background: #e8f5e8;
      color: #2e7d32;
    }

    .summary-card.failed {
      background: #ffebee;
      color: #d32f2f;
    }

    .summary-card.total {
      background: #e3f2fd;
      color: #1976d2;
    }

    .summary-card.time {
      background: #fff3e0;
      color: #f57c00;
    }

    .summary-card mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .summary-number {
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1;
    }

    .summary-label {
      font-size: 0.875rem;
      opacity: 0.8;
    }

    .results-section h3 {
      margin: 24px 0 16px;
      color: #333;
    }

    .results-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .result-card {
      border-left: 4px solid #ddd;
    }

    .result-card.success {
      border-left-color: #4caf50;
    }

    .result-card.failed {
      border-left-color: #f44336;
    }

    .success-icon {
      color: #4caf50;
    }

    .error-icon {
      color: #f44336;
    }

    .success-chip {
      background-color: #e8f5e8;
      color: #2e7d32;
    }

    .error-chip {
      background-color: #ffebee;
      color: #d32f2f;
    }

    .result-details {
      margin-top: 8px;
    }

    .result-message {
      font-weight: 500;
      margin-bottom: 8px;
    }

    .result-meta {
      display: flex;
      gap: 16px;
      align-items: center;
      font-size: 0.875rem;
      color: #666;
    }

    .result-meta span {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .result-meta mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .recommendations-section {
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid #e0e0e0;
    }

    .recommendations-section h3 {
      margin-top: 0;
    }

    .recommendations {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .recommendation {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 8px;
      background: #fff3e0;
      border-radius: 4px;
      font-size: 0.875rem;
    }

    .recommendation mat-icon {
      color: #f57c00;
      font-size: 18px;
      width: 18px;
      height: 18px;
      margin-top: 1px;
    }

    @media (max-width: 600px) {
      .summary-cards {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .result-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }
    }
  `]
})
export class ApiTestResultsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ApiTestResultsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ApiTestSummary
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  retryTests(): void {
    this.dialogRef.close('retry');
  }

  getProviderDisplayName(provider: string): string {
    const displayNames: { [key: string]: string } = {
      'gemini': 'Google Gemini',
      'openai': 'OpenAI',
      'mistral': 'Mistral AI',
      'openrouter': 'OpenRouter'
    };
    return displayNames[provider.toLowerCase()] || provider;
  }

  getRecommendations(): string[] {
    const recommendations: string[] = [];
    
    this.data.results.forEach(result => {
      if (!result.success) {
        if (result.message.includes('Invalid API key') || result.message.includes('unauthorized')) {
          recommendations.push(`Check your ${this.getProviderDisplayName(result.provider)} API key - it may be invalid or expired.`);
        } else if (result.message.includes('Rate limit')) {
          recommendations.push(`${this.getProviderDisplayName(result.provider)} rate limit exceeded - try again later.`);
        } else if (result.message.includes('Network error') || result.message.includes('CORS')) {
          recommendations.push(`Network connectivity issue with ${this.getProviderDisplayName(result.provider)} - check your internet connection.`);
        } else {
          recommendations.push(`Review your ${this.getProviderDisplayName(result.provider)} API key configuration and account status.`);
        }
      }
    });

    // Remove duplicates
    return [...new Set(recommendations)];
  }
}
