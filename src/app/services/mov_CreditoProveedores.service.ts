import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class mov_CreditoProveedoresService {
    ID_CP: Number;
    FECHA: String;
    IMPORTE: Number;
    IVA: Number;
    TIPO_MOV: String;
    SALDO_RESTANTE: Number;
    IVA_RESTANTE: Number;
    TOTAL: Number;

    incicializarVariables() {
        this.ID_CP = 0;
        this.FECHA = '';
        this.IMPORTE = 0;
        this.IVA = 0;
        this.TIPO_MOV = '';
        this.SALDO_RESTANTE = 0;
        this.IVA_RESTANTE = 0;
        this.TOTAL = 0;
    }

    llenarCampos(datos:mov_CreditoProveedoresService){
        this.ID_CP = datos.ID_CP;
        this.FECHA = datos.FECHA;
        this.IMPORTE = datos.IMPORTE;
        this.IVA = datos.IVA;
        this.TIPO_MOV = datos.TIPO_MOV;
        this.SALDO_RESTANTE = datos.SALDO_RESTANTE;
        this.IVA_RESTANTE = datos.IVA_RESTANTE;
        this.TOTAL = datos.TOTAL;
    }
}
