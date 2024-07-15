import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarificationSchoolsComponent } from './clarification-schools.component';

describe('ClarificationSchoolsComponent', () => {
  let component: ClarificationSchoolsComponent;
  let fixture: ComponentFixture<ClarificationSchoolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClarificationSchoolsComponent]
    });
    fixture = TestBed.createComponent(ClarificationSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
