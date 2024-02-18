import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {

  // Properties
  criterias: string[] = ['upcoming','popular','top_rated'];
  criteriaForm: FormGroup = new FormGroup({
    criteria: new FormControl()
  });

  // Event Emitter
  @Output() criteria = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    // On valueChange of criteria
    this.criteriaForm.get('criteria')?.valueChanges.subscribe((criteria) => {
      this.criteria.emit(criteria);
    });

    // By defualt loading upcoming
    this.criteriaForm.get('criteria')?.setValue('upcoming');
  }

}
