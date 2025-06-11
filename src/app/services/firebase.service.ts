import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { DeviceFingerprintService, DeviceFingerprint } from './device-fingerprint.service';
import { environment } from '../../environments/environment';

export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  timeLimit: number;
  timeUsage: number;
  deviceId?: string;
  lastLogin: string;
  deviceFingerprint?: string;
  deviceInfo?: any;
  apiKeys?: {
    gemini?: string;
    mistral?: string;
    openai?: string;
    openrouter?: string;
  };
  subscription?: {
    active: boolean;
    plan: string;
    expiresAt: string;
  };
  aboutUs?: string; // User's about us text for interviews
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private deviceFingerprintService: DeviceFingerprintService
  ) {
    // Listen to auth state changes
    this.auth.onAuthStateChanged(user => {
      this.currentUserSubject.next(user);
    });
  }

  // Device restriction methods
  async checkDeviceRestriction(): Promise<{ allowed: boolean; message: string }> {
    try {
      const deviceFingerprint = await this.deviceFingerprintService.getDeviceFingerprint();

      // Check if any user is already registered with this device
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('deviceFingerprint', '==', deviceFingerprint.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return {
          allowed: false,
          message: 'This device already has an account registered. Only one account per device is allowed.'
        };
      }

      return { allowed: true, message: 'Device is available for registration' };
    } catch (error) {
      console.error('Error checking device restriction:', error);
      return { allowed: true, message: 'Unable to verify device restriction' };
    }
  }

  async checkDeviceForLogin(email: string): Promise<{ allowed: boolean; message: string }> {
    try {
      const deviceFingerprint = await this.deviceFingerprintService.getDeviceFingerprint();
      const userData = await this.getUserDataByEmail(email);

      if (!userData) {
        return { allowed: false, message: 'User not found' };
      }

      // If user has no device fingerprint stored, update it
      if (!userData.deviceFingerprint) {
        await this.updateUserDevice(userData.uid, deviceFingerprint);
        return { allowed: true, message: 'Device registered for this account' };
      }

      // Check if device matches
      if (userData.deviceFingerprint !== deviceFingerprint.id) {
        return {
          allowed: false,
          message: 'This account is registered on a different device. Please use the original device or contact support.'
        };
      }

      return { allowed: true, message: 'Device verified' };
    } catch (error) {
      console.error('Error checking device for login:', error);
      return { allowed: true, message: 'Unable to verify device' };
    }
  }

  private async getUserDataByEmail(email: string): Promise<UserData | null> {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      return { uid: doc.id, ...doc.data() } as UserData;
    } catch (error) {
      console.error('Error getting user data by email:', error);
      return null;
    }
  }

  private async updateUserDevice(uid: string, deviceFingerprint: DeviceFingerprint): Promise<void> {
    try {
      const userRef = doc(this.firestore, 'users', uid);
      await updateDoc(userRef, {
        deviceFingerprint: deviceFingerprint.id,
        deviceInfo: this.deviceFingerprintService.getDeviceInfo(),
        lastLogin: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating user device:', error);
    }
  }

  // Authentication methods
  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      console.log('🔐 Attempting login for:', email);

      // First check if user exists in our Firestore database
      const userData = await this.getUserDataByEmail(email);
      if (!userData) {
        console.log('❌ User not found in database');
        return {
          success: false,
          message: 'No account found with this email address. Please register first or contact support.'
        };
      }

      // Check device restriction
      const deviceCheck = await this.checkDeviceForLogin(email);
      if (!deviceCheck.allowed) {
        console.log('❌ Device check failed:', deviceCheck.message);
        return {
          success: false,
          message: deviceCheck.message
        };
      }

      console.log('✅ Device check passed, attempting Firebase auth...');
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('✅ Firebase auth successful');

      // Update device info and last login
      const deviceFingerprint = await this.deviceFingerprintService.getDeviceFingerprint();
      await this.updateUserDevice(userCredential.user.uid, deviceFingerprint);

      return {
        success: true,
        message: 'Login successful',
        user: userCredential.user
      };
    } catch (error: any) {
      console.error('❌ Login error:', error);

      let errorMessage = 'Login failed';

      // Handle specific Firebase auth errors
      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email address. Please register first.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address format.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This account has been disabled. Please contact support.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed login attempts. Please try again later.';
            break;
          case 'auth/invalid-credential':
            errorMessage = 'Invalid email or password. Please check your credentials and try again.';
            break;
          default:
            errorMessage = error.message || 'Login failed';
        }
      }

      return {
        success: false,
        message: errorMessage
      };
    }
  }

  async register(email: string, password: string, displayName?: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      // Check device restriction first
      const deviceCheck = await this.checkDeviceRestriction();
      if (!deviceCheck.allowed) {
        return {
          success: false,
          message: deviceCheck.message
        };
      }

      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      // Create user document with device fingerprint
      const deviceFingerprint = await this.deviceFingerprintService.getDeviceFingerprint();
      await this.createUserDocumentWithDevice(userCredential.user, deviceFingerprint, displayName);

      return {
        success: true,
        message: 'Registration successful',
        user: userCredential.user
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Registration failed'
      };
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  // User data methods
  async createUserDocument(user: User, displayName?: string): Promise<void> {
    const userRef = doc(this.firestore, 'users', user.uid);
    const userData: UserData = {
      uid: user.uid,
      email: user.email!,
      displayName: displayName || user.displayName || '',
      timeLimit: environment.pricing.freeTimeLimit, // 5 minutes default
      timeUsage: 0,
      lastLogin: new Date().toISOString(),
      apiKeys: {},
      subscription: {
        active: false,
        plan: 'free',
        expiresAt: ''
      }
    };

    await setDoc(userRef, userData);
  }

  async createUserDocumentWithDevice(user: User, deviceFingerprint: DeviceFingerprint, displayName?: string): Promise<void> {
    const userRef = doc(this.firestore, 'users', user.uid);
    const userData: UserData = {
      uid: user.uid,
      email: user.email!,
      displayName: displayName || user.displayName || '',
      timeLimit: environment.pricing.freeTimeLimit, // 5 minutes default
      timeUsage: 0,
      lastLogin: new Date().toISOString(),
      deviceFingerprint: deviceFingerprint.id,
      deviceInfo: this.deviceFingerprintService.getDeviceInfo(),
      apiKeys: {},
      subscription: {
        active: false,
        plan: 'free',
        expiresAt: ''
      }
    };

    await setDoc(userRef, userData);
  }

  async getUserData(uid: string): Promise<UserData | null> {
    try {
      const userRef = doc(this.firestore, 'users', uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data() as UserData;
      }
      return null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  async updateUserApiKeys(uid: string, apiKeys: any): Promise<boolean> {
    try {
      console.log('Updating API keys for user:', uid);
      console.log('API keys to save:', Object.keys(apiKeys));

      const userRef = doc(this.firestore, 'users', uid);

      // First check if user document exists
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        console.error('User document does not exist, creating it first');
        // Create user document if it doesn't exist
        const currentUser = this.getCurrentUser();
        if (currentUser) {
          await this.createUserDocument(currentUser);
        } else {
          throw new Error('Cannot create user document: no current user');
        }
      }

      await updateDoc(userRef, {
        apiKeys,
        lastUpdated: new Date().toISOString()
      });

      console.log('API keys updated successfully');
      return true;
    } catch (error: any) {
      console.error('Error updating API keys:', error);
      console.error('Error code:', error?.code);
      console.error('Error message:', error?.message);
      return false;
    }
  }

  async updateSubscription(uid: string, subscription: any): Promise<boolean> {
    try {
      const userRef = doc(this.firestore, 'users', uid);
      await updateDoc(userRef, { subscription });
      return true;
    } catch (error) {
      console.error('Error updating subscription:', error);
      return false;
    }
  }

  private async updateLastLogin(uid: string): Promise<void> {
    try {
      const userRef = doc(this.firestore, 'users', uid);
      await updateDoc(userRef, { lastLogin: new Date().toISOString() });
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  // Additional methods for enhanced functionality
  async getCurrentUserData(): Promise<UserData | null> {
    const user = this.getCurrentUser();
    if (!user) {
      console.log('No current user found in getCurrentUserData');
      return null;
    }

    console.log('Getting user data for UID:', user.uid);
    const userData = await this.getUserData(user.uid);

    if (!userData) {
      console.log('No user document found for UID:', user.uid);
    }

    return userData;
  }

  async updateUserProfile(uid: string, data: Partial<UserData>): Promise<void> {
    const userRef = doc(this.firestore, 'users', uid);
    await updateDoc(userRef, data);
  }

  async updateUserAboutUs(uid: string, aboutUs: string): Promise<boolean> {
    try {
      const userRef = doc(this.firestore, 'users', uid);
      await updateDoc(userRef, {
        aboutUs,
        lastUpdated: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Error updating about us:', error);
      return false;
    }
  }
}
