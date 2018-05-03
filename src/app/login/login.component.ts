import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rut: string = "";

  pwd: string = "";

  isError: boolean = false;

  errorMessage: string = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.isError = false;
    this.errorMessage = "";
  }

  logIn(): void{
    this.userService.logIn(this.rut, this.pwd).subscribe(userResponse => {
      let genToken =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);
      if(userResponse){
          this.userService.setToken(this.rut, genToken).subscribe(() => {
            localStorage.setItem("id", String(userResponse.id));
            localStorage.setItem("email", userResponse.email);
            localStorage.setItem("rut", userResponse.rut);
            localStorage.setItem("name", userResponse.name);
            localStorage.setItem("phone", userResponse.phone);
            localStorage.setItem("usertype", userResponse.usertype);
            localStorage.setItem("token", genToken);
            localStorage.setItem("logged", "true");
            if(userResponse.usertype === "Administrador"){
              this.router.navigate(["/users"]);
            }else{
              this.router.navigate(["/home"]);
            }
          });
      }else{
        this.isError = true;
        this.errorMessage = "El usuario no existe en nuestro sistema.";
      }
    });
  }

}
