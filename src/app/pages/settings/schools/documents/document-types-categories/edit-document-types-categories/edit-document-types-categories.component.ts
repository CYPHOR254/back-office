import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-edit-document-types-categories",
  templateUrl: "./edit-document-types-categories.component.html",
  styleUrls: ["./edit-document-types-categories.component.scss"],
})
export class EditDocumentTypesCategoriesComponent implements OnInit {
  @Input() formData: any;

  DocumentsCodes: any[] = [];
  documentCodeIds: any[] = [];
  documentCodeNames: any[] = [];
  title: string = "Edit Document Category";
  isLoading?: boolean;
  subs: Subscription[] = [];
  profileId: any;

  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    public toastr: ToastrService,
    public httpService: HttpServService
  ) {}

  ngOnInit() {
    this.getDocumentCode();

    this.form = this.fb.group({
      name: [this.formData ? this.formData.name : "", [Validators.required]],
      remarks: [
        this.formData ? this.formData.remarks : "",
        [Validators.required],
      ],
      menuCodeId: [
        this.formData ? this.formData.menuCodeId : "",
        [Validators.required],
      ],
    });
    
    console.log(this.formData);
  }

  getDocumentCode() {
    this.loading = true;
    const model = null;
    this.httpService
      .postReq("portal/api/v1/documents/menu-codes/getall", model)
      .subscribe((response: any) => {
        if (response.status == 0) {
          this.DocumentsCodes = response.data;

          this.documentCodeIds = this.DocumentsCodes.map(
            (item: any) => item.id
          );
          console.log(this.documentCodeIds, "menuCodeIdid");

          this.documentCodeNames = this.DocumentsCodes.map(
            (item: any) => item.name
          );
          console.log(this.documentCodeNames, "menuCodeIdName");
        }
      });
  }

  public submitData(): void {
    if (this.formData) {
      this.editSchoolDesignation();
    } else {
      this.createSchoolDesignationInitial();
    }
    this.loading = true;
  }

  public closeModal(): void {
    this.activeModal.dismiss("Cross click");
  }

  private createSchoolDesignationInitial(): any {
    this.loading = false;

    let model = {
      // id: this.formData.id,
      name: [this.formData ? this.formData.name : "", [Validators.required]],
      remarks: [
        this.formData ? this.formData.remarks : "",
        [Validators.required],
      ],
      menuCodeId: [
        this.formData ? this.formData.menuCodeId : "",
        [Validators.required],
      ],
      required: true,
    };

    this.httpService
      .postReq("portal/api/v1/documents/type/save", model)
      .subscribe((result: any) => {
        if (result.status === 0) {
          this.isLoading = false;
          this.activeModal.close("success");
          this.toastr.success(result?.message, "Success");
          console.log(result);
        } else {
          this.activeModal.close("error");
          this.toastr.error(result?.message, "Error");
        }
      });
  }

  private editSchoolDesignation(): any {
    console.log("this.form");
    console.log(this.form);

    this.isLoading = true;
    const model = {
      id: this.formData.id,
      name: this.form.value.name,
      remarks: this.form.value.remarks,
      menuCodeId: this.form.value.menuCodeId,
      required: false,
    };

    this.httpService
      .postReq("portal/api/v1/documents/type/update", model)
      .subscribe((result: any) => {
        if (result.status === 0) {
          this.isLoading = false;
          this.activeModal.close("success");
          this.toastr.success(result?.message, "Success");
          console.log(result);
        } else {
          this.activeModal.close("error");
          this.toastr.error(result?.message, "Error");
        }
      });
  }
}
