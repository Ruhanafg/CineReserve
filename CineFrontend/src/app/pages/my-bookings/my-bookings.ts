import { Component, OnInit }
  from '@angular/core';

import { CommonModule }
  from '@angular/common';

import { BookingService }
  from '../../services/booking.service';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css'
})

export class MyBookings implements OnInit {

  bookings: any[] = [];
  loading = false;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getMyBookings().subscribe({
      next: (res: any) => {
        this.bookings = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}