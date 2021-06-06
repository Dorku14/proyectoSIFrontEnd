import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class mov_DeudaCreditos {
    ID_DC: Number;
    FECHA: String;
    PAGADO_CON: String;
    TIPO_MOV: String;
    IMPORTE: Number;
    SALDO: Number;

    incicializarVariables() {
        this.ID_DC = 0;
        this.FECHA = '';
        this.PAGADO_CON = '';
        this.TIPO_MOV = '';
        this.IMPORTE = 0;
        this.SALDO = 0;
    }

    llenarCampos(datos: mov_DeudaCreditos) {
        this.ID_DC = datos.ID_DC;
        this.FECHA = datos.FECHA;
        this.PAGADO_CON = datos.PAGADO_CON;
        this.TIPO_MOV = datos.TIPO_MOV;
        this.IMPORTE = datos.IMPORTE;
        this.SALDO = datos.SALDO;
    }

}