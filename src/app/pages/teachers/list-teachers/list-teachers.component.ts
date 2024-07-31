import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import {
  catchError,
  map,
  Observable,
  of,
  Subscription,
  TimeoutError,
} from "rxjs";
import { ToastrService } from "ngx-toastr";
import { AddTeacherComponent } from "../add-teacher/add-teacher.component";
import { EditTeacherComponent } from "../edit-teacher/edit-teacher.component";
import { ApiService } from "../../../api.service"; // Adjust path based on your project structure

@Component({
  selector: 'app-list-teachers',
  templateUrl: './list-teachers.component.html',
  styleUrls: ['./list-teachers.component.scss']
})
export class ListTeachersComponent implements OnInit, OnDestroy {
  public modalRef!: NgbModalRef;
  @Input() formData: any;

  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  allRecords: any;
  title: string = "teachers";
  actions = ["View", "Edit", "Delete", "Activate"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  profilesList: any[] = [];
  channelOptions: any[] = [];
  viewedTeacher: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private apiService: ApiService // Adjust based on your actual service implementation

  ) {}


  columns = [
    { name: 'First Name', prop: 'firstName' },
    { name: 'Middle Name', prop: 'middleName' },
    { name: 'Last Name', prop: 'lastName' },
    { name: 'School Name', prop: 'schoolName' },
    { name: 'Phone Number', prop: 'phoneNo' },
    { name: 'National ID', prop: 'nationalId' },
    { name: 'Email', prop: 'email' },
    { name: 'Gender', prop: 'gender' },
    { name: 'Nationality', prop: 'nationality' },
    { name: 'Date of Birth', prop: 'dateOfBirth' },
    { name: 'TSC Number', prop: 'tscNo' },
    { name: 'Years of Experience', prop: 'yearsOfExperience' },
    { name: "Actions", prop: "actions" },
  ];

  allColumns = [...this.columns];
  TeacherList$: Observable<any> = of([]);
  
  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.fetchTeachers(); // Fetch data on component initialization
  }

  fetchTeachers() {
    this.loading = true;
    this.apiService.getTeachers().pipe(
      catchError(error => {
        this.toastr.error('Failed to fetch teachers', 'Error');
        this.loading = false;
        return of([]);
      })
    ).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.rows = response.result;
        this.filteredRows = this.rows;
        this.totalRecords = this.rows.length;
        this.toastr.success('Fetched teachers successfully', 'Success');
      } else {
        this.toastr.error('Failed to fetch teachers', 'Error');
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
      if (eventData.row && eventData.row.teacherId !== undefined) {
        this.viewedTeacher = eventData.row.teacherId;
        this.router.navigate([`/teachers/view-teacher/${this.viewedTeacher}`]);
        console.log(this.viewedTeacher, 'this is the Id');
      } else {
        console.error('Teacher ID is undefined or invalid');
        this.toastr.error('Unable to view teacher. Teacher ID is missing or invalid.', 'Error');
      }
    } else if (eventData.action === "Edit") {
      this.openEditSystemAdminModal(eventData.row);
    } else if (eventData.action === "Delete") {
      this.confirmDeleteTeacher(eventData.row);
    }
  }



  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }

  addTeacher() {
    this.modalRef = this.modalService.open(AddTeacherComponent, {
      centered: true,
      animation: true,
    });
    this.modalRef.componentInstance.title = "Add Teachers";
    this.modalRef.result.then(
      (result) => {
        if (result === "success") {
          this.fetchTeachers();
        }
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  searchResultUniversal(event: any) {
    const filteredData = this.allRecords?.filter((item: any) => {
      return Object.values(item)?.some((value: any) => {
        let str = value + '';
        return str?.toLowerCase()?.includes(event?.toLowerCase())
      });
    });
    
    this.TeacherList$ = of(filteredData);
  }

  searchResultByDate(event: any) {
    const filteredData = this.allRecords.filter((item: any) => {
      const createdOnDate = new Date(item.createdOn);
      return createdOnDate >= event?.startDate && createdOnDate <= event?.endDate;
    });
    this.TeacherList$ = of(filteredData);
  }

  openEditSystemAdminModal(formData: any) {
    const modalRef = this.modalService.open(EditTeacherComponent, {
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.formData = formData;

    modalRef.result.then((result) => {
      if (result.status === 'success') {
        this.fetchTeachers();
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  confirmDeleteTeacher(row: any) {
    if (confirm(`Are you sure you want to delete ${row.firstName} ${row.lastName}?`)) {
      this.deleteTeacher(row.teacherId);
    }
  }

  deleteTeacher(teacherId: number) {
    this.apiService.deleteTeacher(teacherId).subscribe(
      () => {
        this.toastr.success('Teacher deleted successfully', 'Success');
        this.fetchTeachers(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting teacher:', error);
        if (error.status === 403) {
          this.toastr.error('Permission denied to delete teacher', 'Error');
        } else {
          this.toastr.error('Failed to delete teacher', 'Error');
        }
      }
    );
  }
}
