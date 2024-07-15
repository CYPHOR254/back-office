import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocumentCodesComponent } from './list-document-codes.component';

describe('ListDocumentCodesComponent', () => {
  let component: ListDocumentCodesComponent;
  let fixture: ComponentFixture<ListDocumentCodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDocumentCodesComponent]
    });
    fixture = TestBed.createComponent(ListDocumentCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
