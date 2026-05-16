import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ShowtimeService } from '../../services/showtime.service';

import { MovieService } from '../../services/movie.service';

import { Router }
from '@angular/router';

@Component({
  selector: 'app-showtimes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showtimes.html',
  styleUrl: './showtimes.css'
})

export class Showtimes implements OnInit {

  showtimes: any[] = [];

  movie: any;

  constructor(
    private showtimeService: ShowtimeService,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit() {

    this.movie = this.movieService.getSelectedMovie();

    if (!this.movie) {
      this.router.navigate(['/']);
      return;
    }

    this.loadShowtimes();
  }

  loadShowtimes() {

    this.showtimeService
      .getShowtimes(this.movie.id)
      .subscribe({

        next: (data: any) => {
          this.showtimes = data;
        },

        error: (err) => {
          console.log(err);
        }
      });
  }

  selectShowtime(showtime: any) {

    this.movieService.setSelectedShowtime(showtime);

    this.router.navigate(['/booking']);
  }
}