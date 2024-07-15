import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchoolTypeComponent } from './add-school-type.component';

describe('AddSchoolTypeComponent', () => {
  let component: AddSchoolTypeComponent;
  let fixture: ComponentFixture<AddSchoolTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSchoolTypeComponent]
    });
    fixture = TestBed.createComponent(AddSchoolTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
