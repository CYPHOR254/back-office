import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSystemUserComponent } from './edit-system-user.component';

describe('EditSystemUserComponent', () => {
  let component: EditSystemUserComponent;
  let fixture: ComponentFixture<EditSystemUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSystemUserComponent]
    });
    fixture = TestBed.createComponent(EditSystemUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
