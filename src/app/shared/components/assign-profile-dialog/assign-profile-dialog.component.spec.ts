import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProfileDialogComponent } from './assign-profile-dialog.component';

describe('AssignProfileDialogComponent', () => {
  let component: AssignProfileDialogComponent;
  let fixture: ComponentFixture<AssignProfileDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignProfileDialogComponent]
    });
    fixture = TestBed.createComponent(AssignProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
