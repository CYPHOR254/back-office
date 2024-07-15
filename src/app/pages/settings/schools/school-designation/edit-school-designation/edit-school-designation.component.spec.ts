import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchoolDesignationComponent } from './edit-school-designation.component';

describe('EditSchoolDesignationComponent', () => {
  let component: EditSchoolDesignationComponent;
  let fixture: ComponentFixture<EditSchoolDesignationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSchoolDesignationComponent]
    });
    fixture = TestBed.createComponent(EditSchoolDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
