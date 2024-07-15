import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocumentTypesCategoriesComponent } from './list-document-types-categories.component';

describe('ListDocumentTypesCategoriesComponent', () => {
  let component: ListDocumentTypesCategoriesComponent;
  let fixture: ComponentFixture<ListDocumentTypesCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDocumentTypesCategoriesComponent]
    });
    fixture = TestBed.createComponent(ListDocumentTypesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
