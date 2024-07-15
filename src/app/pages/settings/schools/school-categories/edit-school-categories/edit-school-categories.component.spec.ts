import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchoolCategoriesComponent } from './edit-school-categories.component';

describe('EditSchoolCategoriesComponent', () => {
  let component: EditSchoolCategoriesComponent;
  let fixture: ComponentFixture<EditSchoolCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSchoolCategoriesComponent]
    });
    fixture = TestBed.createComponent(EditSchoolCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
