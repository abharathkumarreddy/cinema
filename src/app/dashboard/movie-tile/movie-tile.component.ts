import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-tile',
  templateUrl: './movie-tile.component.html',
  styleUrls: ['./movie-tile.component.scss']
})
export class MovieTileComponent implements OnInit {

  // Properties
  movieId!: number;
  movieTitle!: string;
  moviePoster!: string;

  // Property Bindings
  @Input() movieDetails!: Movie;

  constructor() {}

  ngOnInit() {
    this.movieId = this.movieDetails.id;
    this.movieTitle = this.movieDetails.title;
    this.moviePoster = this.getPosterPath(this.movieDetails.poster);
  }

  getPosterPath(poster: string): string{
    return 'https://image.tmdb.org/t/p/w500/' + poster;
  }

}
