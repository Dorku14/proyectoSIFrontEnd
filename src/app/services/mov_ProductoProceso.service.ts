import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class mov_ProductoProcesoSerivce {
    ID_PP: Number;
    FECHA: String;
    UNIDADES: Number;
    ESTATUS: String;
    UNIDADES_PROCESO: Number;
    IMPORTE_PROCESO: Number;
    TIPO_MOV: String;

    incicializarVariables() {
        this.ID_PP = 0;
        this.FECHA = '';
        this.UNIDADES = 0;
        this.ESTATUS = '';
        this.UNIDADES_PROCESO = 0;
        this.IMPORTE_PROCESO = 0;
        this.TIPO_MOV = '';
    }

    llenarCampos(datos: mov_ProductoProcesoSerivce) {
        this.ID_PP = datos.ID_PP;
        this.FECHA = datos.FECHA;
        this.UNIDADES = datos.UNIDADES;
        this.ESTATUS = datos.ESTATUS;
        this.UNIDADES_PROCESO = datos.UNIDADES_PROCESO;
        this.IMPORTE_PROCESO = datos.IMPORTE_PROCESO;
        this.TIPO_MOV = datos.TIPO_MOV;
    }

}
