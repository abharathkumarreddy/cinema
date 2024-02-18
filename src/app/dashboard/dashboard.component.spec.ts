import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { ListingComponent } from './listing/listing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieTileComponent } from './movie-tile/movie-tile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CriteriaPipe } from './criteria/pipes/criteria.pipe';
import { CriteriaComponent } from './criteria/criteria.component';
import { MovieSummaryComponent } from './movie-summary/movie-summary.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, ListingComponent, MovieTileComponent, CriteriaComponent, MovieSummaryComponent, CriteriaPipe ],
      imports:[ HttpClientTestingModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
