import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSystemAdminComponent } from './list-system-admin.component';

describe('ListSystemAdminComponent', () => {
  let component: ListSystemAdminComponent;
  let fixture: ComponentFixture<ListSystemAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSystemAdminComponent]
    });
    fixture = TestBed.createComponent(ListSystemAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
