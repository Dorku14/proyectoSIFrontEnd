import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class creditoXclienteService {
    ID: Number;
    ID_CLIENTE: Number;
    FOLIO: String;
    F_O_R: string;
    IMPORTE: number;
    IVA: Number;
    ESTATUS :string;

    incicializarVariables() {
        this.ID = 0;
        this.ID_CLIENTE = 0;
        this.FOLIO = '';
        this.F_O_R = '';
        this.IMPORTE = 0;
        this.IVA = 0;
        this.ESTATUS = '';
    }

    llenarCampos(datos:creditoXclienteService){
        this.ID = datos.ID;
        this.ID_CLIENTE = datos.ID_CLIENTE;
        this.FOLIO = datos.FOLIO;
        this.F_O_R = datos.F_O_R;
        this.IMPORTE = datos.IMPORTE;
        this.IVA = datos.IVA;
        this.ESTATUS = datos.ESTATUS;
    }
}
