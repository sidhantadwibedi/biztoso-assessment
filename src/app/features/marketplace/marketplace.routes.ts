import { Routes } from '@angular/router';
import { ListingFormComponent } from './components/listing-form/listing-form.component';
import { ListingViewComponent } from './components/listing-view/listing-view.component';

export const MARKETPLACE_ROUTES: Routes = [
  { path: '', component: ListingViewComponent }, // /marketplace
  { path: 'create', component: ListingFormComponent }, // /marketplace/create
  { path: 'edit/:id', component: ListingFormComponent }, // /marketplace/edit/:id
];
