import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarService } from '@services/navbar-service';
import { ClickOutside } from '@shared/click-outside';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ClickOutside],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true,
})
export class Header {
  constructor(
    public navbar: NavbarService,
    private router: Router,
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.navbar.closeAll();
    });
  }
}
