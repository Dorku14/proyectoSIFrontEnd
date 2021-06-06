import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class mov_ProductosFabricadosService {
  ID_PF: Number;
  FECHA: string;
  ESTATUS: String;
  FOLIO: String;
  UNIDADES: number;
  VALOR_UNIDAD: number;
  IMPORTE: number;
  CLIENTE: String;
  ENTRADA: String;
  COSTO_VENTA: number;
  GANANCIA: number;
  TIPO_MOV: String;
  TOTAL: number;

  incicializarVariables() {
    this.ID_PF = 0;
    this.FECHA = '';
    this.ESTATUS = '';
    this.UNIDADES = 0;
    this.FOLIO = '';
    this.VALOR_UNIDAD = 0;
    this.IMPORTE = 0;
    this.CLIENTE = '';
    this.ENTRADA = '';
    this.COSTO_VENTA = 0;
    this.GANANCIA = 0;
    this.TIPO_MOV = '';
    this.TOTAL = 0;
  }

  llenarCampos(datos) {
    this.ID_PF = datos.ID_PF;
    this.FECHA = datos.FECHA;
    this.ESTATUS = datos.ESTATUS;
    this.UNIDADES = datos.UNIDADES;
    this.VALOR_UNIDAD = datos.VALOR_UNIDAD;
    this.ESTATUS = datos.ESTATUS;
    this.IMPORTE = datos.IMPORTE;
    this.CLIENTE = datos.CLIENTE;
    this.ENTRADA = datos.ENTRADA;
    this.COSTO_VENTA = datos.COSTO_VENTA;
    this.GANANCIA = datos.GANANCIA;
    this.TIPO_MOV = datos.TIPO_MOV;
    this.TOTAL = datos.TOTAL;
  }
}