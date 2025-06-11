import { Injectable } from '@angular/core';

export interface DeviceFingerprint {
  id: string;
  userAgent: string;
  screenResolution: string;
  timezone: string;
  language: string;
  platform: string;
  cookieEnabled: boolean;
  doNotTrack: string;
  hardwareConcurrency: number;
  maxTouchPoints: number;
  colorDepth: number;
  pixelRatio: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeviceFingerprintService {
  private readonly STORAGE_KEY = 'device_fingerprint';

  constructor() {}

  /**
   * Generate a unique device fingerprint
   */
  async generateFingerprint(): Promise<DeviceFingerprint> {
    const fingerprint: DeviceFingerprint = {
      id: '',
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack || 'unknown',
      hardwareConcurrency: navigator.hardwareConcurrency || 0,
      maxTouchPoints: navigator.maxTouchPoints || 0,
      colorDepth: screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      timestamp: new Date().toISOString()
    };

    // Generate canvas fingerprint
    const canvasFingerprint = await this.generateCanvasFingerprint();
    
    // Generate WebGL fingerprint
    const webglFingerprint = this.generateWebGLFingerprint();

    // Combine all fingerprint data
    const combinedData = JSON.stringify({
      ...fingerprint,
      canvas: canvasFingerprint,
      webgl: webglFingerprint
    });

    // Generate hash
    fingerprint.id = await this.generateHash(combinedData);

    return fingerprint;
  }

  /**
   * Get stored device fingerprint or generate new one
   */
  async getDeviceFingerprint(): Promise<DeviceFingerprint> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    
    if (stored) {
      try {
        const fingerprint = JSON.parse(stored) as DeviceFingerprint;
        // Verify fingerprint is still valid (not older than 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        if (new Date(fingerprint.timestamp) > thirtyDaysAgo) {
          return fingerprint;
        }
      } catch (error) {
        console.warn('Invalid stored fingerprint, generating new one');
      }
    }

    // Generate new fingerprint
    const fingerprint = await this.generateFingerprint();
    this.storeFingerprint(fingerprint);
    return fingerprint;
  }

  /**
   * Store device fingerprint in localStorage
   */
  private storeFingerprint(fingerprint: DeviceFingerprint): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(fingerprint));
    } catch (error) {
      console.warn('Failed to store device fingerprint:', error);
    }
  }

  /**
   * Generate canvas fingerprint
   */
  private async generateCanvasFingerprint(): Promise<string> {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return 'no-canvas';

      canvas.width = 200;
      canvas.height = 50;

      // Draw text with different fonts and styles
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('Device fingerprint test 🔒', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('Device fingerprint test 🔒', 4, 17);

      // Draw some shapes
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = 'rgb(255,0,255)';
      ctx.beginPath();
      ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();

      return canvas.toDataURL();
    } catch (error) {
      return 'canvas-error';
    }
  }

  /**
   * Generate WebGL fingerprint
   */
  private generateWebGLFingerprint(): string {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      if (!gl) return 'no-webgl';

      const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
      const vendor = debugInfo ? (gl as any).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'unknown';
      const renderer = debugInfo ? (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'unknown';

      return `${vendor}|${renderer}`;
    } catch (error) {
      return 'webgl-error';
    }
  }

  /**
   * Generate hash from string using Web Crypto API
   */
  private async generateHash(data: string): Promise<string> {
    try {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      // Fallback to simple hash if Web Crypto API is not available
      return this.simpleHash(data);
    }
  }

  /**
   * Simple hash function fallback
   */
  private simpleHash(str: string): string {
    let hash = 0;
    if (str.length === 0) return hash.toString();
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(16);
  }

  /**
   * Check if device fingerprint matches stored one
   */
  async isDeviceRecognized(): Promise<boolean> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return false;

    try {
      const storedFingerprint = JSON.parse(stored) as DeviceFingerprint;
      const currentFingerprint = await this.generateFingerprint();
      
      // Compare key fingerprint components
      return (
        storedFingerprint.userAgent === currentFingerprint.userAgent &&
        storedFingerprint.screenResolution === currentFingerprint.screenResolution &&
        storedFingerprint.timezone === currentFingerprint.timezone &&
        storedFingerprint.platform === currentFingerprint.platform
      );
    } catch (error) {
      return false;
    }
  }

  /**
   * Clear stored device fingerprint
   */
  clearFingerprint(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Get device info for display
   */
  getDeviceInfo(): { [key: string]: string } {
    return {
      'Browser': navigator.userAgent.split(' ').pop() || 'Unknown',
      'Platform': navigator.platform,
      'Screen': `${screen.width}x${screen.height}`,
      'Language': navigator.language,
      'Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      'Cores': navigator.hardwareConcurrency?.toString() || 'Unknown'
    };
  }

  /**
   * Check if this is likely a different device
   */
  async isDifferentDevice(storedFingerprintId: string): Promise<boolean> {
    const currentFingerprint = await this.generateFingerprint();
    return currentFingerprint.id !== storedFingerprintId;
  }
}
