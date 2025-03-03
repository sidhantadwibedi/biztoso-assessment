import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService, UserProfile } from '../../../app/core/services/profile.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  profileForm: FormGroup;
  userProfile: UserProfile | null = null;
  isEditing = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      bio: ['', [Validators.maxLength(300)]],
    });
  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((profile) => {
      this.userProfile = profile;
      if (profile) this.profileForm.patchValue(profile);
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const updatedProfile = { ...this.profileForm.value, id: 'user123' };
      this.profileService.updateProfile(updatedProfile);
      this.isEditing = false;
      alert('Profile updated successfully!');
    }
  }

  goToNetworking(): void {
    this.router.navigate(['/networking']);
  }

  goToChat(): void {
    this.router.navigate(['/networking/chat']);
  }

  goToMarketplace(): void {
    this.router.navigate(['/marketplace']);
  }

  goToCreateListing(): void {
    this.router.navigate(['/marketplace/create']);
  }
}
