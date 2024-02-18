import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieSummary } from '../models/movie-summary.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-summary',
  templateUrl: './movie-summary.component.html',
  styleUrls: ['./movie-summary.component.scss']
})
export class MovieSummaryComponent implements OnInit, OnDestroy {

  // Properties
  movieId!:number;
  movieSummary!: MovieSummary;

  // Subscription
  selectedMovieSubscription!: Subscription;
  movieSummarySubscription!: Subscription;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    // Subscribing behaviour subject
    this.selectedMovieSubscription = this.movieService.selectedMovie$.subscribe(
       (movieId: number | null) => {
          if(movieId) {
            this.movieId = movieId;
            this.getMovieDetails();
          }
        }
    );
  }

  getMovieDetails(){
    // If movie id is not null
    if(this.movieId){
      this.movieSummarySubscription = this.movieService.getMovieDetails(this.movieId).subscribe(
        (movieSummary : MovieSummary ) => {
          this.movieSummary = movieSummary;
        }
      );
    }
  }

  ngOnDestroy(){
    if(this.selectedMovieSubscription){
      this.selectedMovieSubscription.unsubscribe();
    }
    if(this.movieSummarySubscription){
      this.movieSummarySubscription.unsubscribe();
    }
  }

}
