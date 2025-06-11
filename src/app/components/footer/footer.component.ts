import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>AI Assistant</h3>
            <p>Professional AI-powered interview assistant with advanced features for technical interviews and coding challenges.</p>
            <div class="social-links">
              <a href="mailto:{{ contact.email }}" mat-icon-button aria-label="Email">
                <mat-icon>email</mat-icon>
              </a>
              <a href="https://wa.me/{{ contact.whatsapp }}" target="_blank" mat-icon-button aria-label="WhatsApp">
                <mat-icon>chat_bubble</mat-icon>
              </a>
            </div>
          </div>

          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul class="footer-links">
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/download">Download</a></li>
              <li><a routerLink="/documentation">Documentation</a></li>
              <li><a routerLink="/pricing">Pricing</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Account</h4>
            <ul class="footer-links">
              <li><a routerLink="/login">Login</a></li>
              <li><a routerLink="/register">Register</a></li>
              <li><a routerLink="/dashboard">Dashboard</a></li>
              <li><a routerLink="/api-keys">API Keys</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Support</h4>
            <ul class="footer-links">
              <li><a routerLink="/contact">Contact Us</a></li>
              <li><a href="mailto:{{ contact.email }}">Email Support</a></li>
              <li><a href="https://wa.me/{{ contact.whatsapp }}" target="_blank">WhatsApp Support</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <p>&copy; {{ currentYear }} Abid Ansari AI Assistant. All rights reserved.</p>
            <div class="footer-bottom-links">
              <a routerLink="/privacy">Privacy Policy</a>
              <a routerLink="/terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #1a1a1a;
      color: #ffffff;
      margin-top: auto;
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
      padding: 48px 0 32px;
    }

    .footer-section h3 {
      color: #3f51b5;
      margin-bottom: 16px;
      font-size: 24px;
      font-weight: 600;
    }

    .footer-section h4 {
      color: #ffffff;
      margin-bottom: 16px;
      font-size: 18px;
      font-weight: 500;
    }

    .footer-section p {
      color: #cccccc;
      line-height: 1.6;
      margin-bottom: 16px;
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-links li {
      margin-bottom: 8px;
    }

    .footer-links a {
      color: #cccccc;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-links a:hover {
      color: #3f51b5;
    }

    .social-links {
      display: flex;
      gap: 8px;
      margin-top: 16px;
    }

    .social-links a {
      color: #cccccc;
      transition: color 0.3s ease;
    }

    .social-links a:hover {
      color: #3f51b5;
    }

    .footer-bottom {
      border-top: 1px solid #333333;
      padding: 24px 0;
    }

    .footer-bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }

    .footer-bottom p {
      color: #cccccc;
      margin: 0;
    }

    .footer-bottom-links {
      display: flex;
      gap: 24px;
    }

    .footer-bottom-links a {
      color: #cccccc;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s ease;
    }

    .footer-bottom-links a:hover {
      color: #3f51b5;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 24px;
        padding: 32px 0 24px;
      }

      .footer-bottom-content {
        flex-direction: column;
        text-align: center;
      }

      .footer-bottom-links {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  contact = environment.contact;
}
