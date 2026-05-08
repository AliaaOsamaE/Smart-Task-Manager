import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

/**
 * Auth Guard - Protects routes from unauthorized access
 * 
 * This guard checks if a user is logged in before allowing access to protected routes.
 * If the user is not logged in, they are redirected to the login page.
 * 
 * Usage in routes:
 * {
 *   path: 'protected-route',
 *   component: SomeComponent,
 *   canActivate: [authGuard]
 * }
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  // Check if user is logged in
  if (userService.isLoggedIn()) {
    // User is authenticated, allow access
    return true;
  } else {
    // User is not authenticated, redirect to login
    console.log('Access denied. Redirecting to login...');
    router.navigate(['/login']);
    return false;
  }
};

// Made with Bob
