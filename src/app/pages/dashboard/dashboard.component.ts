import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { FirebaseService, UserData } from '../../services/firebase.service';
import { TimeManagementService, TimeStatus } from '../../services/time-management.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userData: UserData | null = null;
  timeStatus: TimeStatus | null = null;
  pricing = environment.pricing;

  constructor(
    private firebaseService: FirebaseService,
    private timeManagementService: TimeManagementService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadUserData();
    this.subscribeToTimeStatus();
  }

  async loadUserData(): Promise<void> {
    const user = this.firebaseService.getCurrentUser();
    if (user) {
      this.userData = await this.firebaseService.getUserData(user.uid);
      await this.timeManagementService.loadUserTimeData();
    }
  }

  private subscribeToTimeStatus(): void {
    this.timeManagementService.timeStatus$.subscribe(status => {
      this.timeStatus = status;
    });
  }

  hasApiKey(provider: string): boolean {
    return this.userData?.apiKeys?.[provider as keyof typeof this.userData.apiKeys] ? true : false;
  }

  getUsagePercentage(): number {
    if (!this.timeStatus) return 0;
    return this.timeStatus.percentageUsed;
  }

  getRemainingTime(): string {
    if (!this.timeStatus) return '0m 0s';
    return this.timeStatus.displayTime;
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

  canUseService(): boolean {
    return this.timeStatus?.canUseService ?? false;
  }

  async startSession(): Promise<void> {
    const result = await this.timeManagementService.startSession();
    if (!result.success) {
      // Handle error - could show a snackbar or dialog
      console.error('Failed to start session:', result.message);
    }
  }

  getConfiguredKeysCount(): number {
    if (!this.userData?.apiKeys) return 0;
    return Object.values(this.userData.apiKeys).filter(key => key && key.trim()).length;
  }

  getFormattedDate(dateString?: string): string {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'N/A';
    }
  }
}
