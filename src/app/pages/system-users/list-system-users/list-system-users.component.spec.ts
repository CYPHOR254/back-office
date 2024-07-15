import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSystemUsersComponent } from './list-system-users.component';

describe('ListSystemUsersComponent', () => {
  let component: ListSystemUsersComponent;
  let fixture: ComponentFixture<ListSystemUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSystemUsersComponent]
    });
    fixture = TestBed.createComponent(ListSystemUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
