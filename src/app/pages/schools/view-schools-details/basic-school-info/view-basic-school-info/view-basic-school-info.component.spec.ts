import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBasicSchoolInfoComponent } from './view-basic-school-info.component';

describe('ViewBasicSchoolInfoComponent', () => {
  let component: ViewBasicSchoolInfoComponent;
  let fixture: ComponentFixture<ViewBasicSchoolInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBasicSchoolInfoComponent]
    });
    fixture = TestBed.createComponent(ViewBasicSchoolInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
