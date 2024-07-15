import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSchoolDocumentsComponent } from './list-school-documents.component';

describe('ListSchoolDocumentsComponent', () => {
  let component: ListSchoolDocumentsComponent;
  let fixture: ComponentFixture<ListSchoolDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSchoolDocumentsComponent]
    });
    fixture = TestBed.createComponent(ListSchoolDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
