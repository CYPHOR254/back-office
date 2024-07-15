import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchoolGenderComponent } from './add-school-gender.component';

describe('AddSchoolGenderComponent', () => {
  let component: AddSchoolGenderComponent;
  let fixture: ComponentFixture<AddSchoolGenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSchoolGenderComponent]
    });
    fixture = TestBed.createComponent(AddSchoolGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
