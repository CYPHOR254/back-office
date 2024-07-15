import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSchoolCurriculumComponent } from './list-school-curriculum.component';

describe('ListSchoolCurriculumComponent', () => {
  let component: ListSchoolCurriculumComponent;
  let fixture: ComponentFixture<ListSchoolCurriculumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSchoolCurriculumComponent]
    });
    fixture = TestBed.createComponent(ListSchoolCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
