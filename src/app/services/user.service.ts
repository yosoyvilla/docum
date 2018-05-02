import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Env } from "../../enums/environments";
import { of } from "rxjs/observable/of";
import "rxjs/Rx";
import { Subscription } from "rxjs/Subscription";
import { IToken } from "../models/token";
import { IUser } from '../models/user';

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  isLoggedIn(): Observable<IToken> {
    return this.http
      .get(
        Env.serverurl +
          "user/getToken.php?rut=" +
          localStorage.getItem("rut")
      )
      .map((response: Response) => {
        return <IToken>response.json();
      })
      .catch(this.handleError);
  }

  logIn(rut: string, password: string): Observable<IUser> {
    return this.http.get(
      Env.serverurl +
        "user/read_one.php?rut=" +
        rut +
        "&password=" +
        password
    ).map((response: Response) => {
      return <IUser>response.json();
    })
    .catch(this.handleError);
  }

  update(id, email, uname, uphone): Observable<any> {
    return this.http.get(
      Env.serverurl +
        "user/updatebyid.php?email=" +
        email +
        "&uname=" +
        uname +
        "&uphone=" +
        uphone +
        "&id=" + id
    );
  }

  delete(id): Observable<any> {
    return this.http.get(
      Env.serverurl +
        "user/deletebyid.php?id=" +
        id
    );
  }

  register(email, pwd, uname, uphone): Observable<any> {
    return this.http.get(
      Env.serverurl +
        "user/create.php?email=" +
        email +
        "&pwd=" +
        pwd +
        "&uname=" +
        uname +
        "&uphone=" +
        uphone
    );
  }

  getAll(): Observable<IUser[]> {
    return this.http.get(
      Env.serverurl +
        "user/read_all.php"
    ).map((response: Response) => {
      return <IUser[]>response.json();
    })
    .catch(this.handleError);
  }

  setToken(rut, token): Observable<any> {
    return this.http.get(
      Env.serverurl +
        "user/setToken.php?rut=" +
        rut +
        "&token=" +
        token
    );
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
