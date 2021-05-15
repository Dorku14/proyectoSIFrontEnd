import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class mov_CreditoClientesService {
    ID: Number;
    ID_CC: Number;
    FECHA: String;
    IMPORTE: Number;
    IVA: Number;
    TIPO_MOV: String;
    FORMA_COBRO: String;
    SALDO_RESTANTE: Number;
    IVA_RESTANTE: Number;
    TOTAL: Number;

    incicializarVariables() {
        this.ID = 0;
        this.ID_CC = 0;
        this.FECHA = '';
        this.IMPORTE = 0;
        this.IVA = 0;
        this.TIPO_MOV = '';
        this.FORMA_COBRO = '';
        this.SALDO_RESTANTE = 0;
        this.IVA_RESTANTE = 0;
        this.TOTAL = 0;
    }

    llenarCampos(datos:mov_CreditoClientesService){
        this.ID = datos.ID;
        this.ID_CC = datos.ID_CC;
        this.FECHA = datos.FECHA;
        this.IMPORTE = datos.IMPORTE;
        this.IVA = datos.IVA;
        this.TIPO_MOV = datos.TIPO_MOV;
        this.FORMA_COBRO = datos.FORMA_COBRO;
        this.SALDO_RESTANTE = datos.SALDO_RESTANTE;
        this.IVA_RESTANTE = datos.IVA_RESTANTE;
        this.TOTAL = datos.TOTAL;
    }
}