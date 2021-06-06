import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AcreedoresDiversos {
    FOLIO: String;
    FECHA: String;
    F_O_R: String;
    IMPORTE: Number;
    IVA: Number;
    ESTATUS: String;
    CLIENTE: String;
    CONCEPTO: String;

    incicializarVariables() {
        this.FOLIO = '';
        this.FECHA = '';
        this.F_O_R = '';
        this.IMPORTE = 0;
        this.IVA = 0,
        this.ESTATUS = '';
        this.CLIENTE = '';
        this.CONCEPTO = '';
    }

    llenarCampos(datos: AcreedoresDiversos) {
        this.FOLIO = datos.FOLIO;
        this.FECHA = datos.FECHA;
        this.F_O_R = datos.F_O_R;
        this.IMPORTE = datos.IMPORTE;
        this.IVA = datos.IVA;
        this.ESTATUS = datos.ESTATUS;
        this.CLIENTE = datos.CLIENTE;
        this.CONCEPTO = datos.CONCEPTO;
    }

}