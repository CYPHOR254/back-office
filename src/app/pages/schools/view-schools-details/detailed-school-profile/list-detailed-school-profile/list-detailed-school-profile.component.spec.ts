import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailedSchoolProfileComponent } from './list-detailed-school-profile.component';

describe('ListDetailedSchoolProfileComponent', () => {
  let component: ListDetailedSchoolProfileComponent;
  let fixture: ComponentFixture<ListDetailedSchoolProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDetailedSchoolProfileComponent]
    });
    fixture = TestBed.createComponent(ListDetailedSchoolProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
