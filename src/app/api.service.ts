import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Agent {
  agentId: number;
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
  resource: string;
  agreementStartDate: Date;
  agreementEndDate: Date;
}

export interface systemAdmins {
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
export interface Category {
  schoolId: number;
  categoryId: number;
  category: string;
}
export interface SchoolType {
  schoolTypeId: number;
  name: string | null;
}
export interface Curriculum {
  curriculumId: number;
  curriculum: string;
}
export interface Resource {
  resourceId: number;
  resource: string;
}
export interface Subject {
  subject: string;
}

export interface TeacherSubjectsResponse {
  statusCode: number;
  statusMessage: string;
  result: {
    subjectTeacherDTOList: Subject[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://destined-prawn-thoroughly.ngrok-free.app/v1'; // Adjust base URL as per your environment
  private authUrl = 'https://destined-prawn-thoroughly.ngrok-free.app/v1';
  constructor(private http: HttpClient) { }

  // Authentication and User Management

  login(payload: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.post<{ status: number; message: string; data: any }>(`${this.authUrl}/user/all/login`, payload, { headers });
  }

  getSystemAdmins(): Observable<any> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/eduAdmin/admins`, { headers });
  }

  addSystemAdmins(user: systemAdmins): Observable<systemAdmins> {
    return this.http.post<{ statusCode: number, statusMessage: string, result: systemAdmins }>(`${this.baseUrl}/user/all/register`, user)
      .pipe(map(response => response.result));
  }

  updateSystemAdmin(adminId: number, user: systemAdmins): Observable<systemAdmins> {
    return this.http.put<{ statusCode: number, statusMessage: string, result: systemAdmins }>(`${this.baseUrl}/eduAdmin/admin/${adminId}`, user)
      .pipe(map(response => response.result));
  }

  deleteSystemAdmin(adminId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eduAdmin/admin/${adminId}`);
  }

  // Agent Management

  getAgents(): Observable<any> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/eduAdmin/agents`, { headers });

  }

  addAgent(agent: Agent): Observable<Agent> {
    return this.http.post<{ statusCode: number, statusMessage: string, result: Agent }>(`${this.baseUrl}/user/all/register`, agent)
      .pipe(map(response => response.result));
  }

  getAgentById(agentId: number): Observable<any> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/eduAdmin/agent/${agentId}`, { headers });
  }

  getSchoolsAddedByAgent(agentId: number): Observable<any> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/agent/agent/${agentId}/schools-per-agent`, { headers });
  }
  
  updateAgent(agentId: number, agent: Agent): Observable<Agent> {
    return this.http.put<{ statusCode: number, statusMessage: string, result: Agent }>(
      `${this.baseUrl}/eduAdmin/update-agent/${agentId}`, agent)
      .pipe(map(response => response.result));
  }
  



  deleteAgent(agentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eduAdmin/agent/${agentId}`);
  }

  // Partner Management

  getPartners(): Observable<Partner[]> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/eduAdmin/partners`, { headers });

  }

  getPartnerById(partnerId: number): Observable<any> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/eduAdmin/partner/${partnerId}`, { headers });
  }
  addPartner(partner: Partner): Observable<Partner> {
    return this.http.post<{ statusCode: number, statusMessage: string, result: Partner }>(`${this.baseUrl}/user/all/register`, partner)
      .pipe(map(response => response.result));
  }

  updatePartner(partnerId: number, partner: Partner): Observable<Partner> {
    return this.http.put<{ statusCode: number, statusMessage: string, result: Partner }>(
      `${this.baseUrl}/eduAdmin/partner/${partnerId}`,
      partner
    ).pipe(map(response => response.result));
  }

  deletePartner(partnerId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eduAdmin/del-partner/${partnerId}`);
  }
  // http://localhost:8080/v1/schAdmin/all-students
  getStudents(): Observable<Teacher[]> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/schAdmin/all-students`, { headers });
  }

  getStudentById(studentId: number): Observable<any> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/schAdmin/student/${studentId}`, { headers });
  }
 
  deleteStudent(teacherId: number): Observable<void> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.delete<void>(`${this.baseUrl}/schAdmin/del-student/${teacherId}`, { headers });
  }
  // Teacher Management

  getTeachers(): Observable<Teacher[]> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/schAdmin/teachers`, { headers });
  }
  
  getTeacherById(teacherId: number): Observable<any> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/schAdmin/student/${teacherId}`, { headers });
  }

  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<{ statusCode: number, statusMessage: string, result: Teacher }>(`${this.baseUrl}/user/all/register`, teacher)
      .pipe(map(response => response.result));
  }

  updateTeacher(teacherId: number, teacher: Teacher): Observable<Teacher> {
    return this.http.put<{ statusCode: number, statusMessage: string, result?: Teacher }>(`${this.baseUrl}/schAdmin/teacher/${teacherId}`, teacher)
      .pipe(
        map(response => {
          if (response.statusCode === 200 && response.result) {
            return response.result;
          } else {
            throw new Error('Failed to update teacher');
          }
        })
      );
  }

  deleteTeacher(teacherId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/schAdmin/delete-teacher/${teacherId}`);
  }
  // Category Management 
  getCategories(): Observable<Category[]> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/agent/category`, { headers });
  }
  getResources(): Observable<Resource[]> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/eduAdmin/resources`, { headers });
  }

  // fetch meniu codes

  getMenuOutline(): Observable<Curriculum[]> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/agent/menu-codes`, { headers });
  }
  // Curriculum Management 

  getCurriculums(): Observable<Curriculum[]> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/agent/curriculums`, { headers });
  }

  getSchoolGenders(): Observable<any> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/agent/school-gender`, { headers });
  }
  addCurriculum(curriculum: { curriculum: string }): Observable<Curriculum> {
    return this.http.post<{ statusCode: number, statusMessage: string, result: Curriculum }>(`${this.baseUrl}/agent/add-curriculum`, curriculum)
      .pipe(map(response => response.result));
  }

  updateCurriculum(curriculumId: number, updatedCurriculum: { curriculum: string }): Observable<Curriculum> {
    return this.http.put<{ statusCode: number, statusMessage: string, result: Curriculum }>(`${this.baseUrl}/agent/update-curriculum/${curriculumId}`, updatedCurriculum)
      .pipe(map(response => response.result));
  }

  deleteCurriculum(curriculumId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/agent/delete-curriculum/${curriculumId}`);
  }

  // School Type Management

  getSchoolTypes(): Observable<SchoolType[]> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/agent/school-type`, { headers });
  }

  addSchoolType(schoolType: { name: string }): Observable<SchoolType> {
    return this.http.post<{ statusCode: number, statusMessage: string, result: SchoolType }>(`${this.baseUrl}/agent/add-school-type`, schoolType)
      .pipe(map(response => response.result));
  }

  updateSchoolType(schoolTypeId: number, updatedSchoolType: { name: string }): Observable<SchoolType> {
    return this.http.put<{ statusCode: number, statusMessage: string, result: SchoolType }>(`${this.baseUrl}/agent/update-school-type/${schoolTypeId}`, updatedSchoolType)
      .pipe(map(response => response.result));
  }

  deleteSchoolType(schoolTypeId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/agent/delete-school-type/${schoolTypeId}`);
  }

  getSchools(): Observable<any> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/agent/schools`, { headers });
  }
  getRejected(): Observable<any> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/agent/approved-schools`, { headers });
  }

  getSchoolById(schoolId: number): Observable<any> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<any>(`${this.baseUrl}/agent/school/${schoolId}`, { headers });
  }

  addSchool(schoolData: FormData): Observable<any> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true')
    return this.http.post<{ statusCode: number, statusMessage: string, result: any }>(
      `${this.baseUrl}/agent/school`, schoolData, { headers }
    ).pipe(map(response => response.result));
  {}}

  updateSchool(schoolId: number, updatedSchoolData: any): Observable<any> {
    return this.http.put(`/api/schools/${schoolId}`, updatedSchoolData);
  }

  deleteSchool(schoolId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/agent/schools/${schoolId}`);
  }

  // Guardian Management

  getGuardians(): Observable<Guardian[]> {
    return this.http.get<{ statusCode: number, statusMessage: string, result: Guardian[] }>(`${this.baseUrl}/schAdmin/guardians`)
      .pipe(map(response => response.result));
  }

  addGuardian(guardian: Guardian): Observable<Guardian> {
    return this.http.post<{ statusCode: number, statusMessage: string, result: Guardian }>(`${this.baseUrl}/schAdmin/add-guardian`, guardian)
      .pipe(map(response => response.result));
  }

  updateGuardian(guardianId: number, guardian: Guardian): Observable<Guardian> {
    return this.http.put<{ statusCode: number, statusMessage: string, result: Guardian }>(`${this.baseUrl}/schAdmin/update-guardian/${guardianId}`, guardian)
      .pipe(map(response => response.result));
  }

  deleteGuardian(guardianId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/schAdmin/delete-guardian/${guardianId}`);
  }

  getTeacherSubjects(teacherId: number): Observable<TeacherSubjectsResponse> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<TeacherSubjectsResponse>(`${this.baseUrl}/schAdmin/teacher/${teacherId}/subjects` , { headers });
  }

  assignSubjectToTeacher(teacherId: number, subject: string): Observable<any> {
    // Replace with your actual API endpoint and method
    return this.http.post<any>(`/api/teacher/${teacherId}/subjects`, { subject });
  }
  
}
