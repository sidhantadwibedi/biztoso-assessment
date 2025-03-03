import { Routes } from '@angular/router';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ChatComponent } from './components/chat/chat.component';

export const NETWORKING_ROUTES: Routes = [
  { path: '', component: ProfileFormComponent }, // /networking
  { path: 'chat', component: ChatComponent },    // /networking/chat
];
