import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CreditoProveedoresService {
    ID_P: Number;
    FECHA: String;
    FOLIO: String;
    F_O_R: string;
    IMPORTE: number;
    IVA: Number;
    TOTAL: Number;
    ESTATUS :string;

    incicializarVariables() {
        this.ID_P = 0;
        this.FECHA = '';
        this.FOLIO = '';
        this.F_O_R = '';
        this.IMPORTE = 0;
        this.IVA = 0;
        this.TOTAL = 0;
        this.ESTATUS = '';
    }

    llenarCampos(datos:CreditoProveedoresService){
        this.ID_P = datos.ID_P;
        this.FECHA = datos.FECHA;
        this.FOLIO = datos.FOLIO;
        this.F_O_R = datos.F_O_R;
        this.IMPORTE = datos.IMPORTE;
        this.IVA = datos.IVA;
        this.TOTAL = datos.TOTAL;
        this.ESTATUS = datos.ESTATUS;
    }
}
