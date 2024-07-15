import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: 'app-add-passwords',
  templateUrl: './add-passwords.component.html',
  styleUrls: ['./add-passwords.component.scss']
})
export class AddPasswordsComponent implements OnInit, OnDestroy {
  @Input() title: any;
  @Input() formData: any;

  isLoading!: boolean;
  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;
  public addPassword!: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private _httpService: HttpServService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      passwords: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  ngOnDestroy(): void {
    if (this.addPassword) {
      this.addPassword.unsubscribe();
    }
  }

  get passwords(): FormArray {
    return this.form.get('passwords') as FormArray;
  }

  addPasswordField(): void {
    this.passwords.push(this.fb.control('', Validators.required));
  }

  removePasswordField(index: number): void {
    this.passwords.removeAt(index);
  }

  public submitData(): void {
    this.createRecord();
    this.loading = true;
  }

  public closeModal(): void {
    this.activeModal.dismiss("Cross click");
  }

  private createRecord(): any {
    this.isLoading = true;
    const model = {
      unauthorizedPassword: this.form.value.passwords
    };
    this.addPassword = this._httpService
      .postReq("portal/api/v1/passwords/unauthorized/save", model)
      .subscribe((result: any) => {
        this.isLoading = false;
        if (result.status === 0) {
          this.activeModal.close("success");
          this.toastr.success(result?.message, "Success");
        } else {
          this.activeModal.close("error");
          this.toastr.error(result?.message, "Error");
        }
      });
  }
}
