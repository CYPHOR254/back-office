import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedSchoolsComponent } from './submitted-schools.component';

describe('SubmittedSchoolsComponent', () => {
  let component: SubmittedSchoolsComponent;
  let fixture: ComponentFixture<SubmittedSchoolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmittedSchoolsComponent]
    });
    fixture = TestBed.createComponent(SubmittedSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
