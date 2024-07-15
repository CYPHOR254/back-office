import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {GlobalServService} from "../services/global-serv.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class CheckTokenValidityInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private toastrService: ToastrService,
              private globalService: GlobalServService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isTokenValid()) {
      // this.toastrService.warning('Logging you out', 'Your Token is expired');
      // here remove the auth token
      localStorage.clear();
      this.router.navigate(['/login']);
    } else {
    }
    return next.handle(req);
  }

  isTokenValid() {
    const helper = new JwtHelperService();

    if (!this.globalService.getToken()) {
      console.log("No token available");
      return false;
    } else if (this.globalService.getToken() && helper.isTokenExpired(this.globalService.getToken())){

      // send refresh to backend
      // receive new access
      // update local storage
      // this.isTokenValid();

      return false;
    } else {
      return true;
    }
  }
}
