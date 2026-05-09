import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  userService = inject(UserService);
  private router = inject(Router);

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  getUsername(): string | null {
    return this.userService.getCurrentUsername();
  }

  onLogout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.userService.logout();
      this.router.navigate(['/login']);
    }
  }
}

