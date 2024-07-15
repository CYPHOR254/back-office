import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDioceseByCountyComponent } from './view-diocese-by-county.component';

describe('ViewDioceseByCountyComponent', () => {
  let component: ViewDioceseByCountyComponent;
  let fixture: ComponentFixture<ViewDioceseByCountyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDioceseByCountyComponent]
    });
    fixture = TestBed.createComponent(ViewDioceseByCountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
