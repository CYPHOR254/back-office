import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPasswordToggleComponent } from './show-password-toggle.component';

describe('ShowPasswordToggleComponent', () => {
  let component: ShowPasswordToggleComponent;
  let fixture: ComponentFixture<ShowPasswordToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowPasswordToggleComponent]
    });
    fixture = TestBed.createComponent(ShowPasswordToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
