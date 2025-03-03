import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-form',
  standalone: true, // ✅ Important for standalone usage
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule], // ✅ Import required modules
})
export class ProfileFormComponent {
  profileForm: FormGroup;
  logoPreview: string | null = null;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      logo: [null, Validators.required],
    });
  }

  // ✅ Handle Image Upload & Preview
  onLogoChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.profileForm.patchValue({ logo: file });
      this.profileForm.get('logo')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => (this.logoPreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  // ✅ Handle Form Submission
  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Profile Form Data:', this.profileForm.value);
      alert('Form submitted successfully!');
    } else {
      alert('Please correct the form errors.');
    }
  }
}
