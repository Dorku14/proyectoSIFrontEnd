import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class mov_MateriasPrimasService {
    ID_MP: Number;
    FECHA: string;
    PROVEEDOR: string;
    FOLIO: string;
    ASIGNACION: string;
    IMPORTE: Number;
    UNIDADES: Number;
    ID_PP: String;
    MPxP: Number;
    MP_UTILIZADA: Number;
    UNIDADES_ALM: Number;
    VALOR_ALM: Number;
    COSTO_PROMEDIO: Number;
    TIPO_MOV: String;

    incicializarVariables() {
        this.ID_MP = 0;
        this.FECHA = '';
        this.PROVEEDOR = '';
        this.FOLIO = '';
        this.ASIGNACION = '';
        this.IMPORTE = 0;
        this.UNIDADES = 0;
        this.ID_PP = '';
        this.MPxP = 0;
        this.MP_UTILIZADA = 0;
        this.UNIDADES_ALM = 0;
        this.VALOR_ALM = 0;
        this.COSTO_PROMEDIO = 0;
        this.TIPO_MOV = '';
    }

    llenarCampos(datos){
        this.ID_MP = datos.ID_MP;
        this.FECHA = datos.FECHA;
        this.PROVEEDOR = datos.PROVEEDOR;
        this.FOLIO = datos.FOLIO;
        this.ASIGNACION = datos.ASIGNACION;
        this.IMPORTE = datos.IMPORTE;
        this.UNIDADES = datos.UNIDADES;
        this.ID_PP = datos.ID_PP;
        this.MPxP = datos.MPxP;
        this.MP_UTILIZADA = datos.MP_UTILIZADA;
        this.UNIDADES_ALM = datos.UNIDADES_ALM;
        this.VALOR_ALM = datos.VALOR_ALM;
        this.COSTO_PROMEDIO = datos.COSTO_PROMEDIO;
        this.TIPO_MOV = datos.TIPO_MOV;
    }
}
