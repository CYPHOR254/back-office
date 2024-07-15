import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedSchoolsComponent } from './added-schools.component';

describe('AddedSchoolsComponent', () => {
  let component: AddedSchoolsComponent;
  let fixture: ComponentFixture<AddedSchoolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddedSchoolsComponent]
    });
    fixture = TestBed.createComponent(AddedSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
