import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSchoolGenderComponent } from './list-school-gender.component';

describe('ListSchoolGenderComponent', () => {
  let component: ListSchoolGenderComponent;
  let fixture: ComponentFixture<ListSchoolGenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSchoolGenderComponent]
    });
    fixture = TestBed.createComponent(ListSchoolGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
