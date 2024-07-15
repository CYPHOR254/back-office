import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIdentitiesComponent } from './list-identities.component';

describe('ListIdentitiesComponent', () => {
  let component: ListIdentitiesComponent;
  let fixture: ComponentFixture<ListIdentitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListIdentitiesComponent]
    });
    fixture = TestBed.createComponent(ListIdentitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
