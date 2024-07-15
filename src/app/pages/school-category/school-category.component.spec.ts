import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCategoryComponent } from './school-category.component';

describe('SchoolCategoryComponent', () => {
  let component: SchoolCategoryComponent;
  let fixture: ComponentFixture<SchoolCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
