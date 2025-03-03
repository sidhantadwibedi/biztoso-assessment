import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  private listings: Listing[] = [];
  private listingsSubject = new BehaviorSubject<Listing[]>([]);
  private localStorageKey = 'marketplaceListings';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadFromStorage();
  }

  // ✅ Get listings as an observable
  getListings(): Observable<Listing[]> {
    return this.listingsSubject.asObservable();
  }

  // ✅ Get a single listing by ID
  getListingById(id: string): Listing | undefined {
    return this.listings.find((listing) => listing.id === id);
  }

  // ✅ Add a new listing
  addListing(listing: Listing): void {
    listing.id = this.generateUniqueId();
    this.listings.push(listing);
    this.updateAndSave();
  }

  // ✅ Update an existing listing
  updateListing(id: string, updatedListing: Listing): void {
    const index = this.listings.findIndex((l) => l.id === id);
    if (index > -1) {
      this.listings[index] = { ...updatedListing, id };
      this.updateAndSave();
    }
  }

  // ✅ Delete a listing
  deleteListing(id: string): void {
    this.listings = this.listings.filter((l) => l.id !== id);
    this.updateAndSave();
  }

  // ✅ Filter listings by search query and price range
  filterListings(search: string, minPrice: number, maxPrice: number): void {
    const filteredListings = this.listings.filter((listing) => {
      const matchesSearch = search
        ? listing.title.toLowerCase().includes(search.toLowerCase())
        : true;
      const withinPriceRange =
        listing.price >= minPrice && listing.price <= maxPrice;
      return matchesSearch && withinPriceRange;
    });

    this.listingsSubject.next(filteredListings);
  }

  // ✅ Load listings from localStorage (browser-safe check)
  private loadFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedListings = localStorage.getItem(this.localStorageKey);
      if (savedListings) {
        this.listings = JSON.parse(savedListings);
        this.listingsSubject.next(this.listings);
      }
    }
  }

  // ✅ Save listings and notify subscribers (browser-safe check)
  private updateAndSave(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.listings));
    }
    this.listingsSubject.next([...this.listings]);
  }

  // ✅ Helper method to generate a unique ID
  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
