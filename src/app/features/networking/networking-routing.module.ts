import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  { path: '', component: ProfileFormComponent }, // /networking
  { path: 'chat', component: ChatComponent },    // /networking/chat
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetworkingRoutingModule {}
