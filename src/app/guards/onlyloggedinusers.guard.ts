import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IToken } from '../models/token';
import { of } from 'rxjs/observable/of';

@Injectable()
export class OnlyloggedinusersGuard implements CanActivate {
  _isLogged: IToken;
  constructor(private userService: UserService, private router: Router) {};

  canActivate() {
    return this.isLogged().then(isLogged => {
      if(isLogged === true){
        return true;
      }else{
        this.router.navigate(["/login"]);
        return false;
      }
    });
  }

  isLogged(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.isLoggedIn().subscribe(isLoggedResponse => {
        resolve(isLoggedResponse.token !== null && isLoggedResponse.token === localStorage.getItem("token"));
      });
    });
  }
}
