import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

export const authGuard = () => {
  const firebaseService = inject(FirebaseService);
  const router = inject(Router);

  if (firebaseService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
