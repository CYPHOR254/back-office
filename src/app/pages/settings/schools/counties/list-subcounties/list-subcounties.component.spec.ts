import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubcountiesComponent } from './list-subcounties.component';

describe('ListSubcountiesComponent', () => {
  let component: ListSubcountiesComponent;
  let fixture: ComponentFixture<ListSubcountiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSubcountiesComponent]
    });
    fixture = TestBed.createComponent(ListSubcountiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
