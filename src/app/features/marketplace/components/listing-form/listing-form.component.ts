import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ListingService, Listing } from '../../../../core/services/listing.service';

@Component({
  selector: 'app-listing-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.scss'],
})
export class ListingFormComponent implements OnInit {
  listingForm: FormGroup;
  imagesPreview: string[] = [];
  isEditMode = false;
  listingId?: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private listingService: ListingService
  ) {
    this.listingForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: [0, [Validators.required, Validators.min(0)]],
      images: [[], [Validators.required, this.validateImageCount]],
    });
  }

  ngOnInit(): void {
    this.listingId = this.route.snapshot.paramMap.get('id') ?? undefined;
    this.isEditMode = !!this.listingId;

    if (this.isEditMode) {
      this.loadListingData();
    }
  }

  // ✅ Load existing listing data for editing
  private loadListingData(): void {
    const listing = this.listingService.getListingById(this.listingId!);
    if (listing) {
      this.listingForm.patchValue(listing);
      this.imagesPreview = listing.images;
    } else {
      alert('Listing not found');
      this.router.navigate(['/marketplace']);
    }
  }

  // ✅ Custom validator to limit image upload to 5 images
  validateImageCount(control: AbstractControl): ValidationErrors | null {
    return control.value && control.value.length <= 5
      ? null
      : { maxImages: true };
  }

  // ✅ Handle image uploads and previews
  onImageChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      const newImages = Array.from(files);
      const totalImages = this.listingForm.get('images')?.value.length + newImages.length;

      if (totalImages > 5) {
        alert('You can upload a maximum of 5 images.');
        return;
      }

      newImages.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagesPreview.push(reader.result as string);
          this.listingForm.patchValue({
            images: [...this.listingForm.get('images')?.value, reader.result],
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // ✅ Handle form submission (Create or Update)
  onSubmit(): void {
    if (this.listingForm.invalid) {
      this.listingForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode) {
      this.listingService.updateListing(this.listingId!, this.listingForm.value);
      alert('Listing updated successfully!');
    } else {
      this.listingService.addListing(this.listingForm.value);
      alert('Listing created successfully!');
    }

    this.router.navigate(['/marketplace']);
  }
}
