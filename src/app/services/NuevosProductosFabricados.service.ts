import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NuevosProductosFabricadosService {
  CODIGO: string;
  NOM_PRODUCTO: string;
  COSTO_UNIDAD: number;
  UNIDADES: number;
  SALDO: number;
  VALOR_ALMACEN: number;
  ESTATUS: number;

  incicializarVariables() {
    this.CODIGO = '';
    this.NOM_PRODUCTO = '';
    this.COSTO_UNIDAD = 0;
    this.SALDO = 0;
    this.UNIDADES = 0;
    this.VALOR_ALMACEN = 0;
    this.ESTATUS = 0;
  }

  llenarCampos(datos) {
    this.CODIGO = datos.CODIGO;
    this.NOM_PRODUCTO = datos.NOM_PRODUCTO;
    this.COSTO_UNIDAD = Number(datos.COSTO_UNIDAD);
    this.SALDO = Number(datos.SALDO);
    this.VALOR_ALMACEN = Number(datos.VALOR_ALMACEN);
    this.ESTATUS = Number(datos.ESTATUS);
    this.UNIDADES = Number(datos.UNIDADES);
  }
}