import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-success.html',
  styleUrl: './booking-success.css'
})
export class BookingSuccess {

  bookingReference: string = '';
  totalAmount: number = 0;

  constructor(private router: Router) {

    const state = this.router.getCurrentNavigation()?.extras.state as any;

    if (state) {
      this.bookingReference = state.bookingReference;
      this.totalAmount = state.totalAmount;
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }

  viewBookings() {
    this.router.navigate(['/my-bookings']);
  }
}