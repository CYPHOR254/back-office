import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSchoolsDetailsComponent } from './view-schools-details.component';

describe('ViewSchoolsDetailsComponent', () => {
  let component: ViewSchoolsDetailsComponent;
  let fixture: ComponentFixture<ViewSchoolsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSchoolsDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewSchoolsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
