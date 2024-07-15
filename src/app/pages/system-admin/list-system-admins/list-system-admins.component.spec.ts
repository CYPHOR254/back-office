import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSystemAdminsComponent } from './list-system-admins.component';

describe('ListSystemAdminsComponent', () => {
  let component: ListSystemAdminsComponent;
  let fixture: ComponentFixture<ListSystemAdminsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSystemAdminsComponent]
    });
    fixture = TestBed.createComponent(ListSystemAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
