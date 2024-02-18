import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  searchForm: FormGroup;

  pageCount: number = 0;
  moviesCount: number = 0;

  fromDate: string;
  toDate: string;

  movieIds: number[][] = [];
  movies:any[] = [];

  constructor(private fb: FormBuilder, private searchService: SearchService) {
    this.searchService.getfromExpress().subscribe((res) => {
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      dateRange: new FormControl(null, Validators.required),
    });

    this.searchForm.valueChanges.subscribe((response) => {
      this.fromDate = new Date(response.dateRange[0]).toISOString().slice(0, 10);
      this.toDate = new Date(response.dateRange[1]).toISOString().slice(0, 10);

      this.searchService.discoverMovies(this.fromDate, this.toDate).subscribe((response) => {
        this.pageCount = response.pageCount;
        this.moviesCount = response.moviesCount;
      });
    });

    this.getAllMoviesInfo();
    
  }

  getAllMoviesInfo() {
    this.clearValues();
    this.searchService.getmovieIds(this.pageCount,this.fromDate, this.toDate).subscribe((movieIds: number[]) => {
      this.splitMovieIdsIntoChunks(movieIds);
      this.getMoviesData();
    });
  }

  splitMovieIdsIntoChunks(movieIds: number[]) {
    const chunkSize = 100;
    for (let i = 0; i < movieIds.length; i += chunkSize) {
      const chunk = movieIds.slice(i, i + chunkSize);
      this.movieIds.push(chunk);
    }
  }

   async getMoviesData() {
    this.movieIds.forEach(async(movieIds) => {
      const moviesData = await this.searchService.getMovieDetails(movieIds);
      this.movies.push(moviesData);
      this.movies = this.movies.flat();
      console.log(this.movies);
    });
  }

  clearValues() {
    this.movieIds.length = 0;
    this.movies.length = 0;
  }



}
