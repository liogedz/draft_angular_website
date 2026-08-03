import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {

  isMobileMenuOpen = signal(false);
  isServicesOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);

  }

  toggleServices() {
    this.isServicesOpen.update(v => !v);
  }

  closeAll() {
    this.isMobileMenuOpen.set(false);
    this.isServicesOpen.set(false);
  }
}
