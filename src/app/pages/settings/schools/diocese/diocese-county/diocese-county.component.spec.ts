import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DioceseCountyComponent } from './diocese-county.component';

describe('DioceseCountyComponent', () => {
  let component: DioceseCountyComponent;
  let fixture: ComponentFixture<DioceseCountyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DioceseCountyComponent]
    });
    fixture = TestBed.createComponent(DioceseCountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
