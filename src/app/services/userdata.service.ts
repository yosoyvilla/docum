import { Injectable } from '@angular/core';

@Injectable()
export class UserdataService {

  userData: any;

  add(data: any) {
    this.userData = data;
  }

  get(){
    return this.userData;
  }

}
