import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MovieService } from '../services/movie.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnChanges, OnDestroy {

  // Properties
  moviesList: Movie[];
  selectedMovieId: number;
  moviesSubscription: Subscription;

  // Property Bindings
  @Input() selectedCriteria: string;

  constructor(private movieService: MovieService) { }

  ngOnChanges(){
    // on selected criteria change and if current value is not empty
    if(this.selectedCriteria) {
      this.getMoviesBasedOnSelectedCriteria();
    }
  }

  getMoviesBasedOnSelectedCriteria(){
    this.moviesSubscription = this.movieService.getMovies(this.selectedCriteria).subscribe(
      (listOfMovies: Movie[])=>{
        this.moviesList = listOfMovies;
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  onSelectingMovie(id:number){
    this.selectedMovieId = id;
    this.movieService.selectedMovie$.next(this.selectedMovieId);
  }

  ngOnDestroy(){
    if(this.moviesSubscription){
      this.moviesSubscription.unsubscribe();
    }
  }

}
