import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { Ng2SmartTableModule, LocalDataSource, ViewCell } from "ng2-smart-table";
import { UserService } from "../services/user.service";
import { UserdataService } from '../services/userdata.service';

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

  constructor(private userService: UserService, public userDataService: UserdataService) {}

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

  pdfSrc: string = "";

  ngOnInit() {
    this.updateUsers();
  }

  onInitUpload(){
    let userData = this.userDataService.get();
    this.uploadUserName = userData.name;
    this.uploadUserRut = userData.rut;
    console.log(this.userDataService.get());
  }

  onStartUpload(){
    console.log(this.pdfSrc);
  }

  onChangeFile(event){
    const files = event.srcElement.files;
    console.log(files);
  }

  updateUsers(){
    this.errorOnUpdate = false;
    this.successOnUpdate = false;
    let data = [];
    this.userService.getAll().subscribe(userResponse => {
      for (let user of userResponse) {
        data.push({
          id: user.id,
          rut: user.rut,
          email: user.email,
          name: user.name,
          phone: user.phone,
          upload: 'Subir Documentos'
        });
      }
      this.source = new LocalDataSource(data);
    });
  }

  onEditConfirm(event) {
    if (
      event.newData.email === "" ||
      event.newData.rut === "" ||
      event.newData.name === "" ||
      event.newData.phone === ""
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
    let pwd = this.randomString(
      10,
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );
    if (
      event.newData.email === "" ||
      event.newData.rut === "" ||
      event.newData.name === "" ||
      event.newData.phone === ""
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
            this.alertMessage = "Sea ha creado correctamente el usuario.";
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
