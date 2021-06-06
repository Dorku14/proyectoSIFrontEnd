import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Creditos {
    NOM_CREDITO: String;
    PLAZO: String;

    incicializarVariables() {
        this.NOM_CREDITO = '';
        this.PLAZO = '';
    }

    llenarCampos(datos: Creditos) {
        this.NOM_CREDITO = datos.NOM_CREDITO;
        this.PLAZO = datos.PLAZO;
    }

}