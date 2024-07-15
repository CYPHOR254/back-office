import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPasswordsComponent } from './list-passwords.component';

describe('ListPasswordsComponent', () => {
  let component: ListPasswordsComponent;
  let fixture: ComponentFixture<ListPasswordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPasswordsComponent]
    });
    fixture = TestBed.createComponent(ListPasswordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
