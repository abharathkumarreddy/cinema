import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { DiscoverMoviesResponse } from './Model/discover-movie-response.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  baseSearchUrl = "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&api_key=838ddf843808dba13fe6fbb7ccdc11fe";

  constructor(private http: HttpClient) {}

  discoverMovies(fromDate: string, toDate: string, region: string, genre: string) {
    let url = `${this.baseSearchUrl}&page=1&primary_release_date.gte=${fromDate}&primary_release_date.lte=${toDate}`;
    if(region) {
      url = `${url}&with_original_language=${region}`;
    }

    if(genre) {
      url = `${url}&&with_genres=${genre}`;
    }

    return this.http.get<DiscoverMoviesResponse>(url).pipe(
      map((response: DiscoverMoviesResponse) => ({pageCount: response.total_pages, moviesCount: response.total_results})),
    );
  }
  
  getmovieIds(totalPages: number, fromDate: string, toDate: string) {
    return forkJoin(this.generateMoviePageRequests(totalPages,fromDate,toDate)).pipe(
      map((response: DiscoverMoviesResponse[]) => response.map((page:DiscoverMoviesResponse) => page.results.map((movie: any) => movie.id))),
      map(allMovieIds => allMovieIds.flat())
    )
  }
  
  generateMoviePageRequests(totalPages: number, fromDate: string, toDate: string) {
    const pageRequests = [];
    for (let i = 1; i <= totalPages; i++) {
      pageRequests.push(this.http.get<DiscoverMoviesResponse>(`${this.baseSearchUrl}&page=${i}&primary_release_date.gte=${fromDate}&primary_release_date.lte=${toDate}`))
    }
    return pageRequests;
  }

  getMovieDetails(movieIds: number[]) {
    return forkJoin(this.generateMovieinfoRequests(movieIds)).toPromise();
  }
  
  generateMovieinfoRequests(movieIds: number[]) {
    const movieInfoRequests: Observable<any>[] = [];

    movieIds.forEach((movieId: number) => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=838ddf843808dba13fe6fbb7ccdc11fe&page=1`;
      movieInfoRequests.push(this.http.get<any>(url));
    });
   
    return movieInfoRequests;
  }

}
