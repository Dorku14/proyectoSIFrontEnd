import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ProductosFabricadosService {
    CODIGO: string;
    PRODUCTO: string;
    CANTIDAD: number;
    PRECIO_COMPRA:any;
    PRECIO_VENTA:any;
    COSTO_ACTUALIZADO:any;
    PRECIO_VENT_ACT:any;
    INVENTARIO:number;
    PUNTO_REORDEN:number;

    incicializarVariables() {
        this.CODIGO = '';
        this.PRODUCTO = '';
        this.CANTIDAD = 0;
        this.PRECIO_COMPRA = 0;
        this.PRECIO_VENTA = 0;
        this.COSTO_ACTUALIZADO = 0;
        this.PRECIO_VENT_ACT = 0;
        this.INVENTARIO = 0;
        this.PUNTO_REORDEN = 0;
    }

    llenarCampos(datos){
        this.CODIGO = datos.CODIGO;
        this.PRODUCTO = datos.PRODUCTO;
        this.CANTIDAD = Number(datos.CANTIDAD);
        this.PRECIO_COMPRA = Number(datos.PRECIO_COMPRA);
        this.PRECIO_VENTA = Number(datos.PRECIO_VENTA);
        this.COSTO_ACTUALIZADO = Number(datos.COSTO_ACTUALIZADO);
        this.PRECIO_VENT_ACT = Number(datos.PRECIO_VENT_ACT);
        this.INVENTARIO = Number(datos.INVENTARIO);
        this.PUNTO_REORDEN = Number(datos.PUNTO_REORDEN);
    }
}
