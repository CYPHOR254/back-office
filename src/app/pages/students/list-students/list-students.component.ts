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
  Subscribable,
  Subscription,
  TimeoutError,
} from "rxjs";
import { ToastrService } from "ngx-toastr";
import { AddStudentComponent } from "../add-student/add-student.component";
import { EditStudentComponent } from "../edit-student/edit-student.component";
import { ApiService } from "../../../api.service"; // Adjust path based on your project structure

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss']
})
export class ListStudentsComponent implements OnInit, OnDestroy {
  public modalRef!: NgbModalRef;
  @Input() formData: any;

  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  allRecords: any;
  title: string = "students";
  actions = ["View", "Edit", "Delete"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  viewedStudent: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private apiService: ApiService
  ) { }

  columns = [
    { name: 'Full Name', prop: 'fullName' },
    // { name: 'Middle Name', prop: 'middleName' },
    // { name: 'Last Name', prop: 'lastName' },
    { name: 'School Name', prop: 'schoolName' },
    { name: `Student's Email`, prop: 'email' },
    { name: 'Registration No', prop: 'registrationNo' },
    { name: 'Gender', prop: 'gender' },
    { name: 'Status', prop: 'status' },
    // { name: 'Nationality', prop: 'nationality' },
    // { name: 'Date of Birth', prop: 'dateOfBirth' },
    { name: "Actions", prop: "actions" },
  ];

  allColumns = [...this.columns];
  StudentList$: Observable<any> = of([]);

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.fetchStudents();
  }

  // fetchStudents() {
  //   this.loading = true;
  //   this.apiService.getStudents().pipe(
  //     catchError(error => {
  //       this.toastr.error('Failed to fetch students', 'Error');
  //       this.loading = false;
  //       return of([]);
  //     })
  //   ).subscribe((response: any) => {
  //     if (response.statusCode === 200) {
  //       this.rows = response.result;
  //       this.filteredRows = this.rows;
  //       this.totalRecords = this.rows.length;
  //       this.StudentList$ = of(this.rows); // Update StudentList$
  //       this.toastr.success('Fetched students successfully', 'Success');
  //     } else {
  //       this.toastr.error('Failed to fetch students', 'Error');
  //     }
  //     this.loading = false;
  //   });
  // }
  fetchStudents() {
    this.loading = true;
    this.apiService.getStudents().pipe(
      catchError(error => {
        this.toastr.error('Failed to fetch students', 'Error');
        this.loading = false;
        return of([]);
      })
    ).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.rows = response.result.map((student: any) => ({
          ...student,
          fullName: this.getFullName(student.firstName, student.middleName, student.lastName)
        }));
        this.filteredRows = this.rows;
        this.totalRecords = this.rows.length;
        this.StudentList$ = of(this.rows); // Update StudentList$
        this.toastr.success('Fetched students successfully', 'Success');
      } else {
        this.toastr.error('Failed to fetch students', 'Error');
      }
      this.loading = false;
    });
  }
  
  getFullName(firstName: string, middleName: string, lastName: string): string {
    return `${firstName} ${middleName} ${lastName}`.trim().slice(0, 16);
  }

  updateColumns(updatedColumns: any) {
    this.columns = [...updatedColumns];
  }

  triggerEvent(data: string) {
    let eventData = JSON.parse(data);
    console.log('Event Data:', eventData);

    if (eventData.action === "View") {
      if (eventData.row && eventData.row.studentId !== undefined) {
        this.viewedStudent = eventData.row.studentId;
        this.router.navigate([`/students/view-student/${this.viewedStudent}`]);
        console.log(this.viewedStudent, 'this is the Id');
      } else {
        console.error('Student ID is undefined or invalid');
        this.toastr.error('Unable to view student. Student ID is missing or invalid.', 'Error');
      }
    } else if (eventData.action === "Edit") {
      this.openEditStudentModal(eventData.row);
    } else if (eventData.action === "Delete") {
      this.confirmDeleteStudent(eventData.row);
    }
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }

  addStudent() {
    this.modalRef = this.modalService.open(AddStudentComponent, {
      centered: true,
      animation: true,
    });
    this.modalRef.componentInstance.title = "Add Student";
    this.modalRef.result.then(
      (result) => {
        if (result === "success") {
          this.fetchStudents();
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

    this.StudentList$ = of(filteredData);
  }

  searchResultByDate(event: any) {
    const filteredData = this.allRecords.filter((item: any) => {
      const createdOnDate = new Date(item.createdOn);
      return createdOnDate >= event?.startDate && createdOnDate <= event?.endDate;
    });
    this.StudentList$ = of(filteredData);
  }

  openEditStudentModal(formData: any) {
    const modalRef = this.modalService.open(EditStudentComponent, {
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.formData = formData;

    modalRef.result.then((result) => {
      if (result.status === 'success') {
        this.fetchStudents();
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  confirmDeleteStudent(row: any) {
    if (confirm(`Are you sure you want to delete ${row.firstName} ${row.lastName}?`)) {
      this.deleteStudent(row.studentId);
    }
  }

  deleteStudent(studentId: number) {
    this.apiService.deleteStudent(studentId).subscribe(
      () => {
        this.toastr.success('Student deleted successfully', 'Success');
        this.fetchStudents(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting student:', error);
        if (error.status === 403) {
          this.toastr.error('Permission denied to delete student', 'Error');
        } else {
          this.toastr.error('Failed to delete student', 'Error');
        }
      }
    );
  }
}