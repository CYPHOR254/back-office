import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCategoriesComponent } from './school-categories.component';

describe('SchoolCategoriesComponent', () => {
  let component: SchoolCategoriesComponent;
  let fixture: ComponentFixture<SchoolCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolCategoriesComponent]
    });
    fixture = TestBed.createComponent(SchoolCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
