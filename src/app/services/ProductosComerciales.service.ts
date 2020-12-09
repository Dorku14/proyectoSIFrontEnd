import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductosComercialesService {
  CODIGO: string;
  PRODUCTO: string;
  CANTIDAD: number;
  COSTO_COMPRA: number;
  PRECIOVENT: number;
  COSTACT: number;
  PRECIO_VENTA_ACT: number;
  ESTATUS: string;

  incicializarVariables() {
    this.CODIGO = '';
    this.PRODUCTO = '';
    this.CANTIDAD = 0;
    this.COSTO_COMPRA = 0;
    this.PRECIOVENT = 0;
    this.COSTACT = 0;
    this.PRECIO_VENTA_ACT = 0;
    this.ESTATUS = '';
  }

  llenarCampos(datos) {
    this.CODIGO = datos.CODIGO;
    this.PRODUCTO = datos.PRODUCTO;
    this.CANTIDAD = datos.CANTIDAD;
    this.COSTO_COMPRA = datos.COSTO_COMPRA;
    this.PRECIOVENT = datos.PRECIOVENT;
    this.COSTACT = datos.COSTACT;
    this.PRECIO_VENTA_ACT = datos.PRECIO_VENTA_ACT;
    this.ESTATUS = datos.ESTATUS;

  }
}
