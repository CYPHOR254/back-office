import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSystemLogsComponent } from './agent-system-logs.component';

describe('AgentSystemLogsComponent', () => {
  let component: AgentSystemLogsComponent;
  let fixture: ComponentFixture<AgentSystemLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentSystemLogsComponent]
    });
    fixture = TestBed.createComponent(AgentSystemLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
