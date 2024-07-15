import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpServService} from "../../services/http-serv.service";

@Component({
  selector: 'app-approve-reject-service',
  templateUrl: './customer-actions-modal.component.html',
  styleUrls: ['./customer-actions-modal.component.scss']
})
export class CustomerActionsModalComponent implements OnInit {
  @Input() title: any;
  @Input() formData: any;
  @Input() action: any;
  @Input() buttonLabel: any;
  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;
  public imageFile!: File;

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder, private _httpService: HttpServService) {
  }

  ngOnInit() {

    console.log('this.formData');
    console.log(this.formData);

    this.form = this.fb.group({
      remarks: ['', [Validators.required]],
    });

  }

  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }

  approveService() {
    this.activeModal.close({status: 'success', remark: this.form.value.remarks});
  }


  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.imageFile = event.target.files[0];
    }
  }


}
