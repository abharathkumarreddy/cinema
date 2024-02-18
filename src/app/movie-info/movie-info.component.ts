import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {

  constructor(private http: HttpClient){
  }

  ngOnInit() {

    // const requests = [this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=838ddf843808dba13fe6fbb7ccdc11fe&page=1'), this.http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=838ddf843808dba13fe6fbb7ccdc11fe&page=1'), this.http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=838ddf843808dba13fe6fbb7ccdc11fe&page=1')];

    // forkJoin(requests).subscribe(([resp, resp1, resp2]) => {
    //   console.log(resp);
    //   console.log(resp1);
    //   console.log(resp2);
    // });

    Promise.race(
        [
          this.getMoviesList('popular'),
          this.getMoviesList('top_rated')
        ]
    ).then(
        (results) => {
          return results;
        }
    ).then(
      (response) =>{
        console.log(response);
      }
    );

    // var ps = Promise.all([1, 2, 4,5]);

    // console.log('harinath');
    // console.log(ps);

    // console.log('bolonath');
    // console.log(results);
  }

  getMoviesList(criteria: string) {
    const promise = new Promise((resolve, reject) => {
        this.http.get(`https://api.themoviedb.org/3/movie/${criteria}?api_key=838ddf843808dba13fe6fbb7ccdc11fe&page=1`).subscribe(
          (response) => {
            resolve(response);
          },
          (error) =>{
            reject(error);
          }
        );
    });

    return promise;
  }

  getMoviesList_error(criteria: string) {
    const promise = new Promise((resolve, reject) => {
        this.http.get(`https://api.themoviedb.org/3/movie/${criteria}?api_key=838ddf843808dba13fe6fbb7ccdc1e&page=1`).subscribe(
          (response) => {
            resolve(response);
          },
          (error) =>{
            reject(error);
          }
        );
    });

    return promise;
  }

}
