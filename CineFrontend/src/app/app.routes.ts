import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { HomeComponent } from './pages/home/home';
import { Booking } from './pages/booking/booking';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { MyBookings } from './pages/my-bookings/my-bookings';


export const routes: Routes = [

  { path: '', component: Login },
  { path: 'register', component: Register },
  { path: 'login', component: Login },

  // USER ROUTES
  { path: 'home', component: HomeComponent },
  { path: 'booking', component: Booking },
  { path: 'my-bookings', component: MyBookings },

  // ADMIN ROUTES
  { path: 'admin-dashboard', component: AdminDashboard },
  // fallback
  { path: '**', redirectTo: '' }
];