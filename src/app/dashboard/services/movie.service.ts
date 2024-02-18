import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  // Behaviour Subject
  selectedMovie$: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(null);

  constructor(private http: HttpClient) {}

  getMovies(criteria: string) {
    const url = `https://api.themoviedb.org/3/movie/${criteria}?api_key=838ddf843808dba13fe6fbb7ccdc11fe&page=1`;
    return this.http
      .get(url)
      .pipe(
        map((value: any) =>
          value["results"].map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path,
          }))
        )
      );
  }

  getMovieDetails(movieId: number) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=838ddf843808dba13fe6fbb7ccdc11fe&page=1`;
    return this.http
      .get(url)
      .pipe(
        map((value: any) => ({
          title: value["title"],
          overview: value["overview"],
          genres: value["genres"],
        }))
      );
  }
}
