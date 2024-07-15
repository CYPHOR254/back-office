import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSystemUserComponent } from './view-system-user.component';

describe('ViewSystemUserComponent', () => {
  let component: ViewSystemUserComponent;
  let fixture: ComponentFixture<ViewSystemUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSystemUserComponent]
    });
    fixture = TestBed.createComponent(ViewSystemUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
