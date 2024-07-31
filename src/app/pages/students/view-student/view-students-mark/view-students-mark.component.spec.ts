import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentsMarkComponent } from './view-students-mark.component';

describe('ViewStudentsMarkComponent', () => {
  let component: ViewStudentsMarkComponent;
  let fixture: ComponentFixture<ViewStudentsMarkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStudentsMarkComponent]
    });
    fixture = TestBed.createComponent(ViewStudentsMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
