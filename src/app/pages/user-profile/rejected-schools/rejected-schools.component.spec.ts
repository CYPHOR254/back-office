import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedSchoolsComponent } from './rejected-schools.component';

describe('RejectedSchoolsComponent', () => {
  let component: RejectedSchoolsComponent;
  let fixture: ComponentFixture<RejectedSchoolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectedSchoolsComponent]
    });
    fixture = TestBed.createComponent(RejectedSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
