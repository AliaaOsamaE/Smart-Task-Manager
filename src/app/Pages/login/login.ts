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
  private userService = inject(UserService);
  private router = inject(Router);

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showError: boolean = false;

  onLogin(): void {
    this.showError = false;
    this.errorMessage = '';

    if (!this.email || !this.password) {
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

    this.userService.login(this.email, this.password).subscribe({
      next: (users) => {
        if (users.length > 0) {
          const user = users[0];
          
          localStorage.setItem('email', user.email);
          localStorage.setItem('username', user.username);
          localStorage.setItem('userId', user.id);
          
          this.router.navigate(['/layout/home']);
        } else {
          this.showError = true;
          this.errorMessage = 'Invalid email or password';
        }
      },
      error: () => {
        this.showError = true;
        this.errorMessage = 'An error occurred. Please try again.';
      }
    });
  }
}

