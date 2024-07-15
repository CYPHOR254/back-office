import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCurriculumsComponent } from './school-curriculums.component';

describe('SchoolCurriculumsComponent', () => {
  let component: SchoolCurriculumsComponent;
  let fixture: ComponentFixture<SchoolCurriculumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolCurriculumsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolCurriculumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
