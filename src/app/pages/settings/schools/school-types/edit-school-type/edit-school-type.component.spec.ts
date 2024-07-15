import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchoolTypeComponent } from './edit-school-type.component';

describe('EditSchoolTypeComponent', () => {
  let component: EditSchoolTypeComponent;
  let fixture: ComponentFixture<EditSchoolTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSchoolTypeComponent]
    });
    fixture = TestBed.createComponent(EditSchoolTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
