import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAddedComponent } from './school-added.component';

describe('SchoolAddedComponent', () => {
  let component: SchoolAddedComponent;
  let fixture: ComponentFixture<SchoolAddedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolAddedComponent]
    });
    fixture = TestBed.createComponent(SchoolAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
