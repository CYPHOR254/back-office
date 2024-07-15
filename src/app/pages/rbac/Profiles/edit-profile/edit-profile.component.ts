import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from "ngx-toastr";
import {catchError, map, Observable, of, Subscription, throwError, TimeoutError} from "rxjs";
import { HttpServService } from 'src/app/shared/services/http-serv.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Input() title: any;
  @Input() formData: any;
  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;
  public imageFile?: File;

  isLoading?: boolean;
  subs: Subscription[] = [];
  profileId: any;

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
    
  });
    console.log(this.formData )

  }

  public submitData(): void {
      this.editProfile();
  
    this.loading = true;
  }

  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }



  private editProfile(): any {
    console.log("this.form");
    console.log(this.form);
    this.isLoading = true;

    let model = {
      id:this.formData.id,
      name:this.form.value.name,
      remarks:this.form.value.remarks
    }

    this.httpService.postReq('portal/api/v1/profiles/update', model).subscribe(
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

