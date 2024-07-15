import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-custom-table-filter',
  templateUrl: './custom-table-filter.component.html',
  styleUrls: ['./custom-table-filter.component.scss']
})
export class CustomTableFilterComponent implements OnInit {

  @Input() showFilterOnly = false;
  @Input() hideFilterBtn = false;
  @Input() filterState: any;
  @Input() activePageSubject: BehaviorSubject<number>;
  @Input() filterBtnSubject: BehaviorSubject<any>;
  @Input() filterListSubject: BehaviorSubject<any>;
  @Input() elementsPerPage: number = 10;
  @Input() filterShow: boolean = false;
  @Input() exportConfig!: ExportConfig;

  @Output() filterData: EventEmitter<any> = new EventEmitter();
  @Output() filterSearch: EventEmitter<string> = new EventEmitter();
  @Output() filterActivePage: EventEmitter<any> = new EventEmitter();
  @Output() filterElementsPerPage: EventEmitter<any> = new EventEmitter();
  @Output() exportPdfEmitter: EventEmitter<any> = new EventEmitter();
  @Output() exportXlsxEmitter: EventEmitter<any> = new EventEmitter();
  @Output() exportEmitter: EventEmitter<any> = new EventEmitter();
  @Output() filterFormChanges: EventEmitter<any> = new EventEmitter();

  filterList!: FilterInput[];
  filterForm: FormGroup;
  filterDisableBtn = false;
  showExporting = false;

  constructor() {
    this.filterListSubject = new BehaviorSubject(null);
    this.filterBtnSubject = new BehaviorSubject(false);
    this.activePageSubject = new BehaviorSubject(1);

    if (this.showFilterOnly) {
      this.filterForm = new FormGroup({});
    } else {
      this.filterForm = new FormGroup({
        search: new FormControl(),
        activePage: new FormControl(1),
        elementsPerPage: new FormControl(this.elementsPerPage),
      });
    }
  }

  ngOnInit(): void {
    // setup filter formgroup
    this.filterListSubject.subscribe((val: FilterInput[]) => {
      if (val) {
        this.filterList = val;
        this.createFormGroup(this.filterList);
        this.initializeFilters(this.filterState);
      }
    });

    // update disable load btn
    this.filterBtnSubject.subscribe(val => {
      this.filterDisableBtn = val;
    });

    if (this.showFilterOnly) {
      this.filterShow = this.showFilterOnly;
    } else {
      // initialize active page
      this.activePageSubject.subscribe(val => {
        this.customFormControl('activePage', this.filterForm).setValue(val);
        this.filterActivePage.emit(this.removeNull(this.filterForm.value));
      });

      // emit search string
      this.customFormControl('search', this.filterForm).valueChanges.subscribe(val => {
        this.filterSearch.emit(val);
      });

      // emit search string
      this.customFormControl('elementsPerPage', this.filterForm).valueChanges.subscribe(val => {
        this.filterElementsPerPage.emit(this.removeNull({ ...this.filterForm.value, elementsPerPage: val }));
      });
    }

    // exporting status
    this.exportConfig?.exporting.subscribe(val => {
      this.showExporting = val;
    });

  }

  initializeFilters(data: any): void {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        this.customFormControl(key, this.filterForm)?.setValue(data[key]);
      }
    }
  }

  createFormGroup(filterList: FilterInput[]): void {
    filterList.forEach((input: FilterInput) => {
      this.filterForm.addControl(input.filterControl, new FormControl(null, input.required ? Validators.required : undefined));
    });
    this.filterFormChanges.emit(this.filterForm);
  }

  removeNull(data: any): any {
    const temp: any = {};
    for (const m of Object.keys(data)) {
      if (data[m] !== null) {
        temp[m] = data[m];
      }
    }
    return temp;
  }

  customFormControl(name: string, group: FormGroup): FormControl {
    return group.get(name) as FormControl;
  }

  loadData(): void {
    this.filterData.emit(this.removeNull(this.filterForm.value));
    if (!this.showFilterOnly) {
      this.filterShow = this.filterShow;
    }
  }

  toggleFilterShow(): void {
    this.filterShow = !this.filterShow;
  }

  clearFilters(): void {
    this.filterForm?.reset();
    this.customFormControl('search', this.filterForm).reset('');
    this.customFormControl('elementsPerPage', this.filterForm).reset(10);
    this.customFormControl('activePage', this.filterForm).reset(1);
    this.filterData.emit(this.removeNull(this.filterForm.value));
  }

  onExportingPdf(): void {
    this.exportPdfEmitter.emit('exportPDF');
    this.exportEmitter.emit('pdf');
  }

  onExportingXlsx(): void {
    this.exportXlsxEmitter.emit('exportXLSX');
    this.exportEmitter.emit('xls');
  }

}

export interface FilterInput {
  filterType: FilterType;
  filterLabel: string;
  filterControl: string;
  required?: boolean;
}

export interface FilterType {
  type: string;
  optionList?: BehaviorSubject<any>;
  optionsPredicate?: any;
  singleDate?: boolean;
  selectSearched?: boolean;
  multiSelect?: boolean;
  placement?: string;
}

export interface ExportConfig {
  exportPdf: boolean;
  exportXlsx: boolean;
  exporting: BehaviorSubject<any>;
}
