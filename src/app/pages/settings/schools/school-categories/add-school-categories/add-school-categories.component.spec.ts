import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchoolCategoriesComponent } from './add-school-categories.component';

describe('AddSchoolCategoriesComponent', () => {
  let component: AddSchoolCategoriesComponent;
  let fixture: ComponentFixture<AddSchoolCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSchoolCategoriesComponent]
    });
    fixture = TestBed.createComponent(AddSchoolCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
