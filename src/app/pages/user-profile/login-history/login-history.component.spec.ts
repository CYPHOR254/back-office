import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHistoryComponent } from './login-history.component';

describe('LoginHistoryComponent', () => {
  let component: LoginHistoryComponent;
  let fixture: ComponentFixture<LoginHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginHistoryComponent]
    });
    fixture = TestBed.createComponent(LoginHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
