import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPasswordsComponent } from './add-passwords.component';

describe('AddPasswordsComponent', () => {
  let component: AddPasswordsComponent;
  let fixture: ComponentFixture<AddPasswordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPasswordsComponent]
    });
    fixture = TestBed.createComponent(AddPasswordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
