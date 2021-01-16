import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class cuentasService {
    ID: number;
    NUMERO_CTA: string;
    PROPIEDAD: string;
    ID_PROVEEDOR: string;
    BANCO: string;
    ESTATUS: string;
  
    incicializarVariables() {
      this.ID = 0;
      this.NUMERO_CTA = '';
      this.PROPIEDAD = '';
      this.ID_PROVEEDOR = '';
      this.BANCO = '';
      this.ESTATUS = '';
    }
  
    llenarCampos(datos: cuentasService) {
      this.ID = datos.ID;
      this.NUMERO_CTA = datos.NUMERO_CTA;
      this.PROPIEDAD = datos.PROPIEDAD;
      this.ID_PROVEEDOR = datos.ID_PROVEEDOR;
      this.BANCO = datos.BANCO;
      this.ESTATUS = datos.ESTATUS;
    }
  
    dameJsonEntrada() {
      let json = {
        ID: this.ID,
        NUMERO_CTA: this.NUMERO_CTA,
        PROPIEDAD: this.PROPIEDAD,
        ID_PROVEEDOR: this.ID_PROVEEDOR,
        BANCO: this.BANCO,
        ESTATUS: this.ESTATUS,
      }
  
      return json;
    };
  }