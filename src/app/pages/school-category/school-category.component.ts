import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, SchoolType } from 'src/app/api.service'; // Adjust the path as necessary
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
import * as bootstrap from 'bootstrap'; // Ensure you have bootstrap installed
@Component({
  selector: 'app-school-category',
  templateUrl: './school-category.component.html',
  styleUrls: ['./school-category.component.scss']
})
export class SchoolCategoryComponent implements OnInit {
  schoolTypes: SchoolType[] = [];
  addSchoolTypeForm: FormGroup;
  editSchoolTypeForm: FormGroup;
  selectedSchoolType: SchoolType | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    this.addSchoolTypeForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.editSchoolTypeForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSchoolTypes();
  }

  loadSchoolTypes(): void {
    this.apiService.getSchoolTypes().subscribe(
      (data: SchoolType[]) => {
        this.schoolTypes = data;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching school types', error);
        this.toastr.error('Error fetching school types');
      }
    );
  }

  openAddSchoolTypeModal(): void {
    this.resetAddForm();
    this.openModal('addSchoolTypeModal');
  }

  resetAddForm(): void {
    this.addSchoolTypeForm.reset();
  }

  openEditSchoolTypeModal(schoolType: SchoolType): void {
    console.log('Opening edit modal for school type:', schoolType);
    this.selectedSchoolType = schoolType;
    this.editSchoolTypeForm.patchValue(schoolType);
    this.openModal('editSchoolTypeModal');
  }

  openModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  deleteSchoolType(id: number): void {
    console.log('Deleting school type with id:', id);
    if (confirm('Are you sure you want to delete this school type?')) {
      this.apiService.deleteSchoolType(id).subscribe(
        () => {
          console.log('School type deleted');
          this.schoolTypes = this.schoolTypes.filter(schoolType => schoolType.schoolTypeId !== id);
          this.toastr.success('School type deleted successfully');
        },
        (error) => {
          console.error('Error deleting school type', error);
          this.toastr.error('Error deleting school type');
        }
      );
    }
  }

  onAddSubmit(): void {
    if (this.addSchoolTypeForm.invalid) {
      return;
    }

    console.log('Adding school type:', this.addSchoolTypeForm.value);
    this.apiService.addSchoolType(this.addSchoolTypeForm.value).subscribe(
      (newSchoolType: SchoolType) => {
        console.log('School type added:', newSchoolType);
        this.schoolTypes.push(newSchoolType);
        this.toastr.success('School type added successfully');
        this.closeModal('addSchoolTypeModal');
      },
      (error) => {
        console.error('Error adding school type', error);
        this.toastr.error('Error adding school type');
      }
    );
  }

  onEditSubmit(): void {
    if (this.editSchoolTypeForm.invalid || !this.selectedSchoolType) {
      return;
    }

    const updatedSchoolType = { ...this.selectedSchoolType, ...this.editSchoolTypeForm.value };
    console.log('Submitting edit for school type:', updatedSchoolType);

    this.apiService.updateSchoolType(this.selectedSchoolType.schoolTypeId, updatedSchoolType).subscribe(
      (schoolType: SchoolType) => {
        const index = this.schoolTypes.findIndex(s => s.schoolTypeId === this.selectedSchoolType!.schoolTypeId);
        if (index !== -1) {
          this.schoolTypes[index] = schoolType;
        }
        this.toastr.success('School type updated successfully');
        this.closeModal('editSchoolTypeModal');
      },
      (error) => {
        console.error('Error updating school type', error);
        this.toastr.error('Error updating school type');
      }
    );
  }

  closeModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
}