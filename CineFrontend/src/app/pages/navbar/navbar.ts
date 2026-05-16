import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './navbar.html'
})
export class Navbar {

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isUser(): boolean {
    return this.getRole() === 'user';
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  logout() {
    localStorage.clear();
    window.location.href = '/';
  }
}