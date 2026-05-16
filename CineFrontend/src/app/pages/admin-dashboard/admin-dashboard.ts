import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html'
})
export class AdminDashboard implements OnInit {

  movies: any[] = [];

  movie = {
    title: '',
    duration: '',
    language: '',
    poster: ''   // keep if backend expects it
  };

  showtime = {
    movieId: 0,
    startTime: ''
  };

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.adminService.getMovies().subscribe({
      next: (res: any) => {
        this.movies = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // ✅ FIXED: use service instead of http
  addMovie() {
  this.adminService.addMovie(this.movie).subscribe({
    next: (res) => {
      console.log("SUCCESS:", res);
      alert("Movie added successfully");
    },
    error: (err) => {
      console.log("🔥 FULL ERROR:", err);
      console.log("🔥 ERROR BODY:", err.error);
      alert(err.error?.message || "Failed to add movie");
    }
  });
}

  addShowtime(movieId: number) {
    this.showtime.movieId = movieId;

    this.adminService.addShowtime(this.showtime)
      .subscribe({
        next: () => alert('Showtime added'),
        error: (err) => {
          console.log(err);
          alert('Failed to add showtime');
        }
      });
  }
}