import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ListingComponent } from './listing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieTileComponent } from '../movie-tile/movie-tile.component';
import { CriteriaPipe } from '../criteria/pipes/criteria.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { SimpleChange } from '@angular/core';

describe('ListingComponent', () => {
  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;
  let movieService: MovieService;
  let spy: any;

  // DUMMY RESPONSE
  const movies = [
    {id:1, title:'movie 1', poster:'image/png'},
    {id:2, title:'movie 2', poster:'image/png'}
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingComponent, MovieTileComponent],
      imports:[HttpClientTestingModule],
      providers:[MovieService]
    })

    fixture = TestBed.createComponent(ListingComponent);
    component = fixture.componentInstance;

     // creating listing serivce Instance
     movieService = TestBed.get(MovieService);

    // Providing Input
    component.selectedCriteria = 'popular';

    // spying on getMovies method of listing service
    spy = spyOn(movieService, 'getMovies').and.returnValue(from([movies]));

    component.ngOnChanges({
      selectedCriteria : new SimpleChange(null, component.selectedCriteria, null)
    });

    fixture.detectChanges();

  });

  it('should create', ()=>{
    expect(component).toBeTruthy();
  })


  it('should check that criteria is undefined if selectedCriteria is empty',()=> {
    expect(component.criteria).not.toBeUndefined();
  });

  // NG ONCHANGES

  it('should check that movieslist is not undefined on change of selectedCriteria', () => {

    // Service method is called
    expect(spy).toHaveBeenCalled();

    // Movies list should have values
    expect(component.moviesList).toBeDefined();
    expect(component.moviesList.length).toBeGreaterThanOrEqual(1);
  });


  // CLICK EVENT BINDING

  it('should check that moviesId is set on click of movie-tile', () => {
    let movieTileEl = fixture.debugElement.query(By.css('.app-movie-tile'));
    movieTileEl.triggerEventHandler('click', null);
    expect(component.selectedMovieId).toBe(1);
  });

  // CLASS BINDING

  it('should check that selected movie tile has class active', () => {
    let movieTileEl = fixture.debugElement.query(By.css('.app-movie-tile'));
    movieTileEl.triggerEventHandler('click', null);

    // Important
    fixture.detectChanges();

    expect(movieTileEl.classes['active']).toBeTruthy();
  });



});
