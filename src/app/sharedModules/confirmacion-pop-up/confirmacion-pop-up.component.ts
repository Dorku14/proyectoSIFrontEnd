import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from '../funcionesgenerales';

@Component({
  selector: 'app-confirmacion-pop-up',
  templateUrl: './confirmacion-pop-up.component.html',
  styleUrls: ['./confirmacion-pop-up.component.scss']
})
export class ConfirmacionPopUpComponent implements OnInit {
  TituloVentana:string;
  botonOK:string;
  botonCancelar:string;
  mensaje:string;
  constructor(public dialogRef: MatDialogRef<ConfirmacionPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    ) { }

  ngOnInit(): void {
    this.TituloVentana = this.data.TituloVentana;
    this.botonOK = this.data.btnOK;
    this.botonCancelar = this.data.btnCancel;
    this.mensaje = this.data.Mensaje;
  }
  aceptar(){
    this.dialogRef.close(true);
  }
  canceler(){
    this.dialogRef.close(false);
  }

}
