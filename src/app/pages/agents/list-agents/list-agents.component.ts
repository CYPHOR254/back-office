import {
  Component,
  Input,
  OnInit,

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
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { AddAgentComponent } from "../add-agent/add-agent.component";
import { EditAgentComponent } from "../edit-agent/edit-agent.component";
import { UserActionsModalComponent } from "src/app/shared/components/user-actions-modal/user-actions-modal.component";
import { ApiService } from "../../../api.service"; // Adjust path based on your project structure

@Component({
  selector: "app-agents",
  templateUrl: "./list-agents.component.html",
  styleUrls: ["./list-agents.component.scss"],
})
export class ListAgentsComponent implements OnInit {
  public modalRef!: NgbModalRef;
  // @Input() title: any;
  @Input() formData: any;

  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  allRecords: any;
  title: string = "Agents";
  actions = ["View", "Edit", "Delete"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  profilesList: any[] = [];
  channelOptions: any[] = [];
  viewedAgent: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private apiService: ApiService // Adjust based on your actual service implementation

  ) {}


  columns = [
    {name: 'ID', prop: 'frontendId'},
    { name: "First Name", prop: "firstName" },
    { name: "Middle Name", prop: "middleName" },
    { name: "Last Name", prop: "lastName" },
    // { name: "Email", prop: "email" },
    // { name: "National ID", prop: "nationalId" },
    { name: "Phone Number", prop: "phoneNo" },
    { name: "Agency Name", prop: "agencyName" },
    {name: 'emergencyContact', prop: 'emergencyContact'},
    { name: "Actions", prop: "actions" },
  ];

  allColumns = [...this.columns];
  agentsList$: Observable<any> = of([]);
  
  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.fetchAgents(); // Fetch data on component initialization
  }

  fetchAgents() {
    this.loading = true;
    this.apiService.getAgents().pipe(
      catchError(error => {
        this.toastr.error('Failed to fetch agent admins', 'Error');
        this.loading = false;
        return of([]);
      })
    ).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.rows = response.result;
        this.filteredRows = this.rows;
        this.totalRecords = this.rows.length;
        this.toastr.success('Fetched agent admins successfully', 'Success');
      } else {
        this.toastr.error('Failed to fetch agent admins', 'Error');
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
      if (eventData.row && eventData.row.agentId) {
        this.viewedAgent = eventData.row.agentId;
        this.router.navigate([`/agents/view-agent/${this.viewedAgent}`]);
        console.log(this.viewedAgent, 'this is the Id');
      } else {
        console.error('School ID is undefined');
        this.toastr.error('Unable to view school. School ID is missing.', 'Error');
      }
    } else if (eventData.action === "Edit") {
      this.openEditModal(eventData.row);
    } else if (eventData.action === "Delete") {
      this.confirmDeleteAgent(eventData.row);
    }
  }
  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }
  addAgent() {
    this.modalRef = this.modalService.open(AddAgentComponent, {
      centered: true,
      animation: true,
    });
    this.modalRef.componentInstance.title = "Add Agent";
    this.modalRef.result.then(
      (result) => {
        if (result === "success") {
          // this.getIndividualData();
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
      }
      )
    }
    );
    
    this.agentsList$ = of(filteredData);
    
  }

  
  searchResultByDate(event: any) {
    const filteredData = this.allRecords.filter((item:any) => {
      const createdOnDate = new Date(item.createdOn);
      return createdOnDate >= event?.startDate && createdOnDate <= event?.endDate;
    });
    this.agentsList$ = of(filteredData);
    
  }
  openEditModal(formData: any) {
    const modalRef = this.modalService.open(EditAgentComponent, {
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.formData = formData;

    modalRef.result.then((result) => {
      if (result.status === 'success') {
        this.fetchAgents();
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  confirmDeleteAgent(row: any) {
    if (confirm(`Are you sure you want to delete ${row.firstName} ${row.lastName}?`)) {
      this.deleteAgent(row.agentId);
    }
  }
  deleteAgent(agentId: number) {
    this.apiService.deleteAgent(agentId).subscribe(
      () => {
        this.toastr.success('agent admin deleted successfully', 'Success');
        this.fetchAgents(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting agent admin:', error);
        if (error.status === 403) {
          this.toastr.error('Permission denied to delete agent admin', 'Error');
        } else {
          this.toastr.error('Failed to delete agent admin', 'Error');
        }
      }
    );
  }
}
