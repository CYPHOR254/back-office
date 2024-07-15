import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUserSystemLogsComponent } from './system-user-system-logs.component';

describe('SystemUserSystemLogsComponent', () => {
  let component: SystemUserSystemLogsComponent;
  let fixture: ComponentFixture<SystemUserSystemLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemUserSystemLogsComponent]
    });
    fixture = TestBed.createComponent(SystemUserSystemLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
