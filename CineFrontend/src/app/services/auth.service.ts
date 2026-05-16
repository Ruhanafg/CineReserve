import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  saveUser(res: any) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);
    localStorage.setItem('userId', res.userId);
    localStorage.setItem('name', res.name);
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isAdmin() {
  return this.getRole() === 'Admin';
}

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}