import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class adminEmpresasService {
  NUM: Number;
  Empresa: string;
  Fecha: string;
  Email:string;
  Telefono:string;
  Estatus:string;

  incicializarVariables() {
    this.NUM = 0;
    this.Empresa = '';
    this.Fecha = Date.now().toString();
    this.Email = '';
    this.Estatus ='verified'
    this.Telefono = ''
  }

  llenarCampos(datos:adminEmpresasService){
    this.NUM = datos.NUM;
    this.Empresa = datos.Empresa;
    this.Fecha = datos.Fecha;
    this.Email = datos.Email;
    this.Estatus =datos.Estatus;
    this.Telefono = datos.Telefono;
  }
}
