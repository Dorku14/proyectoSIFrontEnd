import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class MateriasPrimasService {
    ID: Number;
    CODIGO: string;
    CATEGORIA: string;
    MATERIA_PRIMA: string;
    UNIDAD_MEDIDA: string;
    UNIDADES: Number;
    SALDO: Number;
    ESTATUS: String;

    incicializarVariables() {
        this.ID = 0;
        this.CODIGO = '';
        this.CATEGORIA = '';
        this.MATERIA_PRIMA = '';
        this.UNIDAD_MEDIDA = '';
        this.UNIDADES = 0;
        this.SALDO = 0;
        this.ESTATUS = '';
    }

    llenarCampos(datos){
        this.ID = datos.ID;
        this.CODIGO = datos.CODIGO;
        this.CATEGORIA = datos.CATEGORIA;
        this.MATERIA_PRIMA = datos.MATERIA_PRIMA;
        this.UNIDAD_MEDIDA = datos.UNIDAD_MEDIDA;
        this.UNIDADES = datos.UNIDADES;
        this.SALDO = datos.SALDO;
        this.ESTATUS = datos.ESTATUS;
    }
}
