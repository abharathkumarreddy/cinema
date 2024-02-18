import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListingComponent } from './dashboard/listing/listing.component';
import { MovieTileComponent } from './dashboard/movie-tile/movie-tile.component';
import { CriteriaPipe } from './dashboard/criteria/pipes/criteria.pipe';
import { CriteriaComponent } from './dashboard/criteria/criteria.component';
import { MovieSummaryComponent } from './dashboard/movie-summary/movie-summary.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListingComponent,
    MovieTileComponent,
    CriteriaPipe,
    CriteriaComponent,
    MovieSummaryComponent,
    MovieInfoComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
