import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { FirebaseService, UserData } from '../../services/firebase.service';
import { TimeManagementService, TimeStatus } from '../../services/time-management.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatChipsModule
  ],
  template: `
    <div class="profile-container">
      <div class="hero-section">
        <h1>My Profile</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div class="profile-content" *ngIf="!isLoading && userData">
        <mat-tab-group class="profile-tabs">
          <!-- Profile Information -->
          <mat-tab label="Profile Information">
            <div class="tab-content">
              <mat-card class="profile-card">
                <mat-card-header>
                  <mat-icon mat-card-avatar>person</mat-icon>
                  <mat-card-title>Personal Information</mat-card-title>
                  <mat-card-subtitle>Update your profile details</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <form [formGroup]="profileForm" (ngSubmit)="updateProfile()" class="profile-form">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Display Name</mat-label>
                      <input matInput formControlName="displayName" placeholder="Your display name">
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Email</mat-label>
                      <input matInput type="email" formControlName="email" readonly>
                      <mat-hint>Email cannot be changed</mat-hint>
                    </mat-form-field>

                    <div class="account-info">
                      <div class="info-item">
                        <mat-icon>schedule</mat-icon>
                        <div>
                          <h4>Account Created</h4>
                          <p>{{ getAccountCreatedDate() }}</p>
                        </div>
                      </div>
                      <div class="info-item">
                        <mat-icon>login</mat-icon>
                        <div>
                          <h4>Last Login</h4>
                          <p>{{ getLastLoginDate() }}</p>
                        </div>
                      </div>
                    </div>

                    <button mat-raised-button color="primary" type="submit" 
                            [disabled]="profileForm.invalid || isUpdating">
                      <mat-icon *ngIf="!isUpdating">save</mat-icon>
                      <mat-icon *ngIf="isUpdating" class="spinning">refresh</mat-icon>
                      {{ isUpdating ? 'Updating...' : 'Update Profile' }}
                    </button>
                  </form>
                </mat-card-content>
              </mat-card>
            </div>
          </mat-tab>

          <!-- Usage Statistics -->
          <mat-tab label="Usage Statistics">
            <div class="tab-content">
              <mat-card class="stats-card">
                <mat-card-header>
                  <mat-icon mat-card-avatar>analytics</mat-icon>
                  <mat-card-title>Usage Overview</mat-card-title>
                  <mat-card-subtitle>Your AI Assistant usage statistics</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="stats-grid">
                    <div class="stat-item" [class]="getTimeWarningClass()">
                      <div class="stat-value">{{ timeStatus?.displayTime || '0m 0s' }}</div>
                      <div class="stat-label">Time Remaining</div>
                      <div class="stat-description">Available time for AI assistance</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-value">{{ timeStatus?.timeUsed || 0 }}s</div>
                      <div class="stat-label">Time Used</div>
                      <div class="stat-description">Total time spent using AI assistance</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-value">{{ timeStatus?.timeLimit || 300 }}s</div>
                      <div class="stat-label">Time Limit</div>
                      <div class="stat-description">Maximum time available for usage</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-value">{{ getSessionsCount() }}</div>
                      <div class="stat-label">Sessions</div>
                      <div class="stat-description">Total interview sessions completed</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-value">{{ getSuccessRate() }}%</div>
                      <div class="stat-label">Success Rate</div>
                      <div class="stat-description">Successful AI responses</div>
                    </div>
                  </div>

                  <div class="usage-progress">
                    <h4>Current Session Usage</h4>
                    <mat-progress-bar mode="determinate" [value]="getUsagePercentage()"></mat-progress-bar>
                    <div class="progress-info">
                      <span>{{ userData.timeUsage || 0 }} / {{ userData.timeLimit || 300 }} minutes</span>
                      <span>{{ getRemainingTime() }} minutes remaining</span>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>

              <mat-card class="subscription-card">
                <mat-card-header>
                  <mat-icon mat-card-avatar>card_membership</mat-icon>
                  <mat-card-title>Subscription Status</mat-card-title>
                  <mat-card-subtitle>Your current plan and billing information</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="subscription-info">
                    <div class="plan-info">
                      <mat-chip-set>
                        <mat-chip [color]="userData.subscription?.active ? 'primary' : 'warn'">
                          {{ userData.subscription?.plan || 'Free' }} Plan
                        </mat-chip>
                        <mat-chip *ngIf="userData.subscription?.active" color="accent">
                          Active
                        </mat-chip>
                      </mat-chip-set>
                    </div>
                    
                    <div class="billing-info" *ngIf="userData.subscription?.active">
                      <div class="info-row">
                        <span>Plan:</span>
                        <span>{{ userData.subscription?.plan }}</span>
                      </div>
                      <div class="info-row">
                        <span>Expires:</span>
                        <span>{{ getSubscriptionExpiry() }}</span>
                      </div>
                    </div>

                    <div class="subscription-actions">
                      <button mat-raised-button color="primary" (click)="upgradePlan()">
                        <mat-icon>upgrade</mat-icon>
                        Upgrade Plan
                      </button>
                      <button mat-button routerLink="/pricing">
                        <mat-icon>info</mat-icon>
                        View Pricing
                      </button>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </mat-tab>

          <!-- Security Settings -->
          <mat-tab label="Security">
            <div class="tab-content">
              <mat-card class="security-card">
                <mat-card-header>
                  <mat-icon mat-card-avatar>security</mat-icon>
                  <mat-card-title>Security Settings</mat-card-title>
                  <mat-card-subtitle>Manage your account security</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="security-section">
                    <h4>Change Password</h4>
                    <form [formGroup]="passwordForm" (ngSubmit)="changePassword()" class="password-form">
                      <mat-form-field appearance="outline" class="full-width">
                        <mat-label>Current Password</mat-label>
                        <input matInput type="password" formControlName="currentPassword">
                        <mat-error *ngIf="passwordForm.get('currentPassword')?.hasError('required')">
                          Current password is required
                        </mat-error>
                      </mat-form-field>

                      <mat-form-field appearance="outline" class="full-width">
                        <mat-label>New Password</mat-label>
                        <input matInput type="password" formControlName="newPassword">
                        <mat-error *ngIf="passwordForm.get('newPassword')?.hasError('required')">
                          New password is required
                        </mat-error>
                        <mat-error *ngIf="passwordForm.get('newPassword')?.hasError('minlength')">
                          Password must be at least 6 characters
                        </mat-error>
                      </mat-form-field>

                      <mat-form-field appearance="outline" class="full-width">
                        <mat-label>Confirm New Password</mat-label>
                        <input matInput type="password" formControlName="confirmPassword">
                        <mat-error *ngIf="passwordForm.get('confirmPassword')?.hasError('required')">
                          Please confirm your password
                        </mat-error>
                        <mat-error *ngIf="passwordForm.hasError('passwordMismatch')">
                          Passwords do not match
                        </mat-error>
                      </mat-form-field>

                      <button mat-raised-button color="primary" type="submit" 
                              [disabled]="passwordForm.invalid || isChangingPassword">
                        <mat-icon *ngIf="!isChangingPassword">lock</mat-icon>
                        <mat-icon *ngIf="isChangingPassword" class="spinning">refresh</mat-icon>
                        {{ isChangingPassword ? 'Changing...' : 'Change Password' }}
                      </button>
                    </form>
                  </div>

                  <div class="security-section">
                    <h4>Device Information</h4>
                    <div class="device-info">
                      <div class="info-item">
                        <mat-icon>devices</mat-icon>
                        <div>
                          <h5>Registered Device</h5>
                          <p>{{ userData.deviceId || 'Not registered' }}</p>
                          <p class="device-note">Only one device per account is allowed for security</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="security-section danger-zone">
                    <h4>Danger Zone</h4>
                    <div class="danger-actions">
                      <button mat-stroked-button color="warn" (click)="deleteAccount()">
                        <mat-icon>delete_forever</mat-icon>
                        Delete Account
                      </button>
                      <p class="danger-note">
                        This action cannot be undone. All your data will be permanently deleted.
                      </p>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>

      <div class="loading-state" *ngIf="isLoading">
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        <p>Loading profile...</p>
      </div>

      <div class="error-state" *ngIf="!isLoading && !userData">
        <mat-icon>error_outline</mat-icon>
        <h3>Unable to load profile</h3>
        <p>There was an issue loading your profile data. Please try refreshing the page.</p>
        <button mat-raised-button color="primary" (click)="loadUserData()">
          <mat-icon>refresh</mat-icon>
          Retry
        </button>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
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
    }

    .profile-content {
      max-width: 1000px;
      margin: -40px auto 0;
      padding: 0 24px 80px;
    }

    .profile-tabs {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .tab-content {
      padding: 24px;
    }

    .profile-card, .stats-card, .subscription-card, .security-card {
      margin-bottom: 24px;
    }

    .profile-form, .password-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 500px;
    }

    .full-width {
      width: 100%;
    }

    .account-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 24px 0;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .info-item mat-icon {
      color: #3f51b5;
    }

    .info-item h4, .info-item h5 {
      margin: 0 0 4px 0;
      color: #333;
      font-size: 1rem;
    }

    .info-item p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .stat-item {
      text-align: center;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: #3f51b5;
      margin-bottom: 8px;
    }

    .stat-label {
      font-size: 1rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }

    .stat-description {
      font-size: 0.8rem;
      color: #666;
      line-height: 1.4;
    }

    .usage-progress {
      margin-top: 24px;
    }

    .usage-progress h4 {
      margin: 0 0 12px 0;
      color: #333;
    }

    .progress-info {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      font-size: 0.9rem;
      color: #666;
    }

    .subscription-info {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .plan-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .billing-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .info-row span:first-child {
      font-weight: 500;
      color: #666;
    }

    .info-row span:last-child {
      color: #333;
    }

    .subscription-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .security-section {
      margin-bottom: 32px;
    }

    .security-section h4 {
      margin: 0 0 16px 0;
      color: #333;
      font-size: 1.2rem;
    }

    .device-info {
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .device-note {
      font-size: 0.8rem;
      color: #888 !important;
      font-style: italic;
    }

    .danger-zone {
      border: 1px solid #f44336;
      border-radius: 8px;
      padding: 20px;
      background: #fff5f5;
    }

    .danger-zone h4 {
      color: #f44336;
    }

    .danger-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: flex-start;
    }

    .danger-note {
      font-size: 0.9rem;
      color: #666;
      margin: 0;
      max-width: 400px;
    }

    .spinning {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-state {
      text-align: center;
      padding: 60px 24px;
    }

    .loading-state p {
      margin-top: 16px;
      color: #666;
    }

    .error-state {
      text-align: center;
      padding: 80px 24px;
      max-width: 400px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .error-state mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #f44336;
      margin-bottom: 16px;
    }

    .error-state h3 {
      color: #333;
      margin-bottom: 8px;
    }

    .error-state p {
      color: #666;
      margin-bottom: 24px;
    }

    .error-state button {
      margin-top: 16px;
    }

    @media (max-width: 768px) {
      .profile-content {
        padding: 0 16px 60px;
      }

      .hero-section {
        padding: 60px 16px 40px;
      }

      .hero-section h1 {
        font-size: 2rem;
      }

      .tab-content {
        padding: 16px;
      }

      .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 16px;
      }

      .account-info {
        grid-template-columns: 1fr;
      }

      .subscription-actions {
        flex-direction: column;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  userData: UserData | null = null;
  timeStatus: TimeStatus | null = null;
  isUpdating = false;
  isChangingPassword = false;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private snackBar: MatSnackBar,
    private timeManagementService: TimeManagementService
  ) {
    this.profileForm = this.fb.group({
      displayName: [''],
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Wait a bit for authentication state to settle
    setTimeout(() => {
      this.loadUserData();
      this.subscribeToTimeStatus();
    }, 500);
  }

  private subscribeToTimeStatus(): void {
    this.timeManagementService.timeStatus$.subscribe(status => {
      this.timeStatus = status;
    });
  }

  private passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  async loadUserData(): Promise<void> {
    this.isLoading = true;

    try {
      console.log('Loading user data...');

      // First check if user is authenticated
      const currentUser = this.firebaseService.getCurrentUser();
      if (!currentUser) {
        console.error('No authenticated user found');
        this.snackBar.open('Please log in to view your profile', 'Close', { duration: 3000 });
        return;
      }

      console.log('Current user:', currentUser.uid, currentUser.email);

      // Try to get user data from Firestore
      this.userData = await this.firebaseService.getCurrentUserData();

      if (!this.userData) {
        console.log('No user document found, creating one...');
        // Create user document if it doesn't exist
        await this.firebaseService.createUserDocument(currentUser);
        // Try to get user data again
        this.userData = await this.firebaseService.getCurrentUserData();
      }

      if (this.userData) {
        console.log('User data loaded successfully:', this.userData);
        this.profileForm.patchValue({
          displayName: this.userData.displayName || '',
          email: this.userData.email
        });
      } else {
        console.error('Failed to load or create user data, using fallback');
        // Create a fallback user data object with basic info from auth
        this.userData = {
          uid: currentUser.uid,
          email: currentUser.email || '',
          displayName: currentUser.displayName || '',
          timeLimit: 300,
          timeUsage: 0,
          lastLogin: new Date().toISOString(),
          apiKeys: {},
          subscription: {
            active: false,
            plan: 'free',
            expiresAt: ''
          }
        };

        this.profileForm.patchValue({
          displayName: this.userData.displayName || '',
          email: this.userData.email
        });

        this.snackBar.open('Profile loaded with basic information. Some features may be limited.', 'Close', { duration: 5000 });
      }
    } catch (error: any) {
      console.error('Error loading user data:', error);
      console.error('Error details:', error?.message, error?.code);
      this.snackBar.open('Failed to load profile data', 'Close', { duration: 3000 });
    } finally {
      this.isLoading = false;
    }
  }

  async updateProfile(): Promise<void> {
    if (this.profileForm.valid && this.userData) {
      this.isUpdating = true;
      try {
        const formData = this.profileForm.value;
        await this.firebaseService.updateUserProfile(this.userData.uid, {
          displayName: formData.displayName
        });
        
        this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 });
        await this.loadUserData();
      } catch (error) {
        console.error('Error updating profile:', error);
        this.snackBar.open('Failed to update profile', 'Close', { duration: 3000 });
      } finally {
        this.isUpdating = false;
      }
    }
  }

  async changePassword(): Promise<void> {
    if (this.passwordForm.valid) {
      this.isChangingPassword = true;
      try {
        // In a real implementation, you would call a password change method
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
        
        this.snackBar.open('Password changed successfully', 'Close', { duration: 3000 });
        this.passwordForm.reset();
      } catch (error) {
        console.error('Error changing password:', error);
        this.snackBar.open('Failed to change password', 'Close', { duration: 3000 });
      } finally {
        this.isChangingPassword = false;
      }
    }
  }

  upgradePlan(): void {
    // Navigate to pricing or payment page
    this.snackBar.open('Upgrade functionality coming soon!', 'Close', { duration: 3000 });
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Implement account deletion
      this.snackBar.open('Account deletion functionality coming soon!', 'Close', { duration: 3000 });
    }
  }

  getAccountCreatedDate(): string {
    return this.userData?.lastLogin ? new Date(this.userData.lastLogin).toLocaleDateString() : 'Unknown';
  }

  getLastLoginDate(): string {
    return this.userData?.lastLogin ? new Date(this.userData.lastLogin).toLocaleString() : 'Unknown';
  }

  getSessionsCount(): number {
    // This would come from usage statistics in a real implementation
    return Math.floor((this.userData?.timeUsage || 0) / 60);
  }

  getSuccessRate(): number {
    // This would be calculated from actual usage data
    return 95;
  }

  getUsagePercentage(): number {
    if (!this.timeStatus) return 0;
    return this.timeStatus.percentageUsed;
  }

  getRemainingTime(): number {
    if (!this.timeStatus) return 0;
    return this.timeStatus.timeRemaining;
  }

  getTimeWarningClass(): string {
    if (!this.timeStatus) return '';

    switch (this.timeStatus.warningLevel) {
      case 'critical': return 'time-critical';
      case 'high': return 'time-high';
      case 'medium': return 'time-medium';
      case 'low': return 'time-low';
      default: return '';
    }
  }

  getSubscriptionExpiry(): string {
    return this.userData?.subscription?.expiresAt ? 
      new Date(this.userData.subscription.expiresAt).toLocaleDateString() : 'N/A';
  }
}
