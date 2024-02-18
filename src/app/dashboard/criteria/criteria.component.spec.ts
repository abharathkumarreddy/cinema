import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaComponent } from './criteria.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CriteriaPipe } from './pipes/criteria.pipe';

describe('CriteriaComponent', () => {
  let component: CriteriaComponent;
  let fixture: ComponentFixture<CriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaComponent, CriteriaPipe ],
      imports:[ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit criteria on selecting criteria', () => {
    let criteria: string;

    component.criteria.subscribe((value:string) => {
      criteria = value;
    });

    component.criteriaForm.get('criteria').setValue('some-value');

    expect(criteria).toBe('some-value');
  })


});
