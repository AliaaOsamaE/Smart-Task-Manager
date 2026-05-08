import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

/**
 * Header Component - Navigation bar with authentication features
 * 
 * This component:
 * - Displays navigation links
 * - Shows/hides links based on authentication status
 * - Provides logout functionality
 * - Displays current user's username
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Inject services
  userService = inject(UserService);
  private router = inject(Router);

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  /**
   * Get current user's username
   */
  getUsername(): string | null {
    return this.userService.getCurrentUsername();
  }

  /**
   * Handle logout
   */
  onLogout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.userService.logout();
      this.router.navigate(['/login']);
    }
  }
}

// Made with Bob
