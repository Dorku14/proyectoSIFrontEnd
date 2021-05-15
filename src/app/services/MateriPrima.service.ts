import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class MateriasPrimasService {
    ID: Number;
    CODIGO: string;
    CATEGORIA: string;
    MATERIA_PRIMA: string;
    UNIDAD_MEDIDA:string;
    
    incicializarVariables() {
        this.ID = 0;
        this.CODIGO = '';
        this.CATEGORIA = '';
        this.MATERIA_PRIMA = '';
        this.UNIDAD_MEDIDA = '';
    }

    llenarCampos(datos){
        this.ID = datos.ID;
        this.CODIGO = datos.CODIGO;
        this.CATEGORIA = datos.CATEGORIA;
        this.MATERIA_PRIMA = datos.MATERIA_PRIMA;
        this.UNIDAD_MEDIDA = datos.UNIDAD_MEDIDA;
    }
}
