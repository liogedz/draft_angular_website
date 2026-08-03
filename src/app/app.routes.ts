import {Routes} from '@angular/router';
import {HomeComponent} from '@components/home-component/home-component';
import {AboutComponent} from '@components/about-component/about-component';
import {ContactComponent} from '@components/contact-component/contact-component';
import {ServicesComponent} from '@components/services-component/services-component';
import {CalculatorComponent} from '@components/calculator-component/calculator-component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'calculator', component: CalculatorComponent},

  // fallback
  {path: '**', redirectTo: ''}
];
