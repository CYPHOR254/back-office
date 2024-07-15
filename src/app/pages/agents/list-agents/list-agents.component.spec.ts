import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListAgentsComponent } from './list-agents.component';


describe('ListAgentsComponent', () => {
  let component: ListAgentsComponent;
  let fixture: ComponentFixture<ListAgentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAgentsComponent]
    });
    fixture = TestBed.createComponent(ListAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
