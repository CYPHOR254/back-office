import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from "ngx-toastr";
import { Subscription} from "rxjs";
import { HttpServService } from 'src/app/shared/services/http-serv.service';

@Component({
  selector: 'app-update-document-code',
  templateUrl: './update-document-code.component.html',
  styleUrls: ['./update-document-code.component.scss']
})
export class UpdateDocumentCodeComponent implements OnInit {
  @Input() formData: any;
  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;
  title: string = "Edit Document Code";
  isLoading?: boolean;
  subs: Subscription[] = [];
  profileId: any;
  public dropdownOptions = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];
  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    public toastr: ToastrService,
    public httpService: HttpServService,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.formData ? this.formData.name : '', [Validators.required]],
      remarks: [this.formData ? this.formData.remarks : '', [Validators.required]],
      recordsRequired: [this.formData ? this.formData.recordsRequired : '', [Validators.required]],
      required: [this.formData ? this.formData.required : null, [Validators.required]],
      

    });
    console.log(this.formData )

  }

  public submitData(): void {
    this.loading = true;
    if (this.form.invalid) {
        this.form.markAllAsTouched(); 
        this.loading = false;
        return;
    }

    if (this.formData) {
      this.editDocumentCode();
    } else {
      this.createDocumentCodeInitial();
    }

  }

  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }

  private createDocumentCodeInitial(): any {
    this.loading = false;

    let model = {
    name: this.form.value.firstName,
    remarks:this.form.value.remarks,
    recordsRequired:this.form.value.recordsRequired,
    required:this.form.value.required
    }

    this.httpService.postReq('portal/api/v1/documents/menu-codes/save', model).subscribe(
      (result: any) => {
        if (result.status === 0) {
          this.isLoading = false;
          this.activeModal.close('success');
          this.toastr.success(result?.message, 'Success');
          console.log(result);
        } else {
          this.activeModal.close('error');
          this.toastr.error(result?.message, 'Error');
        }
      }
    );
  }

  private editDocumentCode(): any {
    console.log("this.form");
    console.log(this.form);

    this.isLoading = true;
    const model = {
      id: this.formData.id, 
      name: this.form.value.name,
      remarks:this.form.value.remarks,
      recordsRequired:this.form.value.recordsRequired,
      required:this.form.value.required


    };

    this.httpService.postReq('portal/api/v1/documents/menu-codes/update', model).subscribe(
      (result: any) => {
        if (result.status === 0) {
          this.isLoading = false;
          this.activeModal.close('success');
          this.toastr.success(result?.message, 'Success');
          console.log(result);
        } else {
          this.activeModal.close('error');
          this.toastr.error(result?.message, 'Error');
        }
      }
    );
  }

}

