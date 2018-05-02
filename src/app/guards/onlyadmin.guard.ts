import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IToken } from '../models/token';
import { of } from 'rxjs/observable/of';

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  _isLogged: IToken;
  constructor(private userService: UserService, private router: Router) {};

  canActivate() {
    return localStorage.getItem("usertype") === "Administrador";
  }
}

