import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {GlobalServService} from "../services/global-serv.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private globalService: GlobalServService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    
    if (this.globalService.isLoggedIn()) {
      return true;
    } else {
      localStorage.clear();
      this.globalService.redirectUrl = state.url;
      this.router.navigate(['/login'])
      return false;
    }
  }
}
