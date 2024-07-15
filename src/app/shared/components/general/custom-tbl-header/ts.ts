import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataExportService } from 'src/app/shared/services/data-export.service';

@Component({
  selector: 'app-custom-tbl-header',
  templateUrl: './custom-tbl-header.component.html',
  styleUrls: ['./custom-tbl-header.component.scss']
})
export class CustomTblHeaderComponent {
  @Input() allColumns: any[] = [];
  @Input() rows: any[] = [];
  @Input() title: string = '';
  @Input() showAddButton: boolean = false;
  @Input() hideExtraOptions: boolean = false;

  queryDate: any;
  startDate: any;
  endDate: any;
  todayDate: Date = new Date();

  columns: any[] = [];
  allColumnsChecked: boolean = true;
  initialColumnArrangement: any[] = [];

  @Output() toggleDropEvent = new EventEmitter<string>();
  @Output() changeColumnsEvent = new EventEmitter<any[]>(); // Update to emit an array of columns
  @Output() openAddModalEvent = new EventEmitter<void>(); // Update to emit no value
  @Output() searchResultsEvent = new EventEmitter<string>();
  @Output() filterDateEvent = new EventEmitter<any>();

  constructor(private dataExploration: DataExportService) {}

  ngOnInit() {
    this.columns = [...this.allColumns];
    this.initialColumnArrangement = [...this.allColumns];
  }

  toggle(col: any) {
    const isChecked = this.isChecked(col);

    if (isChecked) {
      this.columns = this.columns.filter((c: any) => c.name !== col.name);
    } else {
      this.columns = [...this.columns, col];
    }

    this.columns = this.initialColumnArrangement.filter(col => this.columns.includes(col));

    this.allColumnsChecked = this.columns.length === this.allColumns.length;
    this.changeColumnsEvent.emit(this.columns); // Emit array of columns
  }

  isChecked(col: any) {
    return this.columns.some(c => c.name === col.name);
  }

  checkAll() {
    this.columns = [...this.allColumns];
    this.changeColumnsEvent.emit(this.columns); // Emit array of columns
    this.allColumnsChecked = true;
  }

  uncheckAll() {
    if (this.columns.length === 0) {
      this.columns = [...this.allColumns];
      this.changeColumnsEvent.emit(this.columns); // Emit array of columns
      this.allColumnsChecked = true;
    } else {
      this.columns = [];
      this.changeColumnsEvent.emit(this.columns); // Emit array of columns
      this.allColumnsChecked = false;
    }
  }

  openAddItemModal() {
    this.openAddModalEvent.emit(); // Emit no value
  }

  searchResultsFunction(event: any) {
    this.searchResultsEvent.emit(event?.target?.value); // Emit search string
  }

  toggleDrop() {
    let checkList: HTMLElement = document.getElementById('list1')!;
    checkList.classList.toggle('visible');
  }

  exportCSV() {
    const cols = this.columns
      .map(item => item['name'].toLowerCase() !== 'actions' ? item['prop'] : '')
      .filter(item => item !== '');

    const arr = this.rows.map(row => {
      const temp: Record<string, string> = {};
      cols.forEach(key => temp[key] = row[key]);
      return temp;
    });

    this.dataExploration.exportToCsv(arr, this.title);
  }

  exportXLSX() {
    const cols = this.columns
      .map(item => item['name'].toLowerCase() !== 'actions' ? item['prop'] : '')
      .filter(item => item !== '');

    const arr = this.rows.map(row => {
      const temp: Record<string, string> = {};
      cols.forEach(key => temp[key] = row[key]);
      return temp;
    });

    this.dataExploration.exportDataXlsx(arr, this.title);
  }

  exportPDF() {
    console.log(this.rows);
    if (!Array.isArray(this.rows) || this.rows.length === 0) {
      console.error('No rows available for export.');
      return;
    }

    const cols = this.columns
      .map(item => item['name'].toLowerCase() !== 'actions' ? item['prop'].toUpperCase() : '')
      .filter(item => item !== '');

    const arr = this.rows.map(row => {
      const temp: string[] = [];
      cols.forEach(colKey => {
        Object.keys(row).forEach(key => {
          if (colKey === key.toUpperCase()) {
            temp.push(row[key]);
          }
        });
      });
      return temp;
    });

    this.dataExploration.exportToPdf(cols, arr, this.title);
  }

  getDate(event: any) {
    this.startDate = event[0];
    this.endDate = event[1];

    this.filterDateEvent.emit({
      'startDate': this.startDate,
      'endDate': this.endDate,
    });
  }
}
