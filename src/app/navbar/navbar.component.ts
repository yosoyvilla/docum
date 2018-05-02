import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onLogOut(): void{
    this.userService
    .setToken(localStorage.getItem("email"), null)
    .subscribe(rspToken => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("phone");
      localStorage.removeItem("email");
      localStorage.removeItem("logged");
      localStorage.removeItem("id");
      this.router.navigate(["/login"]);
    });
  }

}
