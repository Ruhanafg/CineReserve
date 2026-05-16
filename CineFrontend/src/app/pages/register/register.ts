import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html'
})
export class Register {

  user = {
    name: '',
    email: '',
    password: '',
    role: 'User'
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.authService.register(this.user).subscribe(() => {
      alert('Registration successful');
      this.router.navigate(['/']);
    });
  }
}