import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SytemUserAuditTrailComponent } from './sytem-user-audit-trail.component';

describe('SytemUserAuditTrailComponent', () => {
  let component: SytemUserAuditTrailComponent;
  let fixture: ComponentFixture<SytemUserAuditTrailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SytemUserAuditTrailComponent]
    });
    fixture = TestBed.createComponent(SytemUserAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
