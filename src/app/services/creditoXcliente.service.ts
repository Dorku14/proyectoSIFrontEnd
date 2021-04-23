import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class creditoXclienteService {
    FECHA: string;
    CLIENTE: string;
    FOLIO: String;
    F_O_R: string;
    IMPORTE: number;
    IVA: Number;
    FORMA_COBRO :string;
    TIPO_MOV: String;
    ESTATUS: String;
    BANDERA: String;

    incicializarVariables() {
        this.FECHA = '';
        this.CLIENTE = '';
        this.FOLIO = '';
        this.F_O_R = '';
        this.IMPORTE = 0;
        this.IVA = 0;
        this.FORMA_COBRO = '';
        this.TIPO_MOV = '';
        this.ESTATUS = '';
        this.BANDERA = '';
    }

    llenarCampos(datos:creditoXclienteService){
        this.FECHA = datos.FECHA;
        this.CLIENTE = datos.CLIENTE;
        this.FOLIO = datos.FOLIO;
        this.F_O_R = datos.F_O_R;
        this.IMPORTE = datos.IMPORTE;
        this.IVA = datos.IVA;
        this.FORMA_COBRO = datos.FORMA_COBRO;
        this.TIPO_MOV = datos.TIPO_MOV;
        this.ESTATUS = datos.ESTATUS;
        this.BANDERA = datos.BANDERA;
    }
}
