import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchoolGenderComponent } from './edit-school-gender.component';

describe('EditSchoolGenderComponent', () => {
  let component: EditSchoolGenderComponent;
  let fixture: ComponentFixture<EditSchoolGenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSchoolGenderComponent]
    });
    fixture = TestBed.createComponent(EditSchoolGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
