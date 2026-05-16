import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // 🔥 Get showtimes for a movie
  getShowtimes(movieId: number) {
    return this.http.get(
      `${this.apiUrl}/showtime/movie/${movieId}`
    );
  }

  // (Admin use later)
  addShowtime(data: any) {
    return this.http.post(
      `${this.apiUrl}/showtime`,
      data
    );
  }
}