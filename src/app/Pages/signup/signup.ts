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
  private userService = inject(UserService);
  private router = inject(Router);

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  showError: boolean = false;

  onSignup(): void {
    this.showError = false;
    this.errorMessage = '';

    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.showError = true;
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.showError = true;
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    if (this.password.length < 6) {
      this.showError = true;
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showError = true;
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.userService.checkEmail(this.email).subscribe({
      next: (users) => {
        if (users.length > 0) {
          this.showError = true;
          this.errorMessage = 'This email is already registered. Please login instead.';
        } else {
          this.createUser();
        }
      },
      error: () => {
        this.showError = true;
        this.errorMessage = 'An error occurred. Please try again.';
      }
    });
  }

  private createUser(): void {
    const newUser: User = {
      id: Date.now().toString(),
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.userService.addUser(newUser).then(() => {
      localStorage.setItem('email', newUser.email);
      localStorage.setItem('username', newUser.username);
      localStorage.setItem('userId', newUser.id);
      
      this.router.navigate(['/layout/home']);
    }).catch(() => {
      this.showError = true;
      this.errorMessage = 'Failed to create account. Please try again.';
    });
  }
}

