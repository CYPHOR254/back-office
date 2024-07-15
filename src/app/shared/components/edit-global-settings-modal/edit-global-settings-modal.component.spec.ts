import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGlobalSettingsModalComponent } from './edit-global-settings-modal.component';

describe('AddAccountComponent', () => {
  let component: EditGlobalSettingsModalComponent;
  let fixture: ComponentFixture<EditGlobalSettingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGlobalSettingsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGlobalSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
