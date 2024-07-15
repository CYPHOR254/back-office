import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentTypesCategoriesComponent } from './add-document-types-categories.component';

describe('AddDocumentTypesCategoriesComponent', () => {
  let component: AddDocumentTypesCategoriesComponent;
  let fixture: ComponentFixture<AddDocumentTypesCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDocumentTypesCategoriesComponent]
    });
    fixture = TestBed.createComponent(AddDocumentTypesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
