import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // Inject services
  private userService = inject(UserService);
  private router = inject(Router);

  // Form fields
  email: string = '';
  password: string = '';
  
  // Error handling
  errorMessage: string = '';
  showError: boolean = false;

  /**
   * Handle login form submission
   * Validates credentials and redirects on success
   */
  onLogin(): void {
    // Reset error state
    this.showError = false;
    this.errorMessage = '';

    // Validate form fields
    if (!this.email || !this.password) {
      this.showError = true;
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.showError = true;
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    // Attempt login
    this.userService.login(this.email, this.password).subscribe({
      next: (users) => {
        if (users.length > 0) {
          // Login successful - user found
          const user = users[0];
          
          // Store user data in localStorage
          localStorage.setItem('email', user.email);
          localStorage.setItem('username', user.username);
          localStorage.setItem('userId', user.id);
          
          // Redirect to home page
          this.router.navigate(['/layout/home']);
        } else {
          // Login failed - no matching user
          this.showError = true;
          this.errorMessage = 'Invalid email or password';
        }
      },
      error: (error) => {
        // Handle server error
        console.error('Login error:', error);
        this.showError = true;
        this.errorMessage = 'An error occurred. Please try again.';
      }
    });
  }
}

// Made with Bob
