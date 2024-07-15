import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFinancialDocumentsComponent } from './list-financial-documents.component';

describe('ListFinancialDocumentsComponent', () => {
  let component: ListFinancialDocumentsComponent;
  let fixture: ComponentFixture<ListFinancialDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFinancialDocumentsComponent]
    });
    fixture = TestBed.createComponent(ListFinancialDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
