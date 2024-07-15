import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubcountiesbycountyComponent } from './view-subcountiesbycounty.component';

describe('ViewSubcountiesbycountyComponent', () => {
  let component: ViewSubcountiesbycountyComponent;
  let fixture: ComponentFixture<ViewSubcountiesbycountyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSubcountiesbycountyComponent]
    });
    fixture = TestBed.createComponent(ViewSubcountiesbycountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
