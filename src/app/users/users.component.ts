import { Component, OnInit, EventEmitter, Input, Output, NgZone } from "@angular/core";
import { Ng2SmartTableModule, LocalDataSource, ViewCell } from "ng2-smart-table";
import { UserService } from "../services/user.service";
import { UserdataService } from '../services/userdata.service';
import { Env } from '../../enums/environments';


@Component({
  selector: 'button-admin-view',
  template: `
    <input [(ngModel)]="checkboxValue" (change)="onChange()" type="checkbox" class="form-check-input">
  `,
})
export class ButtonAdminViewComponent implements ViewCell, OnInit {

  renderValue: string;

  usertype: string = "Cliente";

  checkboxValue: boolean = true;

  constructor(private userDataService: UserdataService, private userService: UserService) { }

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() saveAdmin: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.checkboxValue = (this.value === "true");
  }

  onChange() {
    if(this.checkboxValue){
      this.usertype = "Administrador";
    }else{
      this.usertype = "Cliente";
    }
    this.userService.changeutype(this.rowData.id, this.usertype).subscribe(toAdminResponse => {
      if (JSON.parse(toAdminResponse.text()) !== true) {
        alert("Ocurrio un error convirtiendo el usuario " + this.rowData.name + " a adiministrador!");
      } else {
        alert("Se ha convertido correctamente a administrador el usuario: " + this.rowData.name);
      }
      this.saveAdmin.emit(this.rowData);
    });
  }
}

@Component({
  selector: 'button-view',
  template: `
    <button (click)="onClick()" (save)="onInitUpload($event)" style="color: white;" type="button" class="btn btn-primary">{{ renderValue }}</button>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {

  renderValue: string;

  constructor(private userDataService: UserdataService) { }

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    this.userDataService.add(this.rowData);
    this.save.emit(this.rowData);
  }
}

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService, public userDataService: UserdataService) {
  }

  settings = {
    add: {
      inputClass: "addFields",
      addButtonContent: "Agregar",
      createButtonContent: "Crear",
      cancelButtonContent: "Cancelar",
      confirmCreate: true
    },
    edit: {
      editButtonContent: "Editar",
      saveButtonContent: "Guardar",
      cancelButtonContent: "Cancelar",
      confirmSave: true
    },
    delete: {
      deleteButtonContent: "Eliminar",
      confirmDelete: true
    },
    columns: {
      id: {
        title: "ID",
        editable: false,
        width: "0px",
        class: "idCell",
        filter: false
      },
      rut: {
        title: "RUT"
      },
      email: {
        title: "EMAIL"
      },
      name: {
        title: "NOMBRE"
      },
      phone: {
        title: "TELEFONO"
      },
      upload: {
        title: "DOCUMENTOS",
        type: "custom",
        filter: false,
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            document.getElementById('btnLM').click();
          });
        }
      },
      admin: {
        title: "ADMINISTRADOR",
        type: "custom",
        filter: false,
        renderComponent: ButtonAdminViewComponent,
        onComponentInitFunction(instance) {
          instance.saveAdmin.subscribe(row => {
            console.log("UserType was modified!");
          });
        }
      }
    },
    actions: { add: true, edit: true, delete: true, columnTitle: "Acciones" }
  };

  errorOnUpdate: boolean = false;

  successOnUpdate: boolean = false;

  alertMessage: string = "";

  source: LocalDataSource;

  onCreateMode: boolean = false;

  uploadUserName: string = "";
  uploadUserRut: string = "";
  uploadUserID: string = "";

  documFileName: string = "";

  uploadDocumError: boolean = false;
  uploadDocumErrorMessage: string = "";
  showPDFViewer: boolean = false;

  patientemail: string = "";

  onPreviewMode: boolean = false;

  pdfSrc: string = "";

  loading: boolean = false;

  onUploadMode: boolean = false;

  onFinishUpload: boolean = false;

  onFinishUploadMessage: string = "";

  ngOnInit() {
    this.updateUsers();
  }

  onInitUpload(){
    this.documFileName = "";
    this.onPreviewMode = false;
    this.uploadDocumError = false;
    let userData = this.userDataService.get();
    this.uploadUserName = userData.name;
    this.uploadUserRut = userData.rut;
    this.patientemail = userData.email;
    this.showPDFViewer = false;
    this.onUploadMode = false;
    this.onFinishUpload = false;
    this.onFinishUploadMessage = "";
    (<HTMLInputElement>document.getElementById('exampleInputFile')).value = "";
  }

  uploadFileToServer(){
    this.onUploadMode = true;
    let dataUpload = [];
    const files = (<HTMLInputElement>document.getElementById('exampleInputFile')).value;

    if(this.documFileName === "" || files === ""){
      this.onUploadMode = false;
      this.uploadDocumError = true;
      this.uploadDocumErrorMessage = "Por favor seleccione el documento PDF y seleccione un nombre para el documento en el sistema.";
    }else{
      if(String(files).indexOf("pdf") < 0){
        this.uploadDocumError = true;
        this.onFinishUpload = false;
        this.onUploadMode = false;
        this.uploadDocumErrorMessage = "Por favor seleccione un documento con extension PDF.";
      }else{
        let $img: any = document.querySelector('#exampleInputFile');

        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let file = $img.files[0];
          reader.readAsDataURL(file);
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            dataUpload.push({
              data: {
              documname: this.documFileName.trim().replace(/_/g, ' '),
              filename: file.name,
              filetype: file.type,
              rut: this.uploadUserRut,
              value: e.target.result.split(',')[1],
              doctorname: localStorage.getItem('name'),
              patientemail: this.patientemail,
              patientname: this.uploadUserName
            }
            });
            this.userService.uploadFile(
              dataUpload
            )
            .subscribe(uploadResponse => {
              this.onUploadMode = false;
              this.onFinishUpload = true;
              if (JSON.parse(uploadResponse.text()) === true) {
                this.onFinishUploadMessage = "Se ha subido correctamente el documento al sistema.";
              }else{
                this.onFinishUploadMessage = "Tuvimos un error al subir el archivo, por favor intente nuevamente.";
              }
            });
          };
        }
      }
    }
  }

  onStartUpload(){
    // const files = document.getElementById('exampleInputFile').value;
    const files = (<HTMLInputElement>document.getElementById('exampleInputFile')).value;

    if(this.documFileName === "" || files === ""){
      this.uploadDocumError = true;
      this.uploadDocumErrorMessage = "Por favor seleccione el documento PDF y seleccione un nombre para el documento en el sistema.";
    }else{
      if(String(files).indexOf("pdf") < 0){
        this.uploadDocumError = true;
        this.uploadDocumErrorMessage = "Por favor seleccione un documento con extension PDF.";
      }else{
        let $img: any = document.querySelector('#exampleInputFile');

        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();

          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
          };

          reader.readAsArrayBuffer($img.files[0]);
        }
        this.onPreviewMode = true;
        this.uploadDocumError = false;
        this.uploadDocumErrorMessage = "";
        // this.pdfSrc = String(files);
        this.showPDFViewer = true;
      }
    }
  }

  updateUsers(){
    this.errorOnUpdate = false;
    this.successOnUpdate = false;
    let data = [];
    this.userService.getAll().subscribe(userResponse => {
      for (let user of userResponse) {
        let isAdmin = "false";
        if(user.usertype === "Administrador"){
          isAdmin = "true";
        }
        if(user.rut !== "" &&
           user.name !== ""
        ){
          data.push({
            id: user.id,
            rut: user.rut,
            email: user.email,
            name: user.name,
            phone: user.phone,
            upload: 'Subir Documentos',
            admin: isAdmin
          });
        }
      }
      this.source = new LocalDataSource(data);
    });
  }

  onEditConfirm(event) {
    if (
      event.newData.rut === "" ||
      event.newData.name === ""
    ) {
      event.confirm.reject();
      this.errorOnUpdate = true;
      this.alertMessage = "Por favor no deje ningun espacio en blanco.";
      setTimeout(() => {
        this.successOnUpdate = false;
        this.errorOnUpdate = false;
      }, 3000);
    } else {
      this.userService
        .update(
          event.newData.id,
          event.newData.rut,
          event.newData.email,
          event.newData.name,
          event.newData.phone
        )
        .subscribe(updateResponse => {
          JSON.parse(updateResponse.text()) === true
            ? (this.successOnUpdate = true)
            : (this.errorOnUpdate = true);
          if (JSON.parse(updateResponse.text()) !== true) {
            this.alertMessage = "Ocurrio un error al actualizar el usuario.";
            event.confirm.reject();
          } else {
            this.alertMessage = "Se ha actualizado correctamente el usuario.";
            event.confirm.resolve();
            this.updateUsers();
          }
          setTimeout(() => {
            this.successOnUpdate = false;
            this.errorOnUpdate = false;
          }, 3000);
        });
    }
  }

  onDeleteConfirm(event) {
    if (
      window.confirm("Realmente desea eliminar al usuario: " + event.data.name)
    ) {
      this.userService.delete(event.data.id).subscribe(deleteResponse => {
        JSON.parse(deleteResponse.text()) === true
          ? (this.successOnUpdate = true)
          : (this.errorOnUpdate = true);
        if (JSON.parse(deleteResponse.text()) !== true) {
          this.alertMessage = "Ocurrio un error al eliminar el usuario.";
          event.confirm.reject();
        } else {
          this.alertMessage = "Se ha eliminado correctamente el usuario.";
          event.confirm.resolve();
        }
        setTimeout(() => {
          this.successOnUpdate = false;
          this.errorOnUpdate = false;
        }, 3000);
      });
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    let pwd = "preomed2018";
    if(event.newData.email === ""){
      pwd = "preomed2018";
    }else{
      pwd = this.randomString(
        10,
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
      );
    }
    if (
      event.newData.rut === "" ||
      event.newData.name === ""
    ) {
      event.confirm.reject();
      this.errorOnUpdate = true;
      this.alertMessage = "Por favor no deje ningun espacio en blanco.";
      setTimeout(() => {
        this.successOnUpdate = false;
        this.errorOnUpdate = false;
      }, 3000);
    } else {
      this.onCreateMode = true;
      this.userService
        .register(
          event.newData.rut,
          event.newData.email,
          pwd,
          event.newData.name,
          event.newData.phone
        )
        .subscribe(registerReturn => {
          let registerResponse = JSON.parse(registerReturn.text());
          if (registerResponse === "true" || registerResponse === true) {
            this.alertMessage = "Se ha creado correctamente el usuario.";
            this.successOnUpdate = true;
            event.confirm.resolve();
          } else {
            this.alertMessage =
              "Ocurrio un error al crear el usuario, por favor verifique que no exista el RUT en el sistema.";
            this.errorOnUpdate = true;
            event.confirm.reject();
          }
          setTimeout(() => {
            this.successOnUpdate = false;
            this.errorOnUpdate = false;
            this.onCreateMode = false;
            this.updateUsers();
          }, 3000);
        });
    }
  }

  randomString(length: number, chars: string) {
    let result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
}
