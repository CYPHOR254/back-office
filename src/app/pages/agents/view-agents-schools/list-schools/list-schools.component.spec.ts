import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSchoolsComponent } from './list-schools.component';

describe('ListSchoolsComponent', () => {
  let component: ListSchoolsComponent;
  let fixture: ComponentFixture<ListSchoolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSchoolsComponent]
    });
    fixture = TestBed.createComponent(ListSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
