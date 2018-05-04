import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserdataService } from '../services/userdata.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-myuserdata',
  templateUrl: './myuserdata.component.html',
  styleUrls: ['./myuserdata.component.css']
})
export class MyuserdataComponent implements OnInit {

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
        filter: false,
        sort: false
      },
      email: {
        title: "EMAIL",
        filter: false,
        sort: false
      },
      name: {
        title: "NOMBRE",
        filter: false,
        sort: false
      },
      phone: {
        title: "TELEFONO",
        filter: false,
        sort: false
      },
      pwd: {
        title: "PASSWORD",
        filter: false,
        sort: false
      }
    },
    actions: { add: false, edit: true, delete: false, columnTitle: "Acciones" }
  };

  source: LocalDataSource;

  ngOnInit() {
    this.updateUser();
  }

  updateUser(){
    let data = [];
    this.userService.getOneByRut(localStorage.getItem('rut')).subscribe(userResponse => {
      for (let user of userResponse) {
        if(user.rut !== "" &&
           user.name !== ""
        ){
          data.push({
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            pwd: ""
          });
        }
      }
      this.source = new LocalDataSource(data);
    });
  }

  onEditConfirm(event) {
    let newpwd = "No Changes";
    if(/^ *$/.test(event.newData.pwd)){
      newpwd = "No Changes";
    }else{
      newpwd = event.newData.pwd;
    }
    if (
      event.newData.name === ""
    ) {
      event.confirm.reject();
      alert("Por favor no deje su nombre en blanco.");
    } else {
      this.userService
        .updateMyUser(
          event.newData.id,
          event.newData.email,
          event.newData.name,
          event.newData.phone,
          newpwd
        )
        .subscribe(updateResponse => {
          if (JSON.parse(updateResponse.text()) !== true) {
            alert("Ocurrio un error al actualizar el usuario.");
            event.confirm.reject();
          } else {
            alert("Se ha actualizado correctamente el usuario.");
            event.confirm.resolve();
            this.updateUser();
          }
        });
    }
  }

}
