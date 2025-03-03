import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileSubject = new BehaviorSubject<UserProfile | null>(null);
  private localStorageKey = 'userProfile';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadFromStorage();
  }

  // ✅ Get current profile as Observable
  getProfile(): Observable<UserProfile | null> {
    return this.profileSubject.asObservable();
  }

  // ✅ Update profile and save to localStorage
  updateProfile(profile: UserProfile): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(profile));
      this.profileSubject.next(profile);
    }
  }

  // ✅ Load profile from localStorage
  private loadFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedProfile = localStorage.getItem(this.localStorageKey);
      if (savedProfile) {
        this.profileSubject.next(JSON.parse(savedProfile));
      }
    }
  }
}
