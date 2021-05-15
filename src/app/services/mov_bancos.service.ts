import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class mov_bancosService {
  ID: Number;
  ID_CUENTA: Number;
  FECHA: String;
  FOLIO: String;
  ASIGNACION: String;
  IMPORTE: Number;
  TIPO_MOV: String;
  SALDO_BANCO: Number;
  SALDO_TOTAL: Number;

  incicializarVariables() {
    this.ID = 0;
    this.ID_CUENTA = 0;
    this.FECHA = '';
    this.FOLIO = '';
    this.ASIGNACION = '';
    this.IMPORTE = 0;
    this.TIPO_MOV = '';
    this.SALDO_BANCO = 0;
    this.SALDO_TOTAL = 0;
  }

  llenarCampos(datos){
    this.ID = datos.ID;
    this.ID_CUENTA = datos.ID_CUENTA;
    this.FECHA = datos.FECHA;
    this.FOLIO = datos.FOLIO;
    this.ASIGNACION = datos.ASIGNACION;
    this.IMPORTE = datos.IMPORTE;
    this.TIPO_MOV = datos.TIPO_MOV;
    this.SALDO_BANCO = datos.SALDO_BANCO
    this.SALDO_TOTAL = datos.SALDO_TOTAL;
  }
}
