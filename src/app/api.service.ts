import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { id } from '@swimlane/ngx-datatable';

export interface Agent {
  agentId: number;  // Change this from 'id' to 'agentId'
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  nationalId: string;
  phoneNo: string;
  agencyName: string;
  emergencyContact: string;
}
export interface Guardian {
  guardianId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  nationalId: string;
  phoneNo: string;
  gender: string;
  nationality: string;
  relationship: string;
  occupation: string;
}
export interface Partner {
  partnerId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  nationalId: string;
  phoneNo: string;
  firmName: string;
  emergencyContact: string;
  businessContact: string;
  businessEmail: string;
  agreementStartDate: Date;
  agreementEndDate: Date;
}

export interface User {
  adminId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  nationalId: string;
  phoneNo: string;
  department: string;
  officePhoneNo: string | null;
  employmentNo: string;
}

export interface Teacher {
  teacherId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNo: string | null;
  nationalId: string;
  email: string;
  gender: string;
  nationality: string;
  dateOfBirth: string;
  tscNo: string | null;
  yearsOfExperience: number;
}

export interface Curriculum {
  curriculumId: number;
  curriculum: string;
}

export interface SchoolType {
  schoolTypeId: number;
  name: string | null;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://destined-prawn-thoroughly.ngrok-free.app/v1/eduAdmin';
  private schoolUrl = 'https://destined-prawn-thoroughly.ngrok-free.app/v1/schAdmin';
  private agentUrl = 'https://destined-prawn-thoroughly.ngrok-free.app/v1/agent';
  private authUrl = 'https://destined-prawn-thoroughly.ngrok-free.app/v1/auth';
  private schAdmin = 'https://destined-prawn-thoroughly.ngrok-free.app/v1/schAdmin';
  private schoolsUrl = 'https://destined-prawn-thoroughly.ngrok-free.app/v1/agent/schools';
  constructor(private http: HttpClient) {}

  login(payload: { username: string; password: string; channel: string }): Observable<any> {
    return this.http.post<{ status: number; message: string; data: any }>(`${this.authUrl}/login`, payload);
  }

  getSystemUsers(): Observable<User[]> {
    return this.http.get<{ statusCode: number, statusMessage: string, result: User[] }>(`${this.baseUrl}/admins`)
      .pipe(map(response => response.result));
  }

  addUser(user: User): Observable<User> {
    return this.http.post<{ statusCode: number, statusMessage: string, result: User }>(`${this.baseUrl}`, user)
      .pipe(map(response => response.result));
  }

  updateUser(adminId: number, user: User): Observable<User> {
    return this.http.put<{ statusCode: number, statusMessage: string, result: User }>(`${this.baseUrl}/admin/${adminId}`, user)
      .pipe(map(response => response.result));
  }

  deleteUser(adminId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${adminId}`);
  }
 
  getAgents(): Observable<Agent[]> {
    return this.http.get<{ statusCode: number, statusMessage: string, result: Agent[] }>(`${this.baseUrl}/agents`)
      .pipe(map(response => response.result));
  }

  addAgent(agent: Agent): Observable<Agent> {
    return this.http.post<{ statusCode: number, statusMessage: string, result: Agent }>(`${this.baseUrl}/add-agent`, agent)
      .pipe(map(response => response.result));
  }

  updateAgent(agentId: number, agent: Agent): Observable<Agent> {
    return this.http.put<{ statusCode: number, statusMessage: string, result: Agent }>(`${this.baseUrl}/update-agent/${agentId}`, agent)
      .pipe(map(response => response.result));
  }
  
  deleteAgent(agentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete-agent/${agentId}`);
  }

  getPartners(): Observable<Partner[]> {
    return this.http.get<{ statusCode: number, statusMessage: string, result: Partner[] }>(`${this.baseUrl}/partners`)
      .pipe(map(response => response.result));
  }

  addPartner(partner: Partner): Observable<Partner> {
    return this.http.post<{ statusCode: number, statusMessage: string, result: Partner }>(`${this.baseUrl}/partners`, partner)
      .pipe(map(response => response.result));
  }

  updatePartner(partnerId: number, partner: Partner): Observable<Partner> {
    return this.http.put<{ statusCode: number, statusMessage: string, result: Partner }>(`${this.baseUrl}/partner/${partnerId}`, partner)
      .pipe(map(response => response.result));
  }

  deletePartner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/partners/${id}`);
  }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<{ statusCode: number, statusMessage: string, result: Teacher[] }>(`${this.schoolUrl}/teachers`)
      .pipe(map(response => response.result));
  }

  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<{ statusCode: number, statusMessage: string, result: Teacher }>(`${this.schoolUrl}/teachers`, teacher)
      .pipe(map(response => response.result));
  }

  updateTeacher(teacherId: string, teacher: Teacher): Observable<Teacher> {
    console.log(teacherId);
    return this.http.put<{ statusCode: number, statusMessage: string, result: Teacher }>(`${this.schoolUrl}/teacher/${teacherId}`, teacher)
      .pipe(map(response => response.result));
  }


  deleteTeacher(teacherId: number): Observable<void> {
    return this.http.delete<void>(`${this.schoolUrl}/del-teacher/${teacherId}`);
  }

  getCurriculums(): Observable<Curriculum[]> {
    return this.http.get<{ statusCode: number, statusMessage: string, result: Curriculum[] }>(`${this.agentUrl}/curriculums`)
      .pipe(map(response => response.result));
  }

  addCurriculum(curriculum: { curriculum: string }): Observable<Curriculum> {
    return this.http.post<{ statusCode: number, statusMessage: string, result: Curriculum }>(`${this.agentUrl}/curriculum`, curriculum)
      .pipe(map(response => response.result));
  }

  updateCurriculum(curriculumId: number, updatedCurriculum: { curriculum: string }): Observable<Curriculum> {
    return this.http.put<{ statusCode: number, statusMessage: string, result: Curriculum }>(`${this.agentUrl}/curriculum/${curriculumId}`, updatedCurriculum)
      .pipe(map(response => response.result));
  }

  deleteCurriculum(curriculumId: number): Observable<void> {
    return this.http.delete<void>(`${this.agentUrl}/curriculum/${curriculumId}`);
  }

  getSchools(): Observable<any> {
    return this.http.get<any>(this.schoolsUrl);
  }
  getSchoolById():Observable<any>{
    return this.http.get<any>(`${this.schoolsUrl}/id`);
  }

  addSchool(school: any): Observable<any> {
    return this.http.post<any>(this.schoolsUrl, school);
  }

  updateSchool(moeRegistrationNo: string, school: any): Observable<any> {
    return this.http.put<any>(`${this.schoolsUrl}/${moeRegistrationNo}`, school);
  }

  deleteSchool(moeRegistrationNo: string): Observable<any> {
    return this.http.delete<any>(`${this.schoolsUrl}/${moeRegistrationNo}`);
  }

  getGuardians(): Observable<Guardian[]> {
    return this.http.get<{ statusCode: number, statusMessage: string, result: Guardian[] }>(`${this.schAdmin}/guardians`)
      .pipe(map(response => response.result));
  }

  addGuardian(guardian: Guardian): Observable<Guardian> {
    return this.http.post<{ statusCode: number, statusMessage: string, result: Guardian }>(`${this.schAdmin}/add-guardian`, guardian)
      .pipe(map(response => response.result));
  }


 
  updateGuardian(guardianId: number, guardian: Guardian): Observable<Guardian> {
    console.log(`Updating guardian with ID: ${guardianId}`); // Log the guardian ID
    console.log('Guardian data:', guardian); // Log the guardian data being sent
    return this.http.put<{ statusCode: number, statusMessage: string, result: Guardian }>(`${this.schAdmin}/guardian/${guardianId}`, guardian)
      .pipe(
        map(response => response.result),
        catchError(error => {
          console.error('Error in updateGuardian:', error); // Log any error
          return throwError(error);
        })
      );
  }
  

  deleteGuardian(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete-guardian/${id}`);
  }


  getSchoolTypes(): Observable<SchoolType[]> {
    return this.http.get<{ statusCode: number, statusMessage: string, result: SchoolType[] }>(`${this.agentUrl}/school-type`)
      .pipe(map(response => response.result));
  }

  addSchoolType(schoolType: { name: string }): Observable<SchoolType> {
    return this.http.post<{ statusCode: number, statusMessage: string, result: SchoolType }>(`${this.agentUrl}/school-type`, schoolType)
      .pipe(map(response => response.result));
  }

  updateSchoolType(schoolTypeId: number, updatedSchoolType: { name: string }): Observable<SchoolType> {
    return this.http.put<{ statusCode: number, statusMessage: string, result: SchoolType }>(`${this.agentUrl}/school-type/${schoolTypeId}`, updatedSchoolType)
      .pipe(map(response => response.result));
  }

  deleteSchoolType(schoolTypeId: number): Observable<void> {
    return this.http.delete<void>(`${this.agentUrl}/school-types/${schoolTypeId}`);
  }

}
