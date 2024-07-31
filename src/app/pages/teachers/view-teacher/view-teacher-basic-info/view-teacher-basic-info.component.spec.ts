import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeacherBasicInfoComponent } from './view-teacher-basic-info.component';

describe('ViewTeacherBasicInfoComponent', () => {
  let component: ViewTeacherBasicInfoComponent;
  let fixture: ComponentFixture<ViewTeacherBasicInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTeacherBasicInfoComponent]
    });
    fixture = TestBed.createComponent(ViewTeacherBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
