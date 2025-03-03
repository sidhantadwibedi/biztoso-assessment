import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListingService, Listing } from '../../../../core/services/listing.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listing-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './listing-view.component.html',
  styleUrls: ['./listing-view.component.scss'],
})
export class ListingViewComponent implements OnInit {
  listings$!: Observable<Listing[]>;
  filterForm: FormGroup;

  constructor(
    private router: Router,
    private listingService: ListingService,
    private fb: FormBuilder
  ) {
    // ✅ Initialize the form
    this.filterForm = this.fb.group({
      search: [''],
      minPrice: [0, Validators.min(0)],
      maxPrice: [10000, Validators.min(0)],
    });
  }

  ngOnInit(): void {
    // ✅ Load listings from the service
    this.listings$ = this.listingService.getListings();
  }

  // ✅ Apply filters based on form values
  applyFilters(): void {
    const { search, minPrice, maxPrice } = this.filterForm.value;
    this.listingService.filterListings(search, minPrice, maxPrice);
  }

  // ✅ Navigate to the create listing page
  navigateToCreate(): void {
    this.router.navigate(['/marketplace/create']);
  }

  // ✅ Navigate to the edit page
  navigateToEdit(id: string): void {
    this.router.navigate(['/marketplace/edit', id]);
  }

  // ✅ Delete a listing
  deleteListing(id: string): void {
    if (confirm('Are you sure you want to delete this listing?')) {
      this.listingService.deleteListing(id);
    }
  }
}
