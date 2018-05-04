import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Env } from "../../enums/environments";
import { of } from "rxjs/observable/of";
import "rxjs/Rx";
import { Subscription } from "rxjs/Subscription";
import { IfileModel } from '../models/fileModel';

@Injectable()
export class DocumsService {

  constructor(private http: Http) { }

  getAll(): Observable<IfileModel[]> {
    return this.http.get(
      Env.serverurl +
        "docums/read_all.php"
    ).map((response: Response) => {
      return <IfileModel[]>response.json();
    })
    .catch(this.handleError);
  }

  getOneDocument(rut: string): Observable<IfileModel> {
    return this.http.get(
      Env.serverurl +
        "docums/read_one.php?rut=" +
        rut
    ).map((response: Response) => {
      return <IfileModel>response.json();
    })
    .catch(this.handleError);
  }

  getOneDocumentByID(id: string): Observable<IfileModel> {
    return this.http.get(
      Env.serverurl +
        "docums/read_one_id.php?id=" +
        id
    ).map((response: Response) => {
      return <IfileModel>response.json();
    })
    .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
