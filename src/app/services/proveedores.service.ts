import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class proveedoresService {
  ID: number;
  CODIGO: string;
  PERZONALIDAD_FISICA: string;
  RAZON_SOCIAL: string;
  RFC: string;
  NOMBRE: string;
  APELLIDO_P: string;
  APELLIDO_M: string;
  CORREO: string;
  NOTAS: string;
  P_CALLE: string;
  P_NUMERO: string;
  P_COLONIA: string;
  P_CORREO: string;
  P_RECIBE_PED_ELECTRONICOS: string;
  P_CELULAR: string;
  P_TEL_OFICINA: string;
  ESTATUS: string;

  incicializarVariables() {
    this.ID = 0;
    this.CODIGO = '';
    this.PERZONALIDAD_FISICA = '';
    this.RAZON_SOCIAL = '';
    this.RFC = '';
    this.NOMBRE = '';
    this.APELLIDO_P = '';
    this.APELLIDO_M = '';
    this.CORREO = '';
    this.NOTAS = '';
    this.P_CALLE = '';
    this.P_NUMERO = '';
    this.P_COLONIA = '';
    this.P_CORREO = '';
    this.P_RECIBE_PED_ELECTRONICOS = '';
    this.P_CELULAR = '';
    this.P_TEL_OFICINA = '';
    this.ESTATUS = '';
  }

  llenarCampos(datos: proveedoresService) {
    this.ID = datos.ID;
    this.CODIGO = datos.CODIGO;
    this.PERZONALIDAD_FISICA = datos.PERZONALIDAD_FISICA;
    this.RAZON_SOCIAL = datos.RAZON_SOCIAL;
    this.RFC = datos.RFC;
    this.NOMBRE = datos.NOMBRE;
    this.APELLIDO_P = datos.APELLIDO_P;
    this.APELLIDO_M = datos.APELLIDO_M;
    this.CORREO = datos.CORREO;
    this.NOTAS = datos.NOTAS;
    this.P_CALLE = datos.P_CALLE;
    this.P_NUMERO = datos.P_NUMERO;
    this.P_COLONIA = datos.P_COLONIA;
    this.P_CORREO = datos.P_CORREO;
    this.P_RECIBE_PED_ELECTRONICOS = datos.P_RECIBE_PED_ELECTRONICOS;
    this.P_CELULAR = datos.P_CELULAR;
    this.P_TEL_OFICINA = datos.P_TEL_OFICINA;
    this.ESTATUS = datos.ESTATUS;
  }

  dameJsonEntrada() {
    let json = {
      ID: this.ID,
      CODIGO: this.CODIGO,
      PERZONALIDAD_FISICA: this.PERZONALIDAD_FISICA,
      RAZON_SOCIAL: this.RAZON_SOCIAL,
      RFC: this.RFC,
      NOMBRE: this.NOMBRE,
      APELLIDO_P: this.APELLIDO_P,
      APELLIDO_M: this.APELLIDO_M,
      CORREO: this.CORREO,
      NOTAS: this.NOTAS,
      P_CALLE: this.P_CALLE,
      P_NUMERO: this.P_NUMERO,
      P_COLONIA: this.P_COLONIA,
      P_CORREO: this.P_CORREO,
      P_RECIBE_PED_ELECTRONICOS: this.P_RECIBE_PED_ELECTRONICOS,
      P_CELULAR: this.P_CELULAR,
      P_TEL_OFICINA: this.P_TEL_OFICINA,
      ESTATUS: this.ESTATUS
    }

    return json;
  };

}
