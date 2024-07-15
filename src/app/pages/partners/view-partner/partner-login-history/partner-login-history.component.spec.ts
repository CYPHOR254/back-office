import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerLoginHistoryComponent } from './partner-login-history.component';

describe('PartnerLoginHistoryComponent', () => {
  let component: PartnerLoginHistoryComponent;
  let fixture: ComponentFixture<PartnerLoginHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerLoginHistoryComponent]
    });
    fixture = TestBed.createComponent(PartnerLoginHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
