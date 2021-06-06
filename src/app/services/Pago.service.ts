import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class pagoService {
    // pendiente
  ID: number;
  ID_CLIENTE: number;
  SALDO: number;
  FECHA: string;
  MONTOaBONAR: number;
  FORMA_PAGO: string;

  incicializarVariables() {
    this.ID = 0;
    this.ID_CLIENTE = 0;
    this.SALDO = 0;
    this.FECHA = '';
    this.MONTOaBONAR = 0;
    this.FORMA_PAGO = 'E';
  }

  llenarCampos(datos: pagoService) {
    this.ID = datos.ID;
    this.ID_CLIENTE = datos.ID_CLIENTE;
    this.SALDO = datos.SALDO;
    this.FECHA = datos.FECHA;
    this.MONTOaBONAR = datos.MONTOaBONAR;
    this.FORMA_PAGO = datos.FORMA_PAGO;
  }
}
