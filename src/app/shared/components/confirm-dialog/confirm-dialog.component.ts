import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-open-doc-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

    @Input() title: any;
    @Input() body: any;

    username: any;
    isLoading?: boolean;
    public errorMessages: any;
    public form!: FormGroup;


    constructor(
        public activeModal: NgbActiveModal,
    ) 
    {
    }

    ngOnInit() {

    }

    close() {
        this.activeModal.close();
    }

    submitData() {
        this.activeModal.close('success');
        this.isLoading = true;

    }
    
}
