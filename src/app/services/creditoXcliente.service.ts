import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class creditoXclienteService {
    LIMITE_CREDITO: number;
    PLAZO: Number;
    CREDITO_DIS :number;

    incicializarVariables() {
        this.LIMITE_CREDITO = 0;
        this.PLAZO = 0;
        this.CREDITO_DIS = 0;
    }

    llenarCampos(datos:creditoXclienteService){
      this.LIMITE_CREDITO = datos.LIMITE_CREDITO;
      this.PLAZO = datos.PLAZO;
      this.CREDITO_DIS = datos.CREDITO_DIS;
    }
}
