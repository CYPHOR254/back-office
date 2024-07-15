import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpServService } from "../../services/http-serv.service";

@Component({
  selector: 'app-partner-action-dialog',
  templateUrl: './partner-action-dialog.component.html',
  styleUrls: ['./partner-action-dialog.component.scss']
})
export class PartnerActionDialogComponent implements OnInit {
  @Input() title: any;
  @Input() formData: any;
  @Input() action: any;
  @Input() buttonLabel: any;
  @Input() body: any;
  @Input() documentArray:any|undefined

  public form!: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private _httpService: HttpServService) {}

  ngOnInit() {
    console.log('this.formData', this.formData);

    this.form = this.fb.group({
      remarks: [
        this.formData ? this.formData.remarks : '',
        [Validators.required],
      ],

    });
  }

  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }

  approveService() {
    if (this.form.valid) {
      this.activeModal.close({ status: 'success', remarks: this.form.value.remarks, documentId:this.form.value.documentId });
    }
  }
}
