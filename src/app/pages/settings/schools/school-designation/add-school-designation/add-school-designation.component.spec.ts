import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchoolDesignationComponent } from './add-school-designation.component';

describe('AddSchoolDesignationComponent', () => {
  let component: AddSchoolDesignationComponent;
  let fixture: ComponentFixture<AddSchoolDesignationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSchoolDesignationComponent]
    });
    fixture = TestBed.createComponent(AddSchoolDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
