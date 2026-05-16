import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './pages/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Navbar],
  templateUrl: './app.html'
})
export class AppComponent {

  showNavbar = true;

  constructor(private router: Router) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        const url = event.urlAfterRedirects;

        // ✅ hide navbar only on login page
        this.showNavbar = !url.startsWith('/login');
      }
    });
  }
}