import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLoginHistoryComponent } from './agent-login-history.component';

describe('AgentLoginHistoryComponent', () => {
  let component: AgentLoginHistoryComponent;
  let fixture: ComponentFixture<AgentLoginHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentLoginHistoryComponent]
    });
    fixture = TestBed.createComponent(AgentLoginHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
