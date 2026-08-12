import { Routes } from '@angular/router';
import { Home } from '@components/home/home';
import { About } from '@components/about/about';
import { Contact } from '@components/contact/contact';
import { ServicesComponent } from '@components/services-component/services-component';
import { Calculator } from '@components/calculator/calculator';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: Contact },
  { path: 'calculator', component: Calculator },

  // fallback
  { path: '**', redirectTo: '' },
];
