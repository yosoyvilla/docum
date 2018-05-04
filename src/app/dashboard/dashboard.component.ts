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
export class ButtonsViewUserComponent implements ViewCell, OnInit {

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

  onClickDownload() {
    this.save.emit(this.rowData.id);
    setTimeout(() => {
      document.getElementById('btnDownload').click();
    }, 1000);
  }
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {

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
        renderComponent: ButtonsViewUserComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            (<HTMLInputElement>document.getElementById('preRut')).value = row;
          });
        }
      }
    },
    actions: { add: false, edit: false, delete: false, columnTitle: "Eliminar" }
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
        this.showPDFViewer = true;
      };
    });
  }

  onDownloadDocument(){
    let b64toBlob = require('b64-to-blob');
    let contentType = 'application/pdf';
    this.onPreviewMode = false;
    let reader = new FileReader();
    const idDocum = (<HTMLInputElement>document.getElementById('preRut')).value;
    this.documsService.getOneDocumentByID(idDocum).subscribe(documResponse => {
      let file = b64toBlob(documResponse.filevalue, contentType);
      if(navigator.msSaveBlob){
        let filename = documResponse.filename;
        navigator.msSaveBlob(file, filename);
    } else {
        let link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.setAttribute('visibility','hidden');
        link.download = documResponse.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    });
  }

  onDeleteConfirm(event) {
    if (
      window.confirm("Realmente desea eliminar el documento: " + event.data.filename)
    ) {
      this.documsService.delete(event.data.id).subscribe(deleteResponse => {
        JSON.parse(deleteResponse.text()) === true
          ? (this.successOnUpdate = true)
          : (this.errorOnUpdate = true);
        if (JSON.parse(deleteResponse.text()) !== true) {
          this.alertMessage = "Ocurrio un error al eliminar el documento.";
          event.confirm.reject();
        } else {
          this.alertMessage = "Se ha eliminado correctamente el documento.";
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

  updateDocuments(){
    this.errorOnUpdate = false;
    this.successOnUpdate = false;
    let data = [];
    this.documsService.getAllByRut(localStorage.getItem('rut')).subscribe(documResponse => {
      for (let document of documResponse) {
        if(document.rut !== "" &&
           document.filename !== "" &&
           document.doctorname !== "" &&
           document.created !== ""){
            data.push({
              id: document.id,
              filename: document.filename,
              doctorname: document.doctorname,
              created: document.created,
              documents: 'ACCIONES'
            });
        }
      }
      this.source = new LocalDataSource(data);
    });
  }
}
