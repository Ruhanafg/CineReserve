import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html'
})
export class Login {

  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  login() {
    this.authService.login(this.loginData).subscribe({
      next: (res: any) => {

        this.authService.saveUser(res);

        alert("Login successful");

        if (res.role === 'Admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      }
    });
  }

}