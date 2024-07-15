import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContactInfoComponent } from './view-contact-info.component';

describe('ViewContactInfoComponent', () => {
  let component: ViewContactInfoComponent;
  let fixture: ComponentFixture<ViewContactInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewContactInfoComponent]
    });
    fixture = TestBed.createComponent(ViewContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
