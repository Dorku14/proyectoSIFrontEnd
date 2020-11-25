import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ProductosComercialesService {
    CODIGO: string;
    PRODUCTO: string;
    CANTIDAD: number;
    PRECIOCOMP:any;
    PRECIOVENT:any;
    COSTACT:any;
    ESTATUS:string;

    incicializarVariables() {
        this.CODIGO = '';
        this.PRODUCTO = '';
        this.CANTIDAD = 0;
        this.PRECIOCOMP = 0;
        this.PRECIOVENT = 0;
        this.COSTACT = 0;
        this.ESTATUS = '';
    }
}
