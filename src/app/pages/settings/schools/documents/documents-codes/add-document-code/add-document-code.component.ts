import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import { HttpServService } from 'src/app/shared/services/http-serv.service';

@Component({
  selector: 'app-add-document-code',
  templateUrl: './add-document-code.component.html',
  styleUrls: ['./add-document-code.component.scss']
})
export class AddDocumentCodeComponent implements OnInit {

  @Input() formData: any;
  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;
  public addDocumentsCode$!:Subscription
  isLoading!: boolean;
  title: string = "Add Document Code";
  public dropdownOptions = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];
  constructor(
      public activeModal: NgbActiveModal,
      public fb: FormBuilder,
      public toastr: ToastrService,
      private _httpService: HttpServService) {
  }
  ngOnInit() {
    console.log("this.formData");
    console.log(this);
    this.form = this.fb.group({
      name: [this.formData ? this.formData.name : '', [Validators.required]],
      remarks: [this.formData ? this.formData.remarks : '', [Validators.required]],
      recordsRequired: [this.formData ? this.formData.recordsRequired : '', [Validators.required]],
      required: [this.formData ? this.formData.required : null, [Validators.required]],

    });
    console.log(this.formData )
  }
  public submitData(): void {
      if (this.formData) {
          this.saveChanges();
      } 
      else {
          this.createRecord();
      }
      this.loading = true;
  }
  public closeModal(): void {
      this.activeModal.dismiss('Cross click');
  }
  private createRecord(): any {
    this.isLoading = true;
      let  model= {
          name:this.form.value.name,
          recordsRequired:this.form.value.recordsRequired,  
          remarks:this.form.value.remarks,    
          required:this.form.value.required
  
      }
      console.log(model);
      
      this.addDocumentsCode$ = this._httpService.postReq("portal/api/v1/documents/menu-codes/save",model).subscribe(
          (result: any) => {
              if (result.status === 0) {
                this.isLoading = false;
                this.activeModal.close('success');
                this.toastr.success(result?.message, "Success");
              } 
              else {
                this.activeModal.close('error');
                this.toastr.error(result?.message, "Error");
              }
            }
        );
  }

  private saveChanges(): any {
    this.isLoading = true;
    const model={
    id: this.formData.id,
    name:this.form.value.name,
    remarks:this.form.value.remarks,
    recordsRequired:this.form.value.recordsRequired,      
    required:this.form.value.required
  }

   this._httpService.postReq('portal/api/v1/documents/menu-codes/update',model)
   .subscribe(
      (result:any) =>{
          if (result.status==0){
            this.isLoading = false;
              this.activeModal.close('success')
            this.toastr.success(result?.message, "Success");
          }
          else{
              this.activeModal.close('error')
              this.toastr.error(result?.message, "Error");

          }
      }
   )
  }


}
