import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isAdmin: boolean = true;
  activeUser: string = "";

  constructor() { }

  ngOnInit() {
    this.activeUser = localStorage.getItem('name');
    this.isAdmin = localStorage.getItem("usertype") === "Administrador";
  }

}
