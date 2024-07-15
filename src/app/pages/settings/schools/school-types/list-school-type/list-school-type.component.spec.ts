import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSchoolTypeComponent } from './list-school-type.component';

describe('ListSchoolTypeComponent', () => {
  let component: ListSchoolTypeComponent;
  let fixture: ComponentFixture<ListSchoolTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSchoolTypeComponent]
    });
    fixture = TestBed.createComponent(ListSchoolTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
