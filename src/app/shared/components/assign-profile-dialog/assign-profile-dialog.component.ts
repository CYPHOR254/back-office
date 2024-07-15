import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpServService} from "../../services/http-serv.service";
@Component({
  selector: 'app-assign-profile-dialog',
  templateUrl: './assign-profile-dialog.component.html',
  styleUrls: ['./assign-profile-dialog.component.scss']
})
export class AssignProfileDialogComponent implements OnInit {
  @Input() title: any;
  @Input() formData: any;
  @Input() action: any;
  @Input() buttonLabel: any;
  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;
  profilesList: any;

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder, private httpService: HttpServService) {
  }

  ngOnInit() {

    console.log('this.formData');
    console.log(this.formData);

    this.form = this.fb.group({
      profileId: [
        this.formData ? this.formData.profileId : '',
        [Validators.required],
      ],
    });
    console.log('Form:', this.form);
    this.getProfiles();

  }
  
getProfiles(page: number = 0, size: number = 100): void {
    this.loading = true;

    let model = {
      filter: 'all',
      page: page,
      size: size,
    };

    this.httpService
      .postReq('portal/api/v1/profiles/getall', model)
      .subscribe((response: any) => {
        console.log(response);
        
        if (response.status === 0 ) {
          this.profilesList = response.data;
          console.log(this.profilesList,'this are the profile, select one');
          console.log(response.data);
        } else {
          console.error( response.message);
        }
      });
  }

  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }

  activateUser() {
    this.activeModal.close({status: 'success', profileId: this.form.value.profileId});
  }





}
