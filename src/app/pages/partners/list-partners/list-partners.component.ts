import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { catchError, map, Observable, of, Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { UserActionsModalComponent } from "src/app/shared/components/user-actions-modal/user-actions-modal.component";
import { AssignProfileDialogComponent } from "src/app/shared/components/assign-profile-dialog/assign-profile-dialog.component";
import { EditPartnerComponent } from "../edit-partner/edit-partner.component";
import { AddPartnerComponent } from "../add-partner/add-partner.component";
import { ApiService } from "src/app/api.service";
import { format } from 'date-fns';


@Component({
  selector: "app-list-partners",
  templateUrl: "./list-partners.component.html",
  styleUrls: ["./list-partners.component.scss"],
})
export class ListPartnersComponent implements OnInit, OnDestroy {
  @Input() formData: any;

  loading: boolean = true;
  rows: any[] = [];
  filteredRows: any[] = [];
  defaultNavActiveId = 1;
  allRecords: any[] = [];
  title: string = "Partners";
  actions = ["View", "Edit", "Delete", "Activate"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  profilesList: any[] = [];
  channelOptions: any[] = [];
  viewedPartner: any;
  form: any;
  isLoading!: boolean;
  resources: any[] = []; // Add this for resource data

  public modalRef!: NgbModalRef;

  constructor(
    private httpService: HttpServService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private apiService: ApiService // Adjust based on your actual service implementation
  ) {}

  columns = [
    { name: "First Name", prop: "firstName" },
    { name: "Middle Name", prop: "middleName" },
    { name: "Last Name", prop: "lastName" },
    { name: "Email", prop: "email" },
    { name: "National ID", prop: "nationalId" },
    { name: "Phone Number", prop: "phoneNo" },
    { name: "Firm Name", prop: "firmName" },
    { name: "Emergency Contact", prop: "emergencyContact" },
    { name: "Business Contact", prop: "businessContact" },
    { name: "Business Email", prop: "businessEmail" },
    { name: "Resource", prop: "resource" },
    { name: "Agreement Start Date", prop: "agreementStartDate" },
    { name: "Agreement End Date", prop: "agreementEndDate" },
    { name: "Actions", prop: "actions" },
  ];

  allColumns = [...this.columns];
  partnersList$: Observable<any> = of([]);

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.fetchResources();
    this.fetchPartners()
  }

  fetchResources() {
    this.apiService.getResources().subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.resources = response.result;
          console.log("Fetched resources:", response.result);
          this.fetchPartners(); // Fetch partners after resources are fetched
        } else {
          this.toastr.error('Failed to fetch resources', 'Error');
        }
      },
      (error) => {
        console.error('Error fetching resources', error);
      }
    );
  }

  fetchPartners() {
    this.loading = true;
    this.apiService.getPartners().pipe(
      catchError(error => {
        this.toastr.error('Failed to fetch partners', 'Error');
        this.loading = false;
        return of([]);
      })
    ).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.rows = response.result.map((partner: any) => ({
          partnerId: partner.partnerId,
          resource: partner.resource,
          resourceId: partner.resourceId,
          firstName: partner.firstName,
          middleName: partner.middleName,
          lastName: partner.lastName,
          email: partner.email,
          nationalId: partner.nationalId,
          phoneNo: partner.phoneNo,
          firmName: partner.firmName,
          emergencyContact: partner.emergencyContact,
          businessContact: partner.businessContact,
          businessEmail: partner.businessEmail,
          agreementStartDate: format(new Date(partner.agreementStartDate), 'yyyy-MM-dd'),
          agreementEndDate: format(new Date(partner.agreementEndDate), 'yyyy-MM-dd')
        }));
        this.filteredRows = this.rows;
        this.allRecords = this.rows;
        this.totalRecords = this.rows.length;
        this.toastr.success('Fetched partners successfully', 'Success');
        console.log("Fetched partners:", this.rows);
      } else {
        this.toastr.error('Failed to fetch partners', 'Error');
      }
      this.loading = false;
    });
  }
  
  updateColumns(updatedColumns: any) {
    this.columns = [...updatedColumns];
  }

  triggerEvent(data: string) {
    let eventData = JSON.parse(data);
    console.log('Event Data:', eventData);

    if (eventData.action === "View") {
      if (eventData.row && eventData.row.partnerId) {
        this.viewedPartner = eventData.row.partnerId;
        this.router.navigate([`/partners/view-partner/${this.viewedPartner}`]);
        console.log(this.viewedPartner, 'this is the Id');
      } else {
        console.error('Partner ID is undefined');
        this.toastr.error('Unable to view partner. Partner ID is missing.', 'Error');
      }
    } else if (eventData.action === "Edit") {
      this.editPartner(eventData.row);
    } else if (eventData.action === "Delete") {
      this.confirmDeletePartner(eventData.row);
    }
  }

  updateFilteredRowsEvent(data: any) {
    this.filteredRows = data;
  }

  addPartner() {
    this.modalRef = this.modalService.open(AddPartnerComponent, {
      centered: true,
      animation: true,
    });
    this.modalRef.componentInstance.title = "Add Partner";
    this.modalRef.result.then(
      (result) => {
        if (result === "success") {
          this.fetchPartners();
        }
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  editPartner(formData: any) {
    this.modalRef = this.modalService.open(EditPartnerComponent, {
      centered: true,
      animation: true,
    });

    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.title = "Edit Partner";
    this.modalRef.result.then(
      (result) => {
        if (result === "success") {
          this.fetchPartners();
        }
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  private activatePartner(row: any) {
    this.modalRef = this.modalService.open(AssignProfileDialogComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.title = "Activate Partner";
    this.modalRef.componentInstance.buttonLabel = "Activate Partner";
    this.modalRef.componentInstance.body = "Do you want to activate this Partner?";
    this.modalRef.result.then((result) => {
      if (result?.status === "success") {
        this.isLoading = true;

        let model = {
          partnerId: row.partnerId, // Ensure you use partnerId
          profileId: result?.profileId,
          channel: "PORTAL",
        };

        this.httpService
          .postReq("portal/api/v1/systemuser/make/partner/systemuser", model)
          .subscribe((result: any) => {
            if (result.status === 0) {
              this.toastr.success(result?.message, "Success");
            } else {
              this.toastr.error(result?.message, "Error");
            }
          });
      }
    });
  }

  private disablePartner(row: any) {
    this.modalRef = this.modalService.open(UserActionsModalComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.title = "Delete Partner";
    this.modalRef.componentInstance.buttonLabel = "Delete Partner";
    this.modalRef.componentInstance.body = "Do you want to delete this Partner?";
    this.modalRef.result.then((result) => {
      if (result?.status === "success") {
        const model = {
          id: row.partnerId, // Ensure you use partnerId
          remark: result?.remark,
        };

        this.httpService
          .postReq("portal/api/v1/partners/delete", model)
          .subscribe({
            next: (resp) => {
              if (resp["status"] === 0) {
                this.toastr.success(resp?.message, "Success");
                this.fetchPartners();
              } else {
                this.toastr.error(resp?.message, "Error");
              }
            },
            error: (error) => {
              this.loading = false;
              this.toastr.error(
                error["statusText"] ||
                  error["message"] ||
                  error.error["message"],
                "Partner not deleted."
              );
            },
          });
      }
    });
  }

  searchResultUniversal(event: any) {
    const filteredData = this.allRecords?.filter((item: any) => {
      return Object.values(item)?.some((value: any) => {
        let str = value + "";
        return str?.toLowerCase()?.includes(event?.toLowerCase());
      });
    });

    this.partnersList$ = of(filteredData);
  }

  searchResultByDate(event: any) {
    const filteredData = this.allRecords.filter((item: any) => {
      const createdOnDate = new Date(item.createdOn);
      return (
        createdOnDate >= event?.startDate && createdOnDate <= event?.endDate
      );
    });
    this.partnersList$ = of(filteredData);
  }

  confirmDeletePartner(row: any) {
    if (confirm(`Are you sure you want to delete ${row.firstName} ${row.lastName}?`)) {
      this.deletePartner(row.partnerId); // Ensure you use partnerId
    }
  }

  deletePartner(partnerId: number) {
    this.apiService.deletePartner(partnerId).subscribe(
      () => {
        this.toastr.success('Partner deleted successfully', 'Success');
        this.fetchPartners(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting partner:', error);
        if (error.status === 403) {
          this.toastr.error('Permission denied to delete partner', 'Error');
        } else {
          this.toastr.error('Failed to delete partner', 'Error');
        }
      }
    );
  }
}
