import { Routes } from '@angular/router';
import { Home } from '@components/home/home';
import { About } from '@components/about/about';
import { Contact } from '@components/contact/contact';
import { ServicesComponent } from '@components/services-component/services-component';
import { Calculator } from '@components/calculator/calculator';
import { Gallery } from '@components/gallery/gallery';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'calculator', component: Calculator },
  { path: 'contact', component: Contact },
  { path: 'gallery', component: Gallery },
  { path: 'services', component: ServicesComponent },

  // fallback
  { path: '**', redirectTo: '' },
];
