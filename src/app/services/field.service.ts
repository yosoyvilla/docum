import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Env } from "../../enums/environments";
import { of } from "rxjs/observable/of";
import "rxjs/Rx";
import { Subscription } from "rxjs/Subscription";
import { IRent } from '../models/rent';
import { IDisp } from '../models/disps';
import { IField } from '../models/field';
import { IDI } from "../models/dispsInfo";

@Injectable()
export class FieldService {

  constructor(private http: Http) {}

  getAllRents(): Observable<IRent[]> {
    return this.http.get(
      Env.serverurl +
        "cancha/getAllRents.php"
    ).map((response: Response) => {
      return <IRent[]>response.json();
    })
    .catch(this.handleError);
  }

  getAllFields(): Observable<IField[]> {
    return this.http.get(
      Env.serverurl +
        "cancha/read_all.php"
    ).map((response: Response) => {
      return <IField[]>response.json().records;
    })
    .catch(this.handleError);
  }

  delete(id): Observable<any> {
    return this.http.get(
      Env.serverurl +
        "cancha/deletebyid.php?id=" +
        id
    );
  }

  update(id, name, description, capacity, value): Observable<any> {
    return this.http.get(
      Env.serverurl +
        "cancha/updatebyid.php?id=" +
        id +
        "&name=" + name +
        "&description=" + description +
        "&capacity=" + capacity +
        "&value=" + value
    );
  }

  create(name, description, capacity, value): Observable<any> {
    return this.http.get(
      Env.serverurl +
        "cancha/create.php?name=" + name +
        "&description=" + description +
        "&capacity=" + capacity +
        "&value=" + value
    );
  }

  deleteField(id): Observable<any> {
    return this.http.get(
      Env.serverurl +
        "cancha/deletefield.php?id=" +
        id
    );
  }

  rentField(idCancha, idUser, rentedTime, horario): Observable<any> {
    return this.http.get(
      Env.serverurl +
        "cancha/rentFieldAdmin.php?idCancha=" +
        idCancha +
        "&idUser='" + idUser +
        "'&rentedTime='" + rentedTime +
        "'&horario='" + horario + "'"
    );
  }

  obtenerDisponibilidades(idCancha: string, dtRent: string): Observable<IDisp[]> {
    return this.http.get(
      Env.serverurl + "cancha/getDisponibilidades.php?idCancha=" + idCancha + "&dtRent=" + dtRent
    ).map((response: Response) => {
      return <IDisp[]>response.json().records;
    })
    .catch(this.handleError);
  }

  obtenerCustomDisponibilidades(idCancha: string, dtRent: string): Observable<IDI[]> {
    return this.http.get(
      Env.serverurl + "cancha/getCustomdisp.php?idCancha=" + idCancha + "&dtRent=" + dtRent
    ).map((response: Response) => {
      return <IDI[]>response.json().records;
    })
    .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
