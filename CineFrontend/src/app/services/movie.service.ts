import { Injectable }
    from '@angular/core';

import { HttpClient }
    from '@angular/common/http';

import { environment }
    from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class MovieService {

    apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    // API CALLS
    getMovies() {
        return this.http.get(`${this.apiUrl}/movie`);
    }

    addMovie(movie: any) {

        return this.http.post(
            `${this.apiUrl}/movie`,
            movie
        );
    }

    // STATE MANAGEMENT
    selectedMovie: any;
    selectedShowtime: any;

    setSelectedMovie(movie: any) {
        this.selectedMovie = movie;
    }

    getSelectedMovie() {
        return this.selectedMovie;
    }

    setSelectedShowtime(showtime: any) {
        this.selectedShowtime = showtime;
    }

    getSelectedShowtime() {
        return this.selectedShowtime;
    }
}