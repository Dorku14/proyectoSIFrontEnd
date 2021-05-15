import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class balanceinicialService {
    ID: Number;
    CAJA: Number;
    BANCOS: Number;
    CREDITO_CLI: Number;
    IVAxCOBRAR: Number;
    ALMACEN: Number;
    PRODUC_COM: Number;
    PRODUC_FABRI: Number;
    PRODUCTO_PROCESO: Number;
    MATERIA_PRIMA: Number;
    IVA_ACREDITABLE: Number;
    DEUDORES_DIV: Number;
    TOTAL_CIRCULANTE: Number;
    TOTAL_AF: Number;

    incicializarVariables() {
        this.ID = 0;
        this.CAJA = 0;
        this.BANCOS = 0;
        this.CREDITO_CLI = 0;
        this.IVAxCOBRAR = 0;
        this.ALMACEN = 0;
        this.PRODUC_COM = 0;
        this.PRODUC_FABRI = 0;
        this.PRODUCTO_PROCESO = 0;
        this.MATERIA_PRIMA = 0;
        this.IVA_ACREDITABLE = 0;
        this.DEUDORES_DIV = 0;
        this.TOTAL_CIRCULANTE = 0;
        this.TOTAL_AF = 0;
    }

    llenarCampos(datos: balanceinicialService) {
        this.ID = datos.ID;
        this.CAJA = datos.CAJA;
        this.BANCOS = datos.BANCOS;
        this.CREDITO_CLI = datos.CREDITO_CLI;
        this.IVAxCOBRAR = datos.IVAxCOBRAR;
        this.ALMACEN = datos.ALMACEN;
        this.PRODUC_COM = datos.PRODUC_COM;
        this.PRODUC_FABRI = datos.PRODUC_FABRI;
        this.PRODUCTO_PROCESO = datos.PRODUCTO_PROCESO;
        this.MATERIA_PRIMA = datos.MATERIA_PRIMA;
        this.IVA_ACREDITABLE = datos.IVA_ACREDITABLE;
        this.DEUDORES_DIV = datos.DEUDORES_DIV;
        this.TOTAL_CIRCULANTE = datos.TOTAL_CIRCULANTE;
        this.TOTAL_AF = datos.TOTAL_AF;
    }

}
