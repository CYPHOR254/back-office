import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataExportService } from 'src/app/shared/services/data-export.service';

@Component({
  selector: 'app-custom-invoice-header',
  templateUrl: './custom-invoice-header.component.html',
  styleUrls: ['./custom-invoice-header.component.scss']
})
export class CustomInvoiceHeaderComponent {
  @Input() allColumns: any;
  @Input() rows: any;
  @Input() title: any;

  @Input() showAddButton: boolean = false;

  @Input() hideExtraOptions: boolean = false;
  columns: any;
  allColumnsChecked: boolean = true;
  initialColumnArrangement: any;

  @Output() toggleDropEvent = new EventEmitter<string>();
  @Output() changeColumnsEvent = new EventEmitter<string>();
  @Output() openVerifyModalEvent = new EventEmitter<string>();
  @Output() openRejectionModalEvent = new EventEmitter<string>();
  @Output() openApprovalModalEvent = new EventEmitter<string>();

  constructor(private dataExploration: DataExportService) {}

  ngOnInit() {
    this.columns = [...this.allColumns];
    this.initialColumnArrangement = [...this.allColumns];
  }

  toggle(col: any){
    const isChecked = this.isChecked(col);

    if (isChecked) {
      this.columns = this.columns.filter((c: any) => {
        return c.name !== col.name;
      });
    } else {
      this.columns = [...this.columns, col];
    }

    let common = this.initialColumnArrangement.filter(
      (col: any) => this.columns.indexOf(col) !== -1
    );
    this.columns = common;

    this.allColumnsChecked =
      this.columns.length == this.allColumns.length ? true : false;
    this.changeColumnsEvent.emit(this.columns);
  }

  isChecked(col: any) {
    return (
      this.columns.find((c: any) => {
        return c.name === col.name;
      }) !== undefined
    );
  }


  // openVerifyModal() {
  //   this.openVerifyModalEvent.emit();
  // }
  openApprovalModal() {
    this.openApprovalModalEvent.emit();
  }

  openRejectionModal() {
    this.openRejectionModalEvent.emit();
  }
}
