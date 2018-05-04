import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OnlyloggedinusersGuard } from './guards/onlyloggedinusers.guard';
import { AlwaysauthGuard } from './guards/alwaysauth.guard';
import { UsersComponent } from './users/users.component';
import { DocumsComponent } from './docums/docums.component';

const routes: Routes = [
  { path: "home", component: DashboardComponent, canActivate: [OnlyloggedinusersGuard, AlwaysauthGuard] },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "users", component: UsersComponent, canActivate: [OnlyloggedinusersGuard, AlwaysauthGuard] },
  { path: "docums", component: DocumsComponent, canActivate: [OnlyloggedinusersGuard, AlwaysauthGuard] }
];

export const CONST_ROUTING = RouterModule.forRoot(routes);
