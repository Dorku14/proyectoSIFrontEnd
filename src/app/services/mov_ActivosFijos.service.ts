import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class mov_ActivosFijosService {
    ID: Number;
    ID_AF: Number;
    FECHA: String;
    IMPORTE: Number;
    P_O_C: String;
    FOLIO: String;
    ASIGNACION: String;
    DESCRIPCION: String;
    TIPO_MOV: String;
    COSTO_VENTA: Number;
    GANANCIA: Number;
    TOTAL: Number;

    incicializarVariables() {
        this.ID = 0;
        this.ID_AF = 0;
        this.FECHA = '';
        this.IMPORTE = 0;
        this.P_O_C = '';
        this.FOLIO = '';
        this.ASIGNACION = '';
        this.DESCRIPCION = '';
        this.TIPO_MOV = '';
        this.COSTO_VENTA = 0;
        this.GANANCIA = 0;
        this.TOTAL = 0;
    }

    llenarCampos(datos: mov_ActivosFijosService) {
        this.ID = datos.ID;
        this.ID_AF = datos.ID_AF;
        this.FECHA = datos.FECHA;
        this.IMPORTE = datos.IMPORTE;
        this.P_O_C = datos.P_O_C;
        this.FOLIO = datos.FOLIO;
        this.ASIGNACION = datos.ASIGNACION;
        this.DESCRIPCION = datos.DESCRIPCION;
        this.TIPO_MOV = datos.TIPO_MOV;
        this.COSTO_VENTA = datos.COSTO_VENTA;
        this.GANANCIA = datos.GANANCIA;
        this.TOTAL = datos.TOTAL;
    }

}