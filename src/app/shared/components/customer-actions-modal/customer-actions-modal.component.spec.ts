import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerActionsModalComponent } from './customer-actions-modal.component';

describe('AddAccountComponent', () => {
  let component: CustomerActionsModalComponent;
  let fixture: ComponentFixture<CustomerActionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerActionsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerActionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
