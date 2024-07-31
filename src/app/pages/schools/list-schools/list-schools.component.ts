import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { map, Observable, of, Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { catchError } from "rxjs/operators";
import { ApiService } from '../../../api.service'; // Adjust the path as necessary
import { EditSchoolComponent } from "../edit-school/edit-school.component";
import { AddSchoolComponent } from "../add-school/add-school.component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-list-schools",
  templateUrl: "./list-schools.component.html",
  styleUrls: ["./list-schools.component.scss"],
})
export class ListSchoolsComponent implements OnInit, OnDestroy {
  public modalRef!: NgbModalRef;
  @Input() formData: any;
  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  title: string = "school";
  actions = ["View", "Edit", "Delete"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  schoolList: any[] = [];
  viewedSchool: any;
  schoolList$: Observable<any> = of([]);
  allRecords: any;

  schoolTypes: any[] = [];
  curriculums: any[] = [];
  schoolGenders: any[] = [];

  columns = [
    { name: "Name", prop: "schoolName" },
    { name: "Category", prop: "category" },
    { name: "Curriculum", prop: "curriculum" },
    { name: "schoolType", prop: "schoolType" },
    { name: 'County', prop: 'county' },
    { name: 'Email Address', prop: 'emailAddress' },
    // { name: 'SubCounty', prop: 'subCounty' },
    { name: "Actions", prop: "actions" },
  ];
  
  categories: any[] = [];

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit(): void {
    this.getIndividualData();
    this.getCurriculums();
    this.getSchoolTypes();
    this.getSchoolGenders();
  }

  getSchoolTypes(): void {
    this.apiService.getSchoolTypes().subscribe(
      (response: any) => {
        if (response.statusCode === 200 && Array.isArray(response.result)) {
          this.schoolTypes = response.result;
          console.log(" ....fetched SchoolTypes", response.result);
        } else {
          console.error('Failed to fetch school types:', response);
        }
      },
      (error) => {
        console.error('Error fetching school types:', error);
      }
    );
  }

  getCurriculums(): void {
    this.apiService.getCurriculums().subscribe(
      (response: any) => {
        if (response.statusCode === 200 && Array.isArray(response.result)) {
          this.curriculums = response.result;
          console.log(" ....fetched curriculum", response.result);
        } else {
          console.error('Failed to fetch curriculums:', response);
        }
      },
      (error) => {
        console.error('Error fetching curriculums:', error);
      }
    );
  }

  getSchoolGenders(): void {
    this.apiService.getSchoolGenders().subscribe(
      (response: any) => {
        if (response.statusCode === 200 && Array.isArray(response.result)) {
          this.schoolGenders = response.result;
          console.log(".......Fetched School Genders:", response.result);
        } else {
          console.error('Failed to fetch school genders:', response);
        }
      },
      (error) => {
        console.error('Error fetching school genders:', error);
      }
    );
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.categoryId === categoryId);
    return category ? category.name : '';
  }
  
  getCurriculumName(curriculumId: number): string {
    const curriculum = this.curriculums.find(cur => cur.curriculumId === curriculumId);
    return curriculum ? curriculum.curriculum : '';
  }
  
  getSchoolTypeName(schoolTypeId: number): string {
    const schoolType = this.schoolTypes.find(type => type.schoolTypeId === schoolTypeId);
    return schoolType ? schoolType.name : '';
  }

  getIndividualData(): void {
    this.loading = true;
    console.log("Fetching school data...");
  
    this.schoolList$ = this.apiService.getSchools().pipe(
      map((response: any) => {
        console.log("API response: ", response);
  
        if (response && response.statusCode === 200 && Array.isArray(response.result)) {
          this.allRecords = response.result;
          this.rows = this.allRecords.map((item: any, index: any) => {
            const myDate = item["createdOn"] ? item["createdOn"].split(" ")[0] : '';
            const dateObj = myDate ? new Date(myDate).toString().split("GMT")[0].replace(" 03:00:00", "") : '';
  
            return { 
              ...item, 
              frontendId: index + 1, 
              createdOn: dateObj,
              curriculumName: this.getCurriculumName(item.curriculumId),
              schoolTypeName: this.getSchoolTypeName(item.schoolTypeId),
              categoryName: this.getCategoryName(item.categoryId)
            };
          });
  
          console.log("Processed rows: ", this.rows);
          this.totalRecords = this.rows.length;
          this.loading = false;
          return this.rows;
        } else {
          this.toastr.error("Unexpected API response format", "Error");
          this.loading = false;
          return []; 
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Error fetching schools: ", error);
        this.toastr.error(
          error?.statusText || error?.message || error?.error?.message,
          "Error fetching schools"
        );
        this.loading = false;
        return of([]); 
      })
    );
  }

  updateColumns(updatedColumns: any) {
    this.columns = [...updatedColumns];
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }

  triggerEvent(data: string) {
    let eventData = JSON.parse(data);
    console.log('Event Data:', eventData);
  
    if (eventData.action === "View") {
      if (eventData.row && eventData.row.schoolId) {
        this.viewedSchool = eventData.row.schoolId;
        this.router.navigate([`/schools/view-school/${this.viewedSchool}`]);
        console.log(this.viewedSchool, 'this is the Id');
      } else {
        console.error('School ID is undefined');
        this.toastr.error('Unable to view school. School ID is missing.', 'Error');
      }
    } else if (eventData.action === "Edit") {
      this.openEditSchoolModal(eventData.row);
    } else if (eventData.action === "Delete") {
      this.confirmDeleteSchool(eventData.row);
    }
  }

  searchResultUniversal(event: any) {
    const filteredData = this.allRecords?.filter((item: any) => {
      return Object.values(item)?.some((value: any) => {
        let str = value + '';
        return str?.toLowerCase()?.includes(event?.toLowerCase());
      });
    });

    this.schoolList$ = of(filteredData);
  }

  searchResultByDate(event: any) {
    const filteredData = this.allRecords.filter((item: any) => {
      const createdOnDate = new Date(item.createdOn);
      return createdOnDate >= event?.startDate && createdOnDate <= event?.endDate;
    });

    this.schoolList$ = of(filteredData);
  }

  addSchool() {
    this.modalRef = this.modalService.open(AddSchoolComponent, {
      centered: true,
      animation: true,
    });
    this.modalRef.componentInstance.title = "Add School";
    this.modalRef.result.then(
      (result) => {
        if (result === "success") {
          this.getIndividualData();
        }
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  openEditSchoolModal(schoolData: any) {
    const modalRef = this.modalService.open(EditSchoolComponent, {
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.schoolData = schoolData;  // Make sure this data is correct
    modalRef.componentInstance.title = "Edit School";
  
    modalRef.result.then((result) => {
      if (result === "success") {
        this.getIndividualData();  // Refresh the list after editing
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  confirmDeleteSchool(row: any) {
    if (confirm(`Are you sure you want to delete ${row.schoolName}?`)) {
      this.deleteSchool(row.schoolId); // Adjust `row.schoolId` if needed
    }
  }

  deleteSchool(schoolId: number) {
    this.apiService.deleteSchool(schoolId).subscribe(
      () => {
        this.toastr.success('School deleted successfully', 'Success');
        this.getIndividualData(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting school:', error);
        if (error.status === 403) {
          this.toastr.error('Permission denied to delete school', 'Error');
        } else {
          this.toastr.error('Failed to delete school', 'Error');
        }
      }
    );
  }
}
