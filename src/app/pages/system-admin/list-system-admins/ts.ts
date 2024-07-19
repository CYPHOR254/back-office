// import { Component, Input, OnInit, OnDestroy } from "@angular/core";
// import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
// import { Router } from "@angular/router";
// import { Observable, of, Subscription } from "rxjs";
// import { ToastrService } from "ngx-toastr";
// import { AssignProfileDialogComponent } from "src/app/shared/components/assign-profile-dialog/assign-profile-dialog.component";
// import { EditSystemAdminComponent } from "../edit-system-admin/edit-system-admin.component";


// @Component({
//   selector: 'app-list-system-admins',
//   templateUrl: './list-system-admins.component.html',
//   styleUrls: ['./list-system-admins.component.scss']
// })
// export class ListSystemAdminsComponent implements OnInit, OnDestroy {
//   @Input() formData: any;


//   loading: boolean = false;
//   rows: any = [];
//   filteredRows: any = [];
//   defaultNavActiveId = 1;
//   allRecords: any;
//   title: string = "System Admins";
//   actions = ["View", "Edit", "Delete", "Activate"];
//   totalRecords: number = 0;
//   subs: Subscription[] = [];
//   profilesList: any[] = [];
//   channelOptions: any[] = [];
//   viewedAgent: any;
//   form: any;
//   isLoading!: boolean;

//   public modalRef!: NgbModalRef;
//   httpService: any;

//   columns = [
//     { name: "#", prop: "frontendId" },
//     { name: "First Name", prop: "firstName" },
//     { name: "Middle Name", prop: "middleName" },
//     { name: "Last Name", prop: "lastName" },
//     { name: "Email", prop: "email" },
//     { name: "National ID", prop: "nationalId" },
//     { name: "Phone No", prop: "phoneNo" },
//     { name: "Agency Name", prop: "agencyName" },
//     { name: "Emergency Contact", prop: "emergencyContact" },
//     { name: "Actions", prop: "actions" },
//   ];

//   allColumns = [...this.columns];
//   admin$: Observable<any> = of([]);

//   constructor(
//     private modalService: NgbModal,
//     private toastr: ToastrService,
//     private router: Router,
//   ) { }

//   ngOnInit() {
//     this.rows = []; // Set rows to an empty array
//   }

//   ngOnDestroy(): void {
//     this.subs.forEach((sb) => sb.unsubscribe());
//   }

//   updateColumns(updatedColumns: any) {
//     this.columns = [...updatedColumns];
//   }

//   triggerEvent(data: string) {
//     let eventData = JSON.parse(data);
//     this.viewedAgent = eventData["row"]["id"];

//     if (eventData.action == "View") {
//       this.router.navigate([`/agents/view-agent/${this.viewedAgent}`]);
//     } else if (eventData.action == "Activate") {
//       this.activateAgent(eventData.row);
//     } else if (eventData.action == "Edit") {
//       // Edit functionality
//     } else if (eventData.action == "Delete") {
//       this.disableAgent(eventData.row);
//     }
//   }

//   disableAgent(row: any) {
//     throw new Error("Method not implemented.");
//   }

//   updateFilteredRowsEvent(data: string) {
//     this.filteredRows = data;
//   }

//   activateAgent(row: any) {
//     this.modalRef = this.modalService.open(AssignProfileDialogComponent, {
//       centered: true,
//     });
//     this.modalRef.componentInstance.title = `Activate Agent`;
//     this.modalRef.componentInstance.buttonLabel = `Activate Agent`;
//     this.modalRef.componentInstance.formData = row;
//     this.modalRef.componentInstance.body = `Do you want to activate this Agent?`;
//     this.modalRef.result.then((result) => {
//       if (result?.status === "success") {
//         this.isLoading = true;

//         let model = {
//           agentId: row.id,
//           profileId: result?.profileId,
//           channel: "APP",
//         };

//         this.httpService
//           .postReq("portal/api/v1/systemuser/make/agent/systemuser", model)
//           .subscribe((result: any) => {
//             if (result.status === 0) {
//               this.toastr.success("Agent activation successfully", "Success");
//             } else {
//               this.toastr.error(result?.message, "Error");
//             }
//           });
//       }
//     });
//   }

//   searchResultUniversal(event: any) {
//     const filteredData = this.allRecords?.filter((item: any) => {
//       return Object.values(item)?.some((value: any) => {
//         let str = value + "";
//         return str?.toLowerCase()?.includes(event?.toLowerCase());
//       });
//     });

//     this.admin$ = of(filteredData);
//   }

//   searchResultByDate(event: any) {
//     const filteredData = this.allRecords.filter((item: any) => {
//       const createdOnDate = new Date(item.createdOn);
//       return (
//         createdOnDate >= event?.startDate && createdOnDate <= event?.endDate
//       );
//     });
//     this.admin$ = of(filteredData);
//   }

//   openEditSystemAdminModal(formData: any) {
//     const modalRef = this.modalService.open(EditSystemAdminComponent, {
//       centered: true,
//       backdrop: 'static'
//     });
//     modalRef.componentInstance.formData = formData;

//     modalRef.result.then((result) => {
//       if (result.status === 'success') {
//         // Handle the success result
//       }
//     }).catch((error) => {
//       console.log(error);
//     });
//   }
// }

import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { Observable, of, Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { AssignProfileDialogComponent } from "src/app/shared/components/assign-profile-dialog/assign-profile-dialog.component";
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
  defaultNavActiveId = 1;
  allRecords: any;
  title: string = "System Admins";
  actions = ["View", "Edit", "Delete", "Activate"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  profilesList: any[] = [];
  channelOptions: any[] = [];
  viewedAgent: any;
  form: any;
  isLoading!: boolean;

  public modalRef!: NgbModalRef;
  httpService: any;

  columns = [
    { name: "#", prop: "frontendId" },
    { name: "First Name", prop: "firstName" },
    { name: "Middle Name", prop: "middleName" },
    { name: "Last Name", prop: "lastName" },
    { name: "Email", prop: "email" },
    { name: "National ID", prop: "nationalId" },
    { name: "Phone No", prop: "phoneNo" },
    { name: "Agency Name", prop: "agencyName" },
    { name: "Emergency Contact", prop: "emergencyContact" },
    { name: "Actions", prop: "actions" },
  ];

  allColumns = [...this.columns];
  admin$: Observable<any> = of([]);

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.generateDummyData();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  generateDummyData() {
    this.rows = [
      {
        frontendId: 1,
        firstName: 'John',
        middleName: 'A.',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        nationalId: '123456789',
        phoneNo: '123-456-7890',
        agencyName: 'Agency 1',
        emergencyContact: '987-654-3210',
        actions: ''
      },
      {
        frontendId: 2,
        firstName: 'Jane',
        middleName: 'B.',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        nationalId: '987654321',
        phoneNo: '234-567-8901',
        agencyName: 'Agency 2',
        emergencyContact: '876-543-2109',
        actions: ''
      },
      {
        frontendId: 3,
        firstName: 'Alice',
        middleName: 'C.',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        nationalId: '123789456',
        phoneNo: '345-678-9012',
        agencyName: 'Agency 3',
        emergencyContact: '765-432-1098',
        actions: ''
      },
      {
        frontendId: 4,
        firstName: 'Bob',
        middleName: 'D.',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
        nationalId: '789456123',
        phoneNo: '456-789-0123',
        agencyName: 'Agency 4',
        emergencyContact: '654-321-0987',
        actions: ''
      }
    ];

    this.filteredRows = [...this.rows];
    this.admin$ = of(this.rows);
    this.allRecords = this.rows;
    this.totalRecords = this.rows.length;
  }

  updateColumns(updatedColumns: any) {
    this.columns = [...updatedColumns];
  }

  triggerEvent(data: string) {
    let eventData = JSON.parse(data);
    this.viewedAgent = eventData["row"]["id"];

    if (eventData.action == "View") {
      this.router.navigate([`/agents/view-agent/${this.viewedAgent}`]);
    } else if (eventData.action == "Activate") {
      this.activateAgent(eventData.row);
    } else if (eventData.action == "Edit") {
      this.openEditSystemAdminModal(eventData.row); // Open edit modal with data
    } else if (eventData.action == "Delete") {
      this.disableAgent(eventData.row);
    }
  }

  disableAgent(row: any) {
    throw new Error("Method not implemented.");
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }

  activateAgent(row: any) {
    this.modalRef = this.modalService.open(AssignProfileDialogComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.title = `Activate Agent`;
    this.modalRef.componentInstance.buttonLabel = `Activate Agent`;
    this.modalRef.componentInstance.formData = row;
    this.modalRef.componentInstance.body = `Do you want to activate this Agent?`;
    this.modalRef.result.then((result) => {
      if (result?.status === "success") {
        this.isLoading = true;

        let model = {
          agentId: row.id,
          profileId: result?.profileId,
          channel: "APP",
        };

        this.httpService
          .postReq("portal/api/v1/systemuser/make/agent/systemuser", model)
          .subscribe((result: any) => {
            if (result.status === 0) {
              this.toastr.success("Agent activation successfully", "Success");
            } else {
              this.toastr.error(result?.message, "Error");
            }
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
        // Handle the success result
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}
