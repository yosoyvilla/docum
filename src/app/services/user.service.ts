import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
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

  uploadFile(fileJson: any): Observable<any> {
    const options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Content-Type', 'application/json');
    return this.http.post(Env.serverurl + "user/uploadfile.php", JSON.stringify(fileJson), options);
  }

  update(id, rut, email, uname, uphone): Observable<any> {
    return this.http.get(
      Env.serverurl +
        "user/updatebyid.php?email=" +
        email +
        "&rut=" +
        rut +
        "&uname=" +
        uname +
        "&uphone=" +
        uphone +
        "&id=" + id
    );
  }

  updateMyUser(id, email, uname, uphone, pwd): Observable<any> {
    return this.http.get(
      Env.serverurl +
        "user/updatemyuserbyid.php?email=" +
        email +
        "&pwd=" +
        pwd +
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

  changeutype(id, type): Observable<any> {
    return this.http.get(
      Env.serverurl +
        "user/changeutype.php?id=" +
        id +
        "&utype=" +
        type
    );
  }

  register(rut, email, pwd, uname, uphone): Observable<any> {
    return this.http.get(
      Env.serverurl +
        "user/create.php?email=" +
        email +
        "&rut=" +
        rut +
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

  getOneByRut(rut: string): Observable<IUser[]> {
    return this.http.get(
      Env.serverurl +
        "user/read_by_rut.php?rut=" +
        rut
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
