import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerSystemLogsComponent } from './partner-system-logs.component';

describe('PartnerSystemLogsComponent', () => {
  let component: PartnerSystemLogsComponent;
  let fixture: ComponentFixture<PartnerSystemLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerSystemLogsComponent]
    });
    fixture = TestBed.createComponent(PartnerSystemLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
