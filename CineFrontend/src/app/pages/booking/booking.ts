import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,   // ⚠️ if you're using standalone
  imports: [CommonModule],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class Booking implements OnInit {

  rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  selectedSeats: any[] = [];
  bookedSeats: any[] = [];

  showtimeId: number = 1;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.loadBookedSeats();
  }

  loadBookedSeats() {
    this.bookingService.getBookedSeats(this.showtimeId)
      .subscribe((res: any) => {
        this.bookedSeats = res;
      });
  }

  isBooked(row: string, col: number) {
    return this.bookedSeats.some(
      s => s.rowNumber === row && s.seatNumber === col
    );
  }

  isSelected(row: string, col: number) {
    return this.selectedSeats.some(
      s => s.rowNumber === row && s.seatNumber === col
    );
  }

  toggleSeat(row: string, col: number) {

    if (this.isBooked(row, col)) return;

    const index = this.selectedSeats.findIndex(
      s => s.rowNumber === row && s.seatNumber === col
    );

    if (index > -1) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push({ rowNumber: row, seatNumber: col });
    }
  }

  confirmBooking() {
    const payload = {
      showtimeId: this.showtimeId,
      seats: this.selectedSeats
    };

    this.bookingService.createBooking(payload).subscribe({
      next: () => {
        alert('Booking Successful 🎉');
        this.selectedSeats = [];
        this.loadBookedSeats();
      },
      error: (err) => {
        console.log("🔥 FULL BOOKING ERROR:", err);
        console.log("🔥 ERROR BODY:", err.error);

        alert(err.error?.message || 'Booking failed');
      }
    });
  }
}