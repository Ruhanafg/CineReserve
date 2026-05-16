import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdminService {

  apiUrl = 'http://localhost:5039/api/movie';

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get(this.apiUrl);
  }

  addMovie(movie: any) {
    return this.http.post(this.apiUrl, movie);
  }

  deleteMovie(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
  addShowtime(showtime: any) {
  return this.http.post('http://localhost:5039/api/showtime', showtime);
}
}