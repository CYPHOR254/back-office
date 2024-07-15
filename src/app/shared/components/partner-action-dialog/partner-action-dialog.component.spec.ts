import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerActionDialogComponent } from './partner-action-dialog.component';

describe('PartnerActionDialogComponent', () => {
  let component: PartnerActionDialogComponent;
  let fixture: ComponentFixture<PartnerActionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerActionDialogComponent]
    });
    fixture = TestBed.createComponent(PartnerActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
