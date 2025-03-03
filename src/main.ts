import { provideRouter, Router } from '@angular/router';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).then((module) => {
  const router = module.injector.get(Router);
  console.log('Available Routes:', router.config);
}).catch((err) => console.error(err));
