import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { User } from '../types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';

  async addUser(user: User) {
    await firstValueFrom(
      this.http.post(this.apiUrl, user)
    );
  }

  checkEmail(email: string) {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`);
  }

  login(email: string, password: string) {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`);
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  }

  isLoggedIn() {
    return localStorage.getItem('email') !== null;
  }

  getCurrentUserEmail() {
    return localStorage.getItem('email');
  }

  getCurrentUsername() {
    return localStorage.getItem('username');
  }

  getCurrentUserId() {
    return localStorage.getItem('userId');
  }
}
