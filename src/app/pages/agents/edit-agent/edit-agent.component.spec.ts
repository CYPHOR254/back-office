import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAgentComponent } from './edit-agent.component';

describe('EditAgentComponent', () => {
  let component: EditAgentComponent;
  let fixture: ComponentFixture<EditAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAgentComponent]
    });
    fixture = TestBed.createComponent(EditAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
