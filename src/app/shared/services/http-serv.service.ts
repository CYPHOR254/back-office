import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalServService } from './global-serv.service';

@Injectable({
  providedIn: 'root',
})
export class HttpServService {
  fetchData(page: number, pageSize: number) {
    throw new Error("Method not implemented.");
  }
  private userRolesSource = new BehaviorSubject<any>([]);
  public userRoles$ = this.userRolesSource.asObservable();
  constructor(
    private http: HttpClient,
    private globalService: GlobalServService
  ) {}

  public updateRoles(roles: any) {
    this.userRolesSource.next(roles);
  }

  public loginReq(endpoint: string, model: any): Observable<any> {
    return this.http.post(this.globalService.authHost + endpoint, model, {
      headers: this.generateLoginHeaders()
    });
  }
  // login(payload: { username: string; password: string; channel: string }): Observable<any> {
  //   return this.http.post<{ status: number; message: string; data: any }>(`${this.authUrl}/login`, payload);
  // }
  
  public postReq(endpoint: string, model: any): Observable<any> {
    return this.http.post(this.globalService.apiHost + endpoint, model, { headers: this.generateGeneralHeaders() });
  }

  public postReqBasic(endpoint: string, model: any): Observable<any> {
    return this.http.post(this.globalService.apiHost + endpoint, model, { headers: this.generateLoginHeaders() });
  }

  public getReq(endpoint: string): Observable<any> {
    return this.http.get(this.globalService.apiHost + endpoint, { headers: this.generateGeneralHeaders() });
  }

  public postReqForImage(endpoint: string, model: any): Observable<ArrayBuffer> {
    return this.http.post(this.globalService.apiHost + endpoint, model, { headers: this.generateGeneralHeaders(), responseType: "arraybuffer" });
  }

  public postFormReq(endpoint: string, model: any): Observable<any> {
    return this.http.post(this.globalService.apiHost + endpoint, model, { headers: this.getFormHeaders() });
  }

  private generateLoginHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Basic '+ btoa('ADMIN_PORTAL' + ':' +'IZr6RTu6n}k;@'),
    });
  }

  private generateGeneralHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.globalService.getToken(),

    });
  }
  private getFormHeaders(): HttpHeaders {
    return new HttpHeaders({

      Authorization: 'Bearer ' + this.globalService.getToken(),
    });
  }
}
