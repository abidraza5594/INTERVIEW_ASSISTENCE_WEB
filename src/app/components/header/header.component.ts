import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule
  ],
  template: `
    <mat-toolbar color="primary" class="header-toolbar">
      <div class="header-container">
        <div class="logo-section">
          <a routerLink="/" class="logo-link">
            <mat-icon class="logo-icon">smart_toy</mat-icon>
            <span class="logo-text">Abid Ansari AI Assistant</span>
          </a>
        </div>

        <nav class="nav-links">
          <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            Home
          </a>
          <a mat-button routerLink="/download" routerLinkActive="active">
            Download
          </a>
          <a mat-button routerLink="/documentation" routerLinkActive="active">
            Documentation
          </a>
          <a mat-button routerLink="/pricing" routerLinkActive="active">
            Pricing
          </a>
          <a mat-button routerLink="/contact" routerLinkActive="active">
            Contact
          </a>
        </nav>

        <div class="auth-section">
          <ng-container *ngIf="currentUser$ | async as user; else authButtons">
            <button mat-button [matMenuTriggerFor]="userMenu" class="user-menu-trigger">
              <mat-icon>account_circle</mat-icon>
              <span>{{ user.email }}</span>
              <mat-icon>arrow_drop_down</mat-icon>
            </button>
            <mat-menu #userMenu="matMenu">
              <a mat-menu-item routerLink="/dashboard">
                <mat-icon>dashboard</mat-icon>
                <span>Dashboard</span>
              </a>
              <a mat-menu-item routerLink="/profile">
                <mat-icon>person</mat-icon>
                <span>Profile</span>
              </a>
              <a mat-menu-item routerLink="/api-keys">
                <mat-icon>vpn_key</mat-icon>
                <span>API Keys</span>
              </a>
              <a mat-menu-item routerLink="/about-us">
                <mat-icon>info</mat-icon>
                <span>About Us</span>
              </a>
              <mat-divider></mat-divider>
              <button mat-menu-item (click)="logout()">
                <mat-icon>logout</mat-icon>
                <span>Logout</span>
              </button>
            </mat-menu>
          </ng-container>

          <ng-template #authButtons>
            <a mat-button routerLink="/login" class="auth-button">
              Login
            </a>
            <a mat-raised-button color="accent" routerLink="/register" class="auth-button">
              Register
            </a>
          </ng-template>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--z-index-fixed);
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--color-gray-200);
      box-shadow: var(--shadow-sm);
      transition: var(--transition-base);
      height: 72px;
    }

    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-6);
      height: 100%;
    }

    .logo-section {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .logo-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: var(--color-gray-900);
      transition: var(--transition-fast);
      padding: var(--spacing-2);
      border-radius: var(--radius-lg);

      &:hover {
        background-color: var(--color-gray-50);
        transform: translateY(-1px);
      }
    }

    .logo-icon {
      margin-right: var(--spacing-3);
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: var(--color-primary-600);
    }

    .logo-text {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      font-family: var(--font-family-primary);
      letter-spacing: var(--letter-spacing-tight);
      background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      flex: 1;
      justify-content: center;
      margin: 0 var(--spacing-8);
    }

    .nav-links a {
      color: var(--color-gray-700);
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-sm);
      padding: var(--spacing-3) var(--spacing-4);
      border-radius: var(--radius-lg);
      transition: var(--transition-fast);
      position: relative;
      text-decoration: none;
      letter-spacing: var(--letter-spacing-wide);

      &:hover {
        color: var(--color-primary-600);
        background-color: var(--color-primary-50);
        transform: translateY(-1px);
      }

      &.active {
        color: var(--color-primary-700);
        background-color: var(--color-primary-100);
        font-weight: var(--font-weight-semibold);

        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: var(--color-primary-600);
          border-radius: var(--radius-full);
        }
      }
    }

    .auth-section {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      flex-shrink: 0;
    }

    .user-menu-trigger {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      padding: var(--spacing-2) var(--spacing-3);
      border-radius: var(--radius-lg);
      background-color: var(--color-gray-50);
      border: 1px solid var(--color-gray-200);
      transition: var(--transition-fast);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-gray-700);

      &:hover {
        background-color: var(--color-gray-100);
        border-color: var(--color-gray-300);
        transform: translateY(-1px);
        box-shadow: var(--shadow-sm);
      }

      mat-icon:first-child {
        color: var(--color-primary-600);
      }

      mat-icon:last-child {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    }

    .auth-button {
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-sm);
      padding: var(--spacing-3) var(--spacing-5);
      border-radius: var(--radius-lg);
      transition: var(--transition-fast);
      letter-spacing: var(--letter-spacing-wide);

      &:first-of-type {
        color: var(--color-gray-700);

        &:hover {
          background-color: var(--color-gray-100);
          color: var(--color-gray-900);
        }
      }

      &:last-of-type {
        background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
        color: white;
        box-shadow: var(--shadow-sm);

        &:hover {
          background: linear-gradient(135deg, var(--color-primary-700), var(--color-primary-800));
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }
      }
    }

    @media (max-width: 1024px) {
      .header-container {
        padding: 0 var(--spacing-4);
      }

      .nav-links {
        margin: 0 var(--spacing-4);
        gap: var(--spacing-1);
      }

      .nav-links a {
        padding: var(--spacing-2) var(--spacing-3);
        font-size: var(--font-size-xs);
      }
    }

    @media (max-width: 768px) {
      .header-container {
        padding: 0 var(--spacing-4);
      }

      .logo-text {
        display: none;
      }

      .nav-links {
        display: none;
      }

      .auth-section {
        gap: var(--spacing-2);
      }

      .auth-button {
        padding: var(--spacing-2) var(--spacing-4);
        font-size: var(--font-size-xs);
      }
    }

    @media (max-width: 480px) {
      .header-container {
        padding: 0 var(--spacing-3);
      }

      .logo-icon {
        margin-right: var(--spacing-2);
        font-size: 28px;
        width: 28px;
        height: 28px;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<User | null>;

  constructor(private firebaseService: FirebaseService) {
    this.currentUser$ = this.firebaseService.currentUser$;
  }

  ngOnInit(): void {}

  async logout(): Promise<void> {
    try {
      await this.firebaseService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
