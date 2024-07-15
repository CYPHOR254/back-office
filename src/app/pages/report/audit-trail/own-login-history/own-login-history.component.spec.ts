import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnLoginHistoryComponent } from './own-login-history.component';

describe('OwnLoginHistoryComponent', () => {
  let component: OwnLoginHistoryComponent;
  let fixture: ComponentFixture<OwnLoginHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnLoginHistoryComponent]
    });
    fixture = TestBed.createComponent(OwnLoginHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
