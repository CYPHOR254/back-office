import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactDetailModalComponent } from './add-contact-detail-modal.component';

describe('AddAccountComponent', () => {
  let component: AddContactDetailModalComponent;
  let fixture: ComponentFixture<AddContactDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContactDetailModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContactDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
