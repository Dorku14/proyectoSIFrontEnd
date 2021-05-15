import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CatActFijosService {
    ID: Number;
    NOM_CAT: String;
    ACUMULADO: Number;

    incicializarVariables() {
        this.ID = 0;
        this.NOM_CAT = '';
        this.ACUMULADO = 0;
    }

    llenarCampos(datos: CatActFijosService) {
        this.ID = datos.ID;
        this.NOM_CAT = datos.NOM_CAT;
        this.ACUMULADO = datos.ACUMULADO;
    }

}