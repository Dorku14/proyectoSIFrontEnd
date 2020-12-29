import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ClientesService {
    ID:number;
    NOMBRES: string;
    APELLIDO_P:string;
    APELLIDO_M:string;
    DIRECCION:string;
    FACEBOOK:string;
    CORREO:string;
    RFC:string;
    TELEFONO:string;
    FECHA_NACIMIENTO: string;
    ANTIGUEDAD:Date;
    DESCUENTO:number;
    incicializarVariables() {
      this.ID = 0;
      this.NOMBRES = '';
      this.APELLIDO_P = '';
      this.APELLIDO_M = '';
      this.DIRECCION = '';
      this.FACEBOOK = '';
      this.CORREO = '';
      this.RFC = '';
      this.TELEFONO = '';
      this.FECHA_NACIMIENTO ='';
      this.DESCUENTO = 0;
    }

    llenarCampos(datos:ClientesService){
        this.ID= datos.ID;
        this.NOMBRES = datos.NOMBRES;
        this.APELLIDO_P = datos.APELLIDO_P;
        this.APELLIDO_M = datos.APELLIDO_M;
        this.DIRECCION = datos.DIRECCION;
        this.FACEBOOK = datos.FACEBOOK;
        this.CORREO = datos.CORREO;
        this.RFC = datos.RFC;
        this.TELEFONO = datos.TELEFONO;
        this.FECHA_NACIMIENTO = datos.FECHA_NACIMIENTO;
        this.DESCUENTO = datos.DESCUENTO;
    }
}
