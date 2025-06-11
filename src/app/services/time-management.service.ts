import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, Subscription } from 'rxjs';
import { FirebaseService, UserData } from './firebase.service';
import { environment } from '../../environments/environment';

export interface TimeStatus {
  timeUsed: number;
  timeLimit: number;
  timeRemaining: number;
  percentageUsed: number;
  isExpired: boolean;
  canUseService: boolean;
  displayTime: string;
  warningLevel: 'none' | 'low' | 'medium' | 'high' | 'critical';
}

@Injectable({
  providedIn: 'root'
})
export class TimeManagementService {
  private timeStatusSubject = new BehaviorSubject<TimeStatus | null>(null);
  public timeStatus$ = this.timeStatusSubject.asObservable();
  
  private timerSubscription?: Subscription;
  private sessionStartTime?: Date;
  private isSessionActive = false;

  constructor(private firebaseService: FirebaseService) {
    // Listen to user changes
    this.firebaseService.currentUser$.subscribe(user => {
      if (user) {
        this.loadUserTimeData();
      } else {
        this.stopSession();
        this.timeStatusSubject.next(null);
      }
    });
  }

  /**
   * Load user time data and update status
   */
  async loadUserTimeData(): Promise<void> {
    try {
      const user = this.firebaseService.getCurrentUser();
      if (!user) return;

      const userData = await this.firebaseService.getUserData(user.uid);
      if (userData) {
        this.updateTimeStatus(userData);
      }
    } catch (error) {
      console.error('Error loading user time data:', error);
    }
  }

  /**
   * Start a new session
   */
  async startSession(): Promise<{ success: boolean; message: string }> {
    try {
      const user = this.firebaseService.getCurrentUser();
      if (!user) {
        return { success: false, message: 'User not authenticated' };
      }

      const userData = await this.firebaseService.getUserData(user.uid);
      if (!userData) {
        return { success: false, message: 'User data not found' };
      }

      // Check if user has time remaining
      const timeRemaining = userData.timeLimit - userData.timeUsage;
      if (timeRemaining <= 0) {
        return { 
          success: false, 
          message: 'No time remaining. Please purchase more time to continue.' 
        };
      }

      // Start session
      this.sessionStartTime = new Date();
      this.isSessionActive = true;
      this.startTimer();
      
      return { success: true, message: 'Session started successfully' };
    } catch (error) {
      console.error('Error starting session:', error);
      return { success: false, message: 'Failed to start session' };
    }
  }

  /**
   * Stop current session and save time usage
   */
  async stopSession(): Promise<void> {
    if (!this.isSessionActive || !this.sessionStartTime) return;

    try {
      const sessionDuration = Math.floor((Date.now() - this.sessionStartTime.getTime()) / 1000);
      
      const user = this.firebaseService.getCurrentUser();
      if (user) {
        await this.updateTimeUsage(user.uid, sessionDuration);
      }

      this.isSessionActive = false;
      this.sessionStartTime = undefined;
      this.stopTimer();
      
      // Reload user data to get updated time
      await this.loadUserTimeData();
    } catch (error) {
      console.error('Error stopping session:', error);
    }
  }

  /**
   * Get current time status
   */
  getCurrentTimeStatus(): TimeStatus | null {
    return this.timeStatusSubject.value;
  }

  /**
   * Check if user can start a new session
   */
  async canStartSession(): Promise<boolean> {
    const user = this.firebaseService.getCurrentUser();
    if (!user) return false;

    const userData = await this.firebaseService.getUserData(user.uid);
    if (!userData) return false;

    return (userData.timeLimit - userData.timeUsage) > 0;
  }

  /**
   * Add time to user account (for purchases)
   */
  async addTime(uid: string, additionalSeconds: number): Promise<void> {
    try {
      const userData = await this.firebaseService.getUserData(uid);
      if (userData) {
        const newTimeLimit = userData.timeLimit + additionalSeconds;
        await this.firebaseService.updateUserProfile(uid, { timeLimit: newTimeLimit });
        await this.loadUserTimeData();
      }
    } catch (error) {
      console.error('Error adding time:', error);
    }
  }

  /**
   * Reset user time usage (admin function)
   */
  async resetTimeUsage(uid: string): Promise<void> {
    try {
      await this.firebaseService.updateUserProfile(uid, { timeUsage: 0 });
      await this.loadUserTimeData();
    } catch (error) {
      console.error('Error resetting time usage:', error);
    }
  }

  /**
   * Format seconds to readable time string
   */
  formatTime(seconds: number): string {
    if (seconds <= 0) return '0m 0s';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  }

  /**
   * Get warning level based on time remaining
   */
  private getWarningLevel(percentageUsed: number): TimeStatus['warningLevel'] {
    if (percentageUsed >= 100) return 'critical';
    if (percentageUsed >= 90) return 'high';
    if (percentageUsed >= 75) return 'medium';
    if (percentageUsed >= 50) return 'low';
    return 'none';
  }

  /**
   * Update time status based on user data
   */
  private updateTimeStatus(userData: UserData): void {
    const timeUsed = userData.timeUsage || 0;
    const timeLimit = userData.timeLimit || environment.pricing.freeTimeLimit;
    const timeRemaining = Math.max(0, timeLimit - timeUsed);
    const percentageUsed = timeLimit > 0 ? (timeUsed / timeLimit) * 100 : 0;
    const isExpired = timeRemaining <= 0;
    const canUseService = timeRemaining > 0;

    const timeStatus: TimeStatus = {
      timeUsed,
      timeLimit,
      timeRemaining,
      percentageUsed: Math.min(100, percentageUsed),
      isExpired,
      canUseService,
      displayTime: this.formatTime(timeRemaining),
      warningLevel: this.getWarningLevel(percentageUsed)
    };

    this.timeStatusSubject.next(timeStatus);
  }

  /**
   * Start the timer for active session
   */
  private startTimer(): void {
    this.stopTimer(); // Stop any existing timer
    
    // Update every second
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.isSessionActive && this.sessionStartTime) {
        const currentSessionTime = Math.floor((Date.now() - this.sessionStartTime.getTime()) / 1000);
        
        // Update display with current session time
        const currentStatus = this.timeStatusSubject.value;
        if (currentStatus) {
          const adjustedTimeUsed = currentStatus.timeUsed + currentSessionTime;
          const adjustedTimeRemaining = Math.max(0, currentStatus.timeLimit - adjustedTimeUsed);
          const adjustedPercentage = currentStatus.timeLimit > 0 ? (adjustedTimeUsed / currentStatus.timeLimit) * 100 : 0;
          
          const updatedStatus: TimeStatus = {
            ...currentStatus,
            timeUsed: adjustedTimeUsed,
            timeRemaining: adjustedTimeRemaining,
            percentageUsed: Math.min(100, adjustedPercentage),
            isExpired: adjustedTimeRemaining <= 0,
            canUseService: adjustedTimeRemaining > 0,
            displayTime: this.formatTime(adjustedTimeRemaining),
            warningLevel: this.getWarningLevel(adjustedPercentage)
          };
          
          this.timeStatusSubject.next(updatedStatus);
          
          // Auto-stop session if time runs out
          if (adjustedTimeRemaining <= 0) {
            this.stopSession();
          }
        }
      }
    });
  }

  /**
   * Stop the timer
   */
  private stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }

  /**
   * Update time usage in database
   */
  private async updateTimeUsage(uid: string, additionalSeconds: number): Promise<void> {
    try {
      const userData = await this.firebaseService.getUserData(uid);
      if (userData) {
        const newTimeUsage = userData.timeUsage + additionalSeconds;
        await this.firebaseService.updateUserProfile(uid, { timeUsage: newTimeUsage });
      }
    } catch (error) {
      console.error('Error updating time usage:', error);
    }
  }

  /**
   * Cleanup when service is destroyed
   */
  ngOnDestroy(): void {
    this.stopTimer();
    if (this.isSessionActive) {
      this.stopSession();
    }
  }
}
