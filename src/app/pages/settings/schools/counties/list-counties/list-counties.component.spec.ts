import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCountiesComponent } from './list-counties.component';

describe('ListCountiesComponent', () => {
  let component: ListCountiesComponent;
  let fixture: ComponentFixture<ListCountiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCountiesComponent]
    });
    fixture = TestBed.createComponent(ListCountiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
