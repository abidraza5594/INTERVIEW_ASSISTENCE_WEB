import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { FirebaseService, UserData } from '../../services/firebase.service';

@Component({
  selector: 'app-about-us',
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
    MatDividerModule
  ],
  template: `
    <div class="about-us-container">
      <div class="page-header">
        <h1>About Us Profile</h1>
        <p>Create your professional introduction for interviews</p>
      </div>

      <div class="content-wrapper">
        <mat-card class="about-us-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>person</mat-icon>
              Your Interview Introduction
            </mat-card-title>
            <mat-card-subtitle>
              This will be used as context when the AI responds to interview questions
            </mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <form [formGroup]="aboutUsForm" (ngSubmit)="saveAboutUs()" class="about-us-form">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>About Us / Professional Introduction</mat-label>
                <textarea 
                  matInput 
                  formControlName="aboutUs" 
                  rows="10"
                  placeholder="Tell us about yourself, your experience, skills, and background. This information will help the AI provide more personalized and relevant responses during interviews.

Example:
I am a Full Stack Developer with 5+ years of experience in React, Node.js, and Python. I have worked on e-commerce platforms, built scalable APIs, and led development teams. I'm passionate about clean code, performance optimization, and user experience. Currently working at XYZ Company as a Senior Developer."
                ></textarea>
                <mat-hint>{{ aboutUsForm.get('aboutUs')?.value?.length || 0 }}/2000 characters</mat-hint>
              </mat-form-field>

              <div class="form-actions">
                <button mat-raised-button color="primary" type="submit" [disabled]="isLoading || aboutUsForm.invalid">
                  <mat-spinner *ngIf="isLoading" diameter="20" class="button-spinner"></mat-spinner>
                  <mat-icon *ngIf="!isLoading">save</mat-icon>
                  <span>{{ isLoading ? 'Saving...' : 'Save About Us' }}</span>
                </button>
                <button mat-button type="button" (click)="clearForm()" [disabled]="isLoading">
                  <mat-icon>clear</mat-icon>
                  Clear
                </button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>

        <mat-card class="tips-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>lightbulb</mat-icon>
              Tips for a Great About Us
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="tips-list">
              <div class="tip-item">
                <mat-icon>check_circle</mat-icon>
                <span>Include your years of experience and key technologies</span>
              </div>
              <div class="tip-item">
                <mat-icon>check_circle</mat-icon>
                <span>Mention specific projects or achievements</span>
              </div>
              <div class="tip-item">
                <mat-icon>check_circle</mat-icon>
                <span>Highlight your current role and responsibilities</span>
              </div>
              <div class="tip-item">
                <mat-icon>check_circle</mat-icon>
                <span>Include relevant skills and certifications</span>
              </div>
              <div class="tip-item">
                <mat-icon>check_circle</mat-icon>
                <span>Keep it professional and interview-appropriate</span>
              </div>
              <div class="tip-item">
                <mat-icon>check_circle</mat-icon>
                <span>Update regularly as your experience grows</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="preview-card" *ngIf="aboutUsForm.get('aboutUs')?.value">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>preview</mat-icon>
              Preview
            </mat-card-title>
            <mat-card-subtitle>
              How your introduction will appear to the AI
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="preview-content">
              {{ aboutUsForm.get('aboutUs')?.value }}
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .about-us-container {
      min-height: 100vh;
      padding: 96px 24px 24px;
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

    .content-wrapper {
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .about-us-form {
      margin-top: 16px;
    }

    .full-width {
      width: 100%;
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

    .tips-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .tip-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #4caf50;
    }

    .tip-item mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .tip-item span {
      color: #333;
    }

    .preview-content {
      background-color: #f8f9fa;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid #3f51b5;
      white-space: pre-wrap;
      line-height: 1.6;
      font-family: 'Segoe UI', sans-serif;
    }

    @media (max-width: 768px) {
      .about-us-container {
        padding: 96px 16px 16px;
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
  `]
})
export class AboutUsComponent implements OnInit {
  aboutUsForm: FormGroup;
  isLoading = false;
  userData: UserData | null = null;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private snackBar: MatSnackBar
  ) {
    this.aboutUsForm = this.fb.group({
      aboutUs: ['', [Validators.maxLength(2000)]]
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadUserData();
  }

  async loadUserData(): Promise<void> {
    const user = this.firebaseService.getCurrentUser();
    if (user) {
      this.userData = await this.firebaseService.getUserData(user.uid);
      if (this.userData?.aboutUs) {
        this.aboutUsForm.patchValue({
          aboutUs: this.userData.aboutUs
        });
      }
    }
  }

  async saveAboutUs(): Promise<void> {
    if (this.isLoading || this.aboutUsForm.invalid) {
      return;
    }

    this.isLoading = true;

    try {
      const user = this.firebaseService.getCurrentUser();
      if (!user) {
        this.snackBar.open('Please log in to save your about us', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        return;
      }

      const aboutUsText = this.aboutUsForm.get('aboutUs')?.value?.trim() || '';

      const success = await this.firebaseService.updateUserAboutUs(user.uid, aboutUsText);

      if (success) {
        this.snackBar.open('About Us saved successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        await this.loadUserData(); // Refresh data
      } else {
        throw new Error('Failed to save About Us to database');
      }
    } catch (error: any) {
      console.error('Error saving About Us:', error);
      const errorMessage = error?.message || 'Unknown error occurred';
      this.snackBar.open(`Error saving About Us: ${errorMessage}`, 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    } finally {
      this.isLoading = false;
    }
  }

  clearForm(): void {
    this.aboutUsForm.reset();
  }
}
