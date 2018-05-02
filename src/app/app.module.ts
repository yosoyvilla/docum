import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, Headers, RequestOptions, HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CONST_ROUTING } from './/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AlwaysauthGuard } from './guards/alwaysauth.guard';
import { OnlyloggedinusersGuard } from './guards/onlyloggedinusers.guard';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { trigger, style, animate, transition } from '@angular/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    SidenavComponent,
    UsersComponent
  ],
  imports: [
    CONST_ROUTING,
    FormsModule,
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    PdfViewerModule
  ],
  providers: [AlwaysauthGuard, OnlyloggedinusersGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
