import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class bancosService {
  ID: Number;
  ID_CUENTA: Number;
  SALDO: Number;

  incicializarVariables() {
    this.ID = 0;
    this.ID_CUENTA = 0;
    this.SALDO = 0;
  }

  llenarCampos(datos){
    this.ID = datos.ID;
    this.ID_CUENTA = datos.ID_CUENTA;
    this.SALDO = datos.SALDO;
  }
}
