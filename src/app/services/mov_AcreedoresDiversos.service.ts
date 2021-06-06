import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class mov_acreedoresdiversos {
    ID_AD: Number;
    FECHA: String;
    IMPORTE: Number;
    IVA: Number;
    FORMA_PAGO: String;
    TIPO_MOV: String;
    IMPORTE_RESTANTE: Number;
    IVA_RESTANTE: Number;
    TOTAL: Number;

    incicializarVariables() {
        this.ID_AD = 0;
        this.FECHA = '';
        this.IMPORTE = 0;
        this.IVA = 0;
        this.FORMA_PAGO = '';
        this.TIPO_MOV = '',
        this.IMPORTE_RESTANTE = 0;
        this.IVA_RESTANTE = 0;
        this.TOTAL = 0;
    }

    llenarCampos(datos: mov_acreedoresdiversos) {
        this.ID_AD = datos.ID_AD;
        this.FECHA = datos.FECHA;
        this.IMPORTE = datos.IMPORTE;
        this.IVA = datos.IVA;
        this.FORMA_PAGO = datos.FORMA_PAGO;
        this.TIPO_MOV = datos.TIPO_MOV;
        this.IMPORTE_RESTANTE = datos.IMPORTE_RESTANTE;
        this.IVA_RESTANTE = datos.IVA_RESTANTE;
        this.TOTAL = datos.TOTAL;
    }

}