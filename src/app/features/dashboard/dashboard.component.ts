import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../src/app/core/services/auth.service';

interface Listing {
  id: string;
  title: string;
  price: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: { name: string; email: string } | null = null;
  listings: Listing[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadUserListings();
  }

  loadUserListings(): void {
    this.listings = [
      { id: '1', title: 'Business Package', price: 150 },
      { id: '2', title: 'Premium Package', price: 300 },
    ];
  }

  logout(): void {
    this.authService.logout();
  }
}
