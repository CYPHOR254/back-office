import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInvoiceHeaderComponent } from './custom-invoice-header.component';

describe('CustomTblHeaderComponent', () => {
  let component: CustomInvoiceHeaderComponent;
  let fixture: ComponentFixture<CustomInvoiceHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomInvoiceHeaderComponent]
    });
    fixture = TestBed.createComponent(CustomInvoiceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
