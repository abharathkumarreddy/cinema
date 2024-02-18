import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedCriteria!:string;

  constructor() {}

  ngOnInit() {
  }

  onSelectingCriteria(event:string){
    this.selectedCriteria = event;
  }

}
