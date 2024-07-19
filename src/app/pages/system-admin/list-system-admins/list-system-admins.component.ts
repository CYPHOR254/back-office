import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { Observable, Subscription, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "../../../api.service"; // Adjust path based on your project structure
import { AddSystemAdminComponent } from "../add-system-admin/add-system-admin.component";
import { EditSystemAdminComponent } from "../edit-system-admin/edit-system-admin.component";

@Component({
  selector: 'app-list-system-admins',
  templateUrl: './list-system-admins.component.html',
  styleUrls: ['./list-system-admins.component.scss']
})
export class ListSystemAdminsComponent implements OnInit, OnDestroy {
  @Input() formData: any;

  loading: boolean = false;
  rows: any = [];
  filteredRows: any = [];
  allRecords: any;
  title: string = "System Admins";
  totalRecords: number = 0;
  subs: Subscription[] = [];
  admin$: Observable<any> = of([]);
  actions = ["Edit", "Delete"];

  public modalRef!: NgbModalRef;

  columns = [
    { name: "#", prop: "adminId" },
    { name: "First Name", prop: "firstName" },
    { name: "Middle Name", prop: "middleName" },
    { name: "Last Name", prop: "lastName" },
    { name: "Email", prop: "email" },
    { name: "National ID", prop: "nationalId" },
    { name: "Phone No", prop: "phoneNo" },
    { name: "Department", prop: "department" },
    { name: "Office Phone No", prop: "officePhoneNo" },
    { name: "Actions", prop: "actions" },
  ];

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private apiService: ApiService // Adjust based on your actual service implementation
  ) { }

  ngOnInit() {
    this.fetchSystemAdmins(); // Fetch data on component initialization
  }

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  fetchSystemAdmins() {
    this.loading = true;
    this.apiService.getSystemAdmins().pipe(
      catchError(error => {
        this.toastr.error('Failed to fetch system admins', 'Error');
        this.loading = false;
        return of([]);
      })
    ).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.rows = response.result;
        this.filteredRows = this.rows;
        this.totalRecords = this.rows.length;
        this.toastr.success('Fetched system admins successfully', 'Success');
      } else {
        this.toastr.error('Failed to fetch system admins', 'Error');
      }
      this.loading = false;
    });
  }

  addAdmin() {
    this.modalRef = this.modalService.open(AddSystemAdminComponent, {
      centered: true,
      animation: true,
    });
  }

  updateColumns(updatedColumns: any) {
    this.columns = [...updatedColumns];
  }

  triggerEvent(data: string) {
    let eventData = JSON.parse(data);
    const adminId = eventData["row"]["adminId"];

    if (eventData.action == "View") {
      this.router.navigate([`/system-admins/view-admin/${adminId}`])
        .catch(error => console.error('Navigation error:', error));
    } else if (eventData.action == "Edit") {
      this.openEditSystemAdminModal(eventData.row);
    } else if (eventData.action == "Delete") {
      this.confirmDeleteAdmin(eventData.row);
    }
  }

  confirmDeleteAdmin(row: any) {
    if (confirm(`Are you sure you want to delete ${row.firstName} ${row.lastName}?`)) {
      this.deleteAdmin(row.adminId);
    }
  }

  deleteAdmin(adminId: number) {
    this.apiService.deleteSystemAdmin(adminId).subscribe(
      () => {
        this.toastr.success('System admin deleted successfully', 'Success');
        this.fetchSystemAdmins(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting system admin:', error);
        if (error.status === 403) {
          this.toastr.error('Permission denied to delete system admin', 'Error');
        } else {
          this.toastr.error('Failed to delete system admin', 'Error');
        }
      }
    );
  }
  
  

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }

  searchResultUniversal(event: any) {
    const filteredData = this.allRecords?.filter((item: any) => {
      return Object.values(item)?.some((value: any) => {
        let str = value + "";
        return str?.toLowerCase()?.includes(event?.toLowerCase());
      });
    });

    this.admin$ = of(filteredData);
  }

  searchResultByDate(event: any) {
    const filteredData = this.allRecords.filter((item: any) => {
      const createdOnDate = new Date(item.createdOn);
      return (
        createdOnDate >= event?.startDate && createdOnDate <= event?.endDate
      );
    });
    this.admin$ = of(filteredData);
  }

  openEditSystemAdminModal(formData: any) {
    const modalRef = this.modalService.open(EditSystemAdminComponent, {
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.formData = formData;

    modalRef.result.then((result) => {
      if (result.status === 'success') {
        this.fetchSystemAdmins();
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}
