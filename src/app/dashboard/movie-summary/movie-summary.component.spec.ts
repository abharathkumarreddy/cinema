import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MovieSummaryComponent } from './movie-summary.component';
import { MovieService } from '../services/movie.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('MovieSummaryComponent', () => {
  let component: MovieSummaryComponent;
  let fixture: ComponentFixture<MovieSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieSummaryComponent ],
      imports: [HttpClientTestingModule],
      providers:[MovieService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // SUBSCRIBING

  it('should subscribe on value is emmitted', () => {
    let movieService: MovieService = TestBed.get(MovieService);
    movieService.selectedMovie$.next(1);
    expect(component.movieId).toBe(1);
  })

});
