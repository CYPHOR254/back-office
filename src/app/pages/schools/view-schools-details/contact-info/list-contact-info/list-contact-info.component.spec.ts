import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContactInfoComponent } from './list-contact-info.component';

describe('ListContactInfoComponent', () => {
  let component: ListContactInfoComponent;
  let fixture: ComponentFixture<ListContactInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListContactInfoComponent]
    });
    fixture = TestBed.createComponent(ListContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
