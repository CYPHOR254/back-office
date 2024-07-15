import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchoolCurriculumComponent } from './edit-school-curriculum.component';

describe('EditSchoolCurriculumComponent', () => {
  let component: EditSchoolCurriculumComponent;
  let fixture: ComponentFixture<EditSchoolCurriculumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSchoolCurriculumComponent]
    });
    fixture = TestBed.createComponent(EditSchoolCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
