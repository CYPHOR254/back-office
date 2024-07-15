import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocumentTypesCategoriesComponent } from './edit-document-types-categories.component';

describe('EditDocumentTypesCategoriesComponent', () => {
  let component: EditDocumentTypesCategoriesComponent;
  let fixture: ComponentFixture<EditDocumentTypesCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDocumentTypesCategoriesComponent]
    });
    fixture = TestBed.createComponent(EditDocumentTypesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
