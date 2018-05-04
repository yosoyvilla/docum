import { Component, OnInit, EventEmitter, Input, Output, NgZone } from "@angular/core";
import { Ng2SmartTableModule, LocalDataSource, ViewCell } from "ng2-smart-table";
import { UserService } from "../services/user.service";
import { UserdataService } from '../services/userdata.service';
import { Env } from '../../enums/environments';
import { IfileModel } from '../models/fileModel';
import { DocumsService } from '../services/docums.service';

@Component({
  selector: 'button-view',
  template: `
    <button (click)="onClickPreview()" (save)="onPreviewModeOpen($event)" style="color: white;width: 100%;max-width: 100%;" type="button" class="btn btn-primary">Vista Previa</button>
    <button (click)="onClickDownload()" (save)="onPreviewModeOpen($event)" style="color: white;width: 100%;max-width: 100%;" type="button" class="btn btn-primary">Descargar</button>
  `,
})
export class ButtonsViewComponent implements ViewCell, OnInit {

  renderValue: string;

  constructor(private documsService: DocumsService) { }

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClickPreview() {
    this.save.emit(this.rowData.id);
    setTimeout(() => {
      document.getElementById('btnLM').click();
    }, 1000);
  }
}

@Component({
  selector: 'app-docums',
  templateUrl: './docums.component.html',
  styleUrls: ['./docums.component.css']
})
export class DocumsComponent implements OnInit {

  constructor(private userService: UserService, public userDataService: UserdataService, private documsService: DocumsService) {
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
      filename: {
        title: "NOMBRE DOCUMENTO"
      },
      doctorname: {
        title: "SUBIDO POR"
      },
      created: {
        title: "FECHA DE CREACION"
      },
      documents: {
        title: "ACCIONES",
        type: "custom",
        filter: false,
        renderComponent: ButtonsViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            (<HTMLInputElement>document.getElementById('preRut')).value = row;
          });
        }
      }
    },
    actions: { add: false, edit: false, delete: true, columnTitle: "Eliminar" }
  };

  errorOnUpdate: boolean = false;

  successOnUpdate: boolean = false;

  alertMessage: string = "";

  source: LocalDataSource;

  onCreateMode: boolean = false;

  uploadUserName: string = "";
  uploadUserRut: string = "";
  uploadUserID: string = "";
  fileModel: IfileModel;

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

  previewDocumentName: string = "";

  previewDoctorName: string = "";

  ngOnInit() {
    this.updateDocuments();
  }

  onPreviewModeOpen(){
    let b64toBlob = require('b64-to-blob');
    let contentType = 'application/pdf';
    this.onPreviewMode = false;
    let reader = new FileReader();
    const idDocum = (<HTMLInputElement>document.getElementById('preRut')).value;
    this.documsService.getOneDocumentByID(idDocum).subscribe(documResponse => {
      let file = b64toBlob(documResponse.filevalue, contentType);
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        this.onPreviewMode = true;
        this.uploadDocumError = false;
        this.uploadDocumErrorMessage = "";
        // this.pdfSrc = String(files);
        this.showPDFViewer = true;
      };
    });
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

  updateDocuments(){
    this.errorOnUpdate = false;
    this.successOnUpdate = false;
    let data = [];
    this.documsService.getAll().subscribe(documResponse => {
      for (let document of documResponse) {
        data.push({
          id: document.id,
          rut: document.rut,
          filename: document.filename,
          doctorname: document.doctorname,
          created: document.created,
          documents: 'ACCIONES'
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
            this.updateDocuments();
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
            this.updateDocuments();
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
