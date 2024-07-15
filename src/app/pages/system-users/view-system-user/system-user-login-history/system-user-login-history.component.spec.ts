import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUserLoginHistoryComponent } from './system-user-login-history.component';

describe('SystemUserLoginHistoryComponent', () => {
  let component: SystemUserLoginHistoryComponent;
  let fixture: ComponentFixture<SystemUserLoginHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemUserLoginHistoryComponent]
    });
    fixture = TestBed.createComponent(SystemUserLoginHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
