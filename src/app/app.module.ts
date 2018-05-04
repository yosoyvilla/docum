import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, Headers, RequestOptions, HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CONST_ROUTING } from './/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent, ButtonsViewUserComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AlwaysauthGuard } from './guards/alwaysauth.guard';
import { OnlyloggedinusersGuard } from './guards/onlyloggedinusers.guard';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { UsersComponent, ButtonViewComponent, ButtonAdminViewComponent } from './users/users.component';
import { trigger, style, animate, transition } from '@angular/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UserdataService } from './services/userdata.service';
import { DocumsComponent, ButtonsViewComponent } from './docums/docums.component';
import { DocumsService } from './services/docums.service';
import { OnlyAdminGuard } from './guards/onlyadmin.guard';
import { MyuserdataComponent } from './myuserdata/myuserdata.component';

declare var require: any;


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    SidenavComponent,
    UsersComponent,
    ButtonViewComponent,
    DocumsComponent,
    ButtonsViewComponent,
    ButtonAdminViewComponent,
    ButtonsViewUserComponent,
    MyuserdataComponent
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
    PdfViewerModule,
    Ng2SmartTableModule
  ],
  entryComponents: [
    ButtonViewComponent,
    ButtonsViewComponent,
    ButtonAdminViewComponent,
    ButtonsViewUserComponent
  ],
  providers: [AlwaysauthGuard, OnlyloggedinusersGuard, UserService, UserdataService, DocumsService, OnlyAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
