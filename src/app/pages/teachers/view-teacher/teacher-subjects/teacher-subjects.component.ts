import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../../../api.service'; // Adjust path based on your project structure

@Component({
  selector: 'app-teacher-subjects',
  templateUrl: './teacher-subjects.component.html',
  styleUrls: ['./teacher-subjects.component.scss']
})
export class TeacherSubjectsComponent implements OnInit {
  @Input() teacherId!: number;
  @ViewChild('subjectInput') subjectInput!: ElementRef;

  subjects: string[] = [];
  errorMessage: string = '';
  showAssignSubject: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchTeacherSubjects();
  }

  fetchTeacherSubjects(): void {
    this.apiService.getTeacherSubjects(this.teacherId).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this.subjects = response.result.subjectTeacherDTOList.map((dto: any) => dto.subject);
        } else {
          this.errorMessage = 'Failed to fetch subjects';
        }
      },
      (error) => {
        console.error('Error fetching subjects:', error);
        this.errorMessage = 'Error fetching subjects';
      }
    );
  }

  toggleAssignSubject(): void {
    this.showAssignSubject = !this.showAssignSubject;
  }

  assignSubject(subject: string): void {
    if (subject) {
      this.apiService.assignSubjectToTeacher(this.teacherId, subject).subscribe(
        (response) => {
          if (response.statusCode === 200) {
            this.subjects.push(subject);
            if (this.subjectInput) {
              this.subjectInput.nativeElement.value = '';
            }
            this.showAssignSubject = false;
          } else {
            this.errorMessage = 'Failed to assign subject';
          }
        },
        (error) => {
          console.error('Error assigning subject:', error);
          this.errorMessage = 'Error assigning subject';
        }
      );
    }
  }
}