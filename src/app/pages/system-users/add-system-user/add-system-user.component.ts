import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpServService } from 'src/app/shared/services/http-serv.service';

@Component({
  selector: 'app-add-system-user',
  templateUrl: './add-system-user.component.html',
  styleUrls: ['./add-system-user.component.scss']
})
export class AddSystemUserComponent implements OnInit {

  title: string = "Add System User";
  @Input() formData: any;
  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;
  public addSystemUser$!: Subscription;
  profilesList: any[] = [];
  isLoading!: boolean;
  channelOptions: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private _httpService: HttpServService
  ) {}

  ngOnInit() {
    this.getProfiles();
    this.form = this.fb.group({
      firstName: [this.formData ? this.formData.firstName : '', [Validators.required]],
      lastName: [this.formData ? this.formData.lastName : '', [Validators.required]],
      middleName: [this.formData ? this.formData.middleName : '', [Validators.required]],
      email: [this.formData ? this.formData.email : '', [Validators.required, Validators.email]],
      phoneNumber: [this.formData ? this.formData.phoneNumber : '', [Validators.required]],
      idNumber: [this.formData ? this.formData.idNumber : '', [Validators.required]],
      profileId: [this.formData ? this.formData.profileId : '', [Validators.required]],
      channel: "PORTAL",
      // channel: [this.formData ? this.formData.channel : '', [Validators.required]],
    });
  }

  public submitData(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.loading = false;
      return;
    }

    this.loading = true;

    if (this.formData) {
      this.saveChanges();
    } else {
      this.createRecord();
    }
  }

  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }

  private getProfiles(page: number = 0, size: number = 5000): void {
    this.loading = true;

    const model = {
      filter: 'all',
      page: page,
      size: size,
    };

    this._httpService.postReq('portal/api/v1/profiles/getall', model).subscribe(
      (response: any) => {
        if (response.status === 0 ) {
          this.profilesList = response.data;
          console.log(this.profilesList,'this are the profile, select one');
          
        } else {
          console.error(response.message);
        }
        // this.channelOptions = [
        //   { value: 'APP', label: 'APP' },
        //   { value: 'PORTAL', label: 'PORTAL' }
        // ];
        this.loading = false;
      },
      (error) => {
        console.error('Failed to retrieve profiles:', error);
        this.loading = false;
      }
    );
  }

  private createRecord(): void {
    this.isLoading = true;

    const model = {
      firstName: this.form.value.firstName,
      middleName: this.form.value.middleName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      phoneNumber: this.form.value.phoneNumber,
      idNumber: this.form.value.idNumber,
      profileId: this.form.value.profileId,
      channel: this.form.value.channel,
    };

    this.addSystemUser$ = this._httpService.postReq('portal/api/v1/systemuser/create', model).subscribe(
      (result: any) => {
        this.isLoading = false;
        if (result.status === 0) {
          this.activeModal.close('success');
          this.toastr.success(result?.message, 'Success');
        } else {
          this.toastr.error(result?.message, 'Error');
        }
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error(error?.message, 'Error');
      }
    );
  }

  private saveChanges(): void {
    this.isLoading = true;

    const model = {
      firstName: this.form.value.firstName,
      middleName: this.form.value.middleName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      phoneNumber: this.form.value.phoneNumber,
      idNumber: this.form.value.idNumber,
      profileId: this.form.value.profileId,
      channel: this.form.value.channel,
    };

    this._httpService.postReq('systemuser/update', model).subscribe(
      (result: any) => {
        this.isLoading = false;
        if (result.status === 0) {
          this.activeModal.close('success');
          this.toastr.success(result?.message, 'Success');
        } else {
          this.toastr.error(result?.message, 'Error');
        }
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error(error?.message, 'Error');
      }
    );
  }
}
