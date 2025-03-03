import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lead } from '../../../../core/models/lead.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lead-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss'],
})
export class LeadListComponent implements OnInit {
  leads: Lead[] = [];
  filteredLeads: Lead[] = [];
  statusFilter: 'all' | 'new' | 'contacted' | 'claimed' = 'all';

  constructor() {}

  ngOnInit(): void {
    this.fetchLeads();
  }

  // Simulate fetching leads from a mock API
  fetchLeads(): void {
    this.leads = [
      { id: '1', name: 'Alice Johnson', email: 'alice@example.com', status: 'new' },
      { id: '2', name: 'Bob Smith', email: 'bob@example.com', status: 'contacted' },
      { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', status: 'new' },
    ];
    this.applyFilter();
  }

  // Apply lead status filter
  applyFilter(): void {
    if (this.statusFilter === 'all') {
      this.filteredLeads = this.leads;
    } else {
      this.filteredLeads = this.leads.filter(lead => lead.status === this.statusFilter);
    }
  }

  // Claim a lead and update its status
  claimLead(leadId: string): void {
    const lead = this.leads.find(lead => lead.id === leadId);
    if (lead && lead.status === 'new') {
      lead.status = 'claimed';
      this.applyFilter();
    }
  }
}
