import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subscription, map, of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-add-document-types-categories",
  templateUrl: "./add-document-types-categories.component.html",
  styleUrls: ["./add-document-types-categories.component.scss"],
})
export class AddDocumentTypesCategoriesComponent implements OnInit {
  @Input() formData: any;
  isLoading!: boolean;
  title: string = "Add Document Category";
  rows: any = [];
  DocumentsCodes: any[] = [];
  documentCodeIds: any[] = [];
  documentCodeNames: any[] = [];
  totalRecords: number = 0;
  schoolDocumentCodeList$: Observable<any> = of([]);

  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;
  public addDocumentCategory$!: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private _httpService: HttpServService
  ) {}
  columns = [
    { name: "Name", prop: "name" },
    { name: "Remarks", prop: "remarks" },
    { name: "menuCodeId", prop: "menuCodeId" },
    { name: "Required", prop: "required" },
    { name: "Actions", prop: "actions" },
  ];
  allColumns = [...this.columns];

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
  }
  public submitData(): void {
    this.createRecord();
  }
  public closeModal(): void {
    this.activeModal.dismiss("Cross click");
  }

  getDocumentCode() {
    this.loading = true;
    const model = null;
    this._httpService
      .postReq("portal/api/v1/documents/menu-codes/getall", model)
      .subscribe((response: any) => {
        if (response.status == 0 ) {
          this.DocumentsCodes = response.data;
          console.log(this.DocumentsCodes,'SEE MENUCODE');
          
          // this.documentCodeIds= this.DocumentsCodes.map((item: any) => item.id);
          // console.log(this.documentCodeIds, 'menuCodeid');
        }
      });
  }

  private createRecord(): any {
    this.isLoading = true;
    let model = {
      name: this.form.value.name,
      menuCodeId: this.form.value.menuCodeId,
      remarks: this.form.value.remarks,
      required: true,
    };
    console.log(model);
    
    this.addDocumentCategory$ = this._httpService
      .postReq("portal/api/v1/documents/type/save", model)
      .subscribe((result: any) => {
        if (result.status === 0) {
          this.isLoading = false;
          this.activeModal.close("success");
          this.toastr.success(result?.message, "Success");
        } else {
          this.activeModal.close("error");
          this.toastr.error(result?.message, "Error");
        }
      });
  }
}
