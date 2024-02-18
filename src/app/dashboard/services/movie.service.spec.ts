import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('MovieService', () => {

  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
    });

    service = TestBed.get(MovieService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // we verify that there are not outstanding http calls.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getMovies() should return data', () => {

    // This is the actual response that we get from the server
    const actualResponse = { "page":1, "total_results":10000, "total_pages":500, "results":[
      {id: 123, title:'moviename_1', poster_path:'image.png'}]
    }

    // This is the modified emitted response
    const getMoviesResponse = [{id: 123, title:'moviename_1', poster:'image.png'},];

    // Api Call that we are using
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=838ddf843808dba13fe6fbb7ccdc11fe&page=1`;

    // calling service
    service.getMovies('popular').subscribe((response) => {
      expect(response).toEqual(getMoviesResponse);
    });

    // calling Api
    const req = httpMock.expectOne(url);

    expect(req.request.method).toBe('GET');

    // Emitting response
    req.flush(actualResponse);
  });

});
