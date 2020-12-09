import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductosFabricadosService {
  CODIGO: string;
  PRODUCTO: string;
  CANTIDAD: number;
  COSTO_PRODUCCION: number;
  PRECIO_VENTA: number;
  COSTO_ACTUALIZADO: number;
  PRECIO_VENT_ACT: number;
  PUNTO_REORDEN:number;
  incicializarVariables() {
    this.CODIGO = '';
    this.PRODUCTO = '';
    this.CANTIDAD = 0;
    this.PRECIO_VENTA = 0;
    this.COSTO_PRODUCCION = 0;
    this.COSTO_ACTUALIZADO = 0;
    this.PRECIO_VENT_ACT = 0;
    this.PUNTO_REORDEN = 0
  }

  llenarCampos(datos) {
    this.CODIGO = datos.CODIGO;
    this.PRODUCTO = datos.PRODUCTO;
    this.CANTIDAD = Number(datos.CANTIDAD);
    this.PRECIO_VENTA = Number(datos.PRECIO_VENTA);
    this.COSTO_ACTUALIZADO = Number(datos.COSTO_ACTUALIZADO);
    this.PRECIO_VENT_ACT = Number(datos.PRECIO_VENT_ACT);
    this.COSTO_PRODUCCION = Number(datos.COSTO_PRODUCCION);
    this.PUNTO_REORDEN = Number(datos.PUNTO_REORDEN);
  }
}
