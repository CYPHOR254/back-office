import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSchoolDesignationComponent } from './list-school-designation.component';

describe('ListSchoolDesignationComponent', () => {
  let component: ListSchoolDesignationComponent;
  let fixture: ComponentFixture<ListSchoolDesignationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSchoolDesignationComponent]
    });
    fixture = TestBed.createComponent(ListSchoolDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
