import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLoginHistoryComponent } from './all-login-history.component';

describe('AllLoginHistoryComponent', () => {
  let component: AllLoginHistoryComponent;
  let fixture: ComponentFixture<AllLoginHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllLoginHistoryComponent]
    });
    fixture = TestBed.createComponent(AllLoginHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
