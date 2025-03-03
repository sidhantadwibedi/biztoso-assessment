import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  // Simulate user registration
  register(userData: { name: string; email: string; password: string }): boolean {
    if (localStorage.getItem(userData.email)) {
      return false; // User already exists
    }
    localStorage.setItem(userData.email, JSON.stringify(userData));
    return true;
  }

  // Simulate user login
  login(email: string, password: string): boolean {
    const user = localStorage.getItem(email);
    if (!user) return false;

    const userData = JSON.parse(user);
    if (userData.password === password) {
      localStorage.setItem('authUser', email);
      return true;
    }
    return false;
  }

  // Check if user is logged in
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authUser');
  }

  getUser(): { name: string; email: string } | null {
    const email = localStorage.getItem('authUser');
    if (email) {
      const user = JSON.parse(localStorage.getItem(email)!);
      return { name: user.name, email: user.email };
    }
    return null;
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('authUser');
    this.router.navigate(['/auth/login']);
  }
}
