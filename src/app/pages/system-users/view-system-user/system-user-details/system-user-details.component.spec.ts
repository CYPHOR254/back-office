import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUserDetailsComponent } from './system-user-details.component';

describe('SystemUserDetailsComponent', () => {
  let component: SystemUserDetailsComponent;
  let fixture: ComponentFixture<SystemUserDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemUserDetailsComponent]
    });
    fixture = TestBed.createComponent(SystemUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
