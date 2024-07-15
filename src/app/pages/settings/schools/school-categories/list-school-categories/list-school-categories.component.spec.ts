import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSchoolCategoriesComponent } from './list-school-categories.component';

describe('ListSchoolCategoriesComponent', () => {
  let component: ListSchoolCategoriesComponent;
  let fixture: ComponentFixture<ListSchoolCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSchoolCategoriesComponent]
    });
    fixture = TestBed.createComponent(ListSchoolCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
