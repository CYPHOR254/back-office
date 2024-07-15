import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedSystemUsersComponent } from './blocked-system-users.component';

describe('BlockedSystemUsersComponent', () => {
  let component: BlockedSystemUsersComponent;
  let fixture: ComponentFixture<BlockedSystemUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockedSystemUsersComponent]
    });
    fixture = TestBed.createComponent(BlockedSystemUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
