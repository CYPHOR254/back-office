import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'edit-global-settings-modal',
  templateUrl: './add-contact-detail-modal.component.html',
  styleUrls: ['./add-contact-detail-modal.component.scss']
})
export class AddContactDetailModalComponent implements OnInit {
  @Input() formData: any;
  public form!: FormGroup;
  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder) {
  }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      title: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });

  }

  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }

  addContactPerson() {
    this.activeModal.close(this.form.value);
  }
}
