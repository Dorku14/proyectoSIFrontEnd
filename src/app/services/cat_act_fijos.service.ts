import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CatActFijosService {
    ID: Number;
    NOM_CAT: String;
    ACUMULADO: Number;
    ACUMULADO_INI: Number;

    incicializarVariables() {
        this.ID = 0;
        this.NOM_CAT = '';
        this.ACUMULADO = 0;
        this.ACUMULADO_INI = 0;
    }

    llenarCampos(datos: CatActFijosService) {
        this.ID = datos.ID;
        this.NOM_CAT = datos.NOM_CAT;
        this.ACUMULADO = datos.ACUMULADO;
        this.ACUMULADO_INI = datos.ACUMULADO_INI;
    }

}