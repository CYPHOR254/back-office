import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSystemAdminComponent } from './edit-system-admin.component';

describe('EditSystemAdminComponent', () => {
  let component: EditSystemAdminComponent;
  let fixture: ComponentFixture<EditSystemAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSystemAdminComponent]
    });
    fixture = TestBed.createComponent(EditSystemAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
