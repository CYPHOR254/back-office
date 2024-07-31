import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-system-admin',
  templateUrl: './list-system-admin.component.html',
  styleUrls: ['./list-system-admin.component.css']
})
export class ListSystemAdminComponent implements OnInit {
  users = []; // Initialize with the data source
  loading = false;
  columns = []; // Define the columns
  actions = []; // Define the actions
  totalRecords = 0; // Define total records

  constructor() { }

  ngOnInit(): void {
    // Fetch or initialize users data here
  }

  triggerEvent(event: any) {
    // Handle custom table events here
  }

  updateFilteredRowsEvent(event: any) {
    // Handle filtered rows update here
  }

  addUser() {
    // Handle add user action here
  }

  searchResultUniversal(event: any) {
    // Handle search results event here
  }

  searchResultByDate(event: any) {
    // Handle filter by date event here
  }

  updateColumns(event: any) {
    // Handle column update event here
  }
}
