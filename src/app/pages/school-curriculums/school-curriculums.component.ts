import { Component, OnInit } from '@angular/core';
import { ApiService ,Curriculum } from 'src/app/api.service';

@Component({
  selector: 'app-school-curriculums',
  templateUrl: './school-curriculums.component.html',
  styleUrls: ['./school-curriculums.component.scss']
})
export class SchoolCurriculumsComponent implements OnInit {
  curriculums: Curriculum[] = [];
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentCurriculum: Curriculum = { curriculumId: 0, curriculum: '' };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchCurriculums();
  }

  fetchCurriculums(): void {
    this.apiService.getCurriculums().subscribe((data) => {
      this.curriculums = data;
    });
  }

  openAddModal(): void {
    this.showModal = true;
    this.isEditMode = false;
    this.currentCurriculum = { curriculumId: 0, curriculum: '' };
  }

  openEditModal(curriculum: Curriculum): void {
    this.showModal = true;
    this.isEditMode = true;
    this.currentCurriculum = { ...curriculum };
  }

  closeModal(): void {
    this.showModal = false;
  }

  addCurriculum(): void {
    this.apiService.addCurriculum(this.currentCurriculum).subscribe(
      (data) => {
        this.curriculums.push(data);
        this.closeModal();
      },
      (error) => {
        console.error('Error adding curriculum', error);
      }
    );
  }

  updateCurriculum(): void {
    if (this.currentCurriculum.curriculumId) {
      this.apiService.updateCurriculum(this.currentCurriculum.curriculumId, this.currentCurriculum).subscribe(
        (data) => {
          const index = this.curriculums.findIndex(c => c.curriculumId === this.currentCurriculum.curriculumId);
          if (index !== -1) {
            this.curriculums[index] = data;
          }
          this.closeModal();
        },
        (error) => {
          console.error('Error updating curriculum', error);
        }
      );
    } else {
      console.error('Curriculum ID is undefined');
    }
  }

  deleteCurriculum(curriculumId: number): void {
    this.apiService.deleteCurriculum(curriculumId).subscribe(
      () => {
        this.curriculums = this.curriculums.filter(c => c.curriculumId !== curriculumId);
      },
      (error) => {
        console.error('Error deleting curriculum', error);
      }
    );
  }
}
