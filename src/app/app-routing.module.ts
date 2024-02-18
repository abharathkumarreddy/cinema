import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'search',
    pathMatch:'full',
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path: 'movie',
    component: MovieInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
