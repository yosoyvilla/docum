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

  rememberRut: string = "";

  pwd: string = "";

  isError: boolean = false;

  errorMessage: string = "";

  rememberPasswordMessage: string = "";

  onPasswordMessage: boolean = false;

  onGettingUser: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.pwd = "";
    this.rut = "";
    this.isError = false;
    this.errorMessage = "";
    this.rememberPasswordMessage = "";
    this.onPasswordMessage = false;
    this.onGettingUser = false;
    this.rememberRut = "";
  }

  changeUsernameStyle(){
    if(this.rut === ""){
      (<HTMLInputElement>document.getElementById('lblusername')).innerHTML='RUT';
    }else{
      (<HTMLInputElement>document.getElementById('lblusername')).innerHTML='';
    }
  }

  changePasswordStyle(){
    if(this.pwd === ""){
      (<HTMLInputElement>document.getElementById('lblpwd')).innerHTML='Password';
    }else{
      (<HTMLInputElement>document.getElementById('lblpwd')).innerHTML='';
    }
  }

  rememberPassword(): void {
    this.onGettingUser = true;
    this.userService.remember(this.rememberRut).subscribe(rememberResponse => {
      if (JSON.parse(rememberResponse.text()) !== true) {
        this.rememberPasswordMessage = "El RUT suministrado no existe en nuestro sistema.";
        this.onPasswordMessage = true;
        this.onGettingUser = false;
      }else{
        this.rememberPasswordMessage = "Se ha enviado un correo con los datos de su cuenta al correo suministrado a PREOMED SALUD.";
        this.onPasswordMessage = true;
        this.onGettingUser = false;
      }
    });
  }

  clearRemember(): void{
    this.rememberRut = "";
    this.isError = false;
    this.errorMessage = "";
    this.rememberPasswordMessage = "";
    this.onPasswordMessage = false;
    this.onGettingUser = false;
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
