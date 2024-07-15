import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDioceseComponent } from './list-diocese.component';

describe('ListDioceseComponent', () => {
  let component: ListDioceseComponent;
  let fixture: ComponentFixture<ListDioceseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDioceseComponent]
    });
    fixture = TestBed.createComponent(ListDioceseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
