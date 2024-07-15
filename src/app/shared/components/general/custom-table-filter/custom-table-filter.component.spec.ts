import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableFilterComponent } from './custom-table-filter.component';

describe('CustomTableFilterComponent', () => {
  let component: CustomTableFilterComponent;
  let fixture: ComponentFixture<CustomTableFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTableFilterComponent]
    });
    fixture = TestBed.createComponent(CustomTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
