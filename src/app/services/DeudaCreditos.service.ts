import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DeudaCreditos {
    FOLIO: String;
    FECHA: String;
    RECIBIDO_EN: String;
    PROVEEDOR: Number;
    ID_C: Number;
    IMPORTE: String;
    DESCRIPCION: String;
    ESTATUS: String;

    incicializarVariables() {
        this.FOLIO = '';
        this.FECHA = '';
        this.RECIBIDO_EN = '';
        this.PROVEEDOR = 0;
        this.ID_C = 0,
        this.IMPORTE = '';
        this.DESCRIPCION = '';
        this.ESTATUS = '';
    }

    llenarCampos(datos: DeudaCreditos) {
        this.FOLIO = datos.FOLIO;
        this.FECHA = datos.FECHA;
        this.RECIBIDO_EN = datos.RECIBIDO_EN;
        this.PROVEEDOR = datos.PROVEEDOR;
        this.ID_C = datos.ID_C;
        this.IMPORTE = datos.IMPORTE;
        this.DESCRIPCION = datos.DESCRIPCION;
        this.ESTATUS = datos.ESTATUS;
    }

}