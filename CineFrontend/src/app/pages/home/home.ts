import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {

  movies: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.http.get('http://localhost:5039/api/movie')
      .subscribe({
        next: (res: any) => {
          this.movies = res;
          console.log('MOVIES:', this.movies);
        },
        error: (err) => {
          console.log('ERROR:', err);
        }
      });
  }
}