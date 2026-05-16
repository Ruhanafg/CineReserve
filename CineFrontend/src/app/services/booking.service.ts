import { Injectable }
    from '@angular/core';

import { HttpClient }
    from '@angular/common/http';

import { environment }
    from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class BookingService {

    apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    getBookedSeats(showtimeId: number) {
        return this.http.get(`${this.apiUrl}/booking/booked-seats/${showtimeId}`);
    }

    createBooking(data: any) {
        return this.http.post(`${this.apiUrl}/booking`, data);
    }

    getMyBookings() {
        return this.http.get(`${this.apiUrl}/booking/my-bookings`);
    }
}