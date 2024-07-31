import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeacherComponent } from './view-teacher.component';

describe('ViewTeacherComponent', () => {
  let component: ViewTeacherComponent;
  let fixture: ComponentFixture<ViewTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTeacherComponent]
    });
    fixture = TestBed.createComponent(ViewTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
