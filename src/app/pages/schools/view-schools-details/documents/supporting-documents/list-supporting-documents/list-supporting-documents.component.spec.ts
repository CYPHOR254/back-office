import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSupportingDocumentsComponent } from './list-supporting-documents.component';

describe('ListSupportingDocumentsComponent', () => {
  let component: ListSupportingDocumentsComponent;
  let fixture: ComponentFixture<ListSupportingDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSupportingDocumentsComponent]
    });
    fixture = TestBed.createComponent(ListSupportingDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
