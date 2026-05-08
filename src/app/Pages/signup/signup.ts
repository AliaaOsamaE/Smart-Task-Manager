import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../types';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  // Inject services
  private userService = inject(UserService);
  private router = inject(Router);

  // Form fields
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  
  // Error handling
  errorMessage: string = '';
  showError: boolean = false;

  /**
   * Handle signup form submission
   * Validates input and creates new user account
   */
  onSignup(): void {
    // Reset error state
    this.showError = false;
    this.errorMessage = '';

    // Validate all fields are filled
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
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

    // Validate password length
    if (this.password.length < 6) {
      this.showError = true;
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    // Validate passwords match
    if (this.password !== this.confirmPassword) {
      this.showError = true;
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Check if email already exists
    this.userService.checkEmail(this.email).subscribe({
      next: (users) => {
        if (users.length > 0) {
          // Email already exists
          this.showError = true;
          this.errorMessage = 'This email is already registered. Please login instead.';
        } else {
          // Email is available, create new user
          this.createUser();
        }
      },
      error: (error) => {
        console.error('Error checking email:', error);
        this.showError = true;
        this.errorMessage = 'An error occurred. Please try again.';
      }
    });
  }

  /**
   * Create new user account
   */
  private createUser(): void {
    const newUser: User = {
      id: Date.now().toString(), // Simple ID generation
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.userService.addUser(newUser).subscribe({
      next: (user) => {
        // User created successfully
        // Store user data in localStorage
        localStorage.setItem('email', user.email);
        localStorage.setItem('username', user.username);
        localStorage.setItem('userId', user.id);
        
        // Redirect to home page
        this.router.navigate(['/layout/home']);
      },
      error: (error) => {
        console.error('Error creating user:', error);
        this.showError = true;
        this.errorMessage = 'Failed to create account. Please try again.';
      }
    });
  }
}

// Made with Bob
