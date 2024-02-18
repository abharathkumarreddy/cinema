import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MovieTileComponent } from './movie-tile.component';

describe('MovieTileComponent', () => {
  let component: MovieTileComponent;
  let fixture: ComponentFixture<MovieTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieTileComponent ]
    })

    fixture = TestBed.createComponent(MovieTileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if @input values are properly Binding',() => {
    // Giving value to @input Property
    component.movieDetails = {id:12345, title:'Bharath', poster:'imagePath'};

    // Render the component
    fixture.detectChanges();

    expect(component.movieId).toBe(12345);
    expect(component.movieTitle).toBe('Bharath');
  })

  it('should check if getPosterPath function is returning value',() => {
    let posterPath = 'bharath.jpg';
    posterPath = component.getPosterPath(posterPath);

    expect(posterPath).toBe('https://image.tmdb.org/t/p/w500/bharath.jpg');
  })

  it('should check if img src is properly binding',() => {
    // Giving value to @input Property
    component.movieDetails = {id:12123, title:'Bharath', poster:'image.png'};

    // Render Component
    fixture.detectChanges();

    // Getting access to image Element
    const el = fixture.debugElement.query(By.css('.movie-poster'));
    const imgEl: HTMLElement = el.nativeElement;

    expect(imgEl.getAttribute('src')).toBe('https://image.tmdb.org/t/p/w500/image.png');
  })

});
