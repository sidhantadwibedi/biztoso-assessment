import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Ensure it's a standalone component
  imports: [RouterModule, RouterOutlet], // ✅ Import required router modules
  template: `<router-outlet></router-outlet>`, // ✅ Ensure it renders routes
})
export class AppComponent {}
