import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchoolCurriculumComponent } from './add-school-curriculum.component';

describe('AddSchoolCurriculumComponent', () => {
  let component: AddSchoolCurriculumComponent;
  let fixture: ComponentFixture<AddSchoolCurriculumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSchoolCurriculumComponent]
    });
    fixture = TestBed.createComponent(AddSchoolCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
