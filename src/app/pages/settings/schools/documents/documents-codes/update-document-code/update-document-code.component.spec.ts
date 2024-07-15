import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDocumentCodeComponent } from './update-document-code.component';

describe('UpdateDocumentCodeComponent', () => {
  let component: UpdateDocumentCodeComponent;
  let fixture: ComponentFixture<UpdateDocumentCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDocumentCodeComponent]
    });
    fixture = TestBed.createComponent(UpdateDocumentCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
