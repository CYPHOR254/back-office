import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentCodeComponent } from './add-document-code.component';

describe('AddDocumentCodeComponent', () => {
  let component: AddDocumentCodeComponent;
  let fixture: ComponentFixture<AddDocumentCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDocumentCodeComponent]
    });
    fixture = TestBed.createComponent(AddDocumentCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
