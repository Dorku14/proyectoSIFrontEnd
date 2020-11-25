import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class MateriasPrimasService {
    CODIGO: string;
    CATEGORIA: string;
    MATERIA_PRIMA: string;
    UNIDAD_MEDIDA:string;
    CANTIDAD:any;
    PRECIO_VENTA:any;
    COSTO_COMPRA:any;
    COSTEO_PROMEDIO_RECIENTE:any;
    PRECIO_VENTA_ACTUALIZADO:any;
    INVENTARIO:number;
    PUNTO_REORDEN:number
    incicializarVariables() {
        this.CODIGO = '';
        this.CATEGORIA = '';
        this.MATERIA_PRIMA = '';
        this.UNIDAD_MEDIDA = '';
        this.CANTIDAD = 0;
        this.PRECIO_VENTA = 0;
        this.COSTO_COMPRA = 0;
        this.COSTEO_PROMEDIO_RECIENTE = 0;
        this.PRECIO_VENTA_ACTUALIZADO = 0;
        this.INVENTARIO = 0;
        this.PUNTO_REORDEN = 0;
    }

    llenarCampos(datos){
        this.CODIGO = datos.CODIGO;
        this.CATEGORIA = datos.CATEGORIA;
        this.MATERIA_PRIMA = datos.MATERIA_PRIMA;
        this.UNIDAD_MEDIDA = datos.UNIDAD_MEDIDA;
        this.CANTIDAD = datos.CANTIDAD;
        this.PRECIO_VENTA = datos.PRECIO_VENTA;
        this.COSTO_COMPRA = datos.COSTO_COMPRA;
        this.COSTEO_PROMEDIO_RECIENTE = datos.COSTEO_PROMEDIO_RECIENTE;
        this.PRECIO_VENTA_ACTUALIZADO = datos.PRECIO_VENTA_ACTUALIZADO;
        this.INVENTARIO = datos.INVENTARIO;
        this.PUNTO_REORDEN = datos.PUNTO_REORDEN;
    }
}
