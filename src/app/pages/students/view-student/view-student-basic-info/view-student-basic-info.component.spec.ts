import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentBasicInfoComponent } from './view-student-basic-info.component';

describe('ViewStudentBasicInfoComponent', () => {
  let component: ViewStudentBasicInfoComponent;
  let fixture: ComponentFixture<ViewStudentBasicInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStudentBasicInfoComponent]
    });
    fixture = TestBed.createComponent(ViewStudentBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
