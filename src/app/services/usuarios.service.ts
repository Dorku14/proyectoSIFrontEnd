import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UsuariosService {
    NOMBRE: string;
    APELLIDO_P:string;
    APELLIDO_M:string;
    USUARIO:string;
    CONTRASENIA:string;
    CONFIRM_CONTRASENIA:string;
    TIPO_USUARIO:string;
    ESTATUS:string;


    incicializarVariables() {
        this.NOMBRE = '';
        this.APELLIDO_P = ''
        this.APELLIDO_M = ''
        this.USUARIO = ''
        this.TIPO_USUARIO = ''
        this.CONTRASENIA = ''
        this.CONFIRM_CONTRASENIA = ''
        this.ESTATUS = ''

    }

    llenarCampos(datos:UsuariosService){
      this.NOMBRE = datos.NOMBRE;
      this.APELLIDO_P = datos.APELLIDO_P
      this.APELLIDO_M = datos.APELLIDO_M
      this.USUARIO = datos.USUARIO
      this.CONTRASENIA = datos.CONTRASENIA;
      this.CONFIRM_CONTRASENIA = datos.CONFIRM_CONTRASENIA;
      this.TIPO_USUARIO = datos.TIPO_USUARIO
      this.ESTATUS = datos.ESTATUS
    }

    dameJsonModifcar(){
      let json = {
        NOMBRE:this.NOMBRE,
        APELLIDO_P:this.APELLIDO_P,
        APELLIDO_M:this.APELLIDO_M,
        USUARIO: this.USUARIO,
        TIPO_USUARIO:this.TIPO_USUARIO,
        ESTATUS:this.ESTATUS
      }
      return json;
    }

    dameJsonAlta(){
      let json = {
        NOMBRE:this.NOMBRE,
        APELLIDO_P:this.APELLIDO_P,
        APELLIDO_M:this.APELLIDO_M,
        USUARIO: this.USUARIO,
        CONTRASENIA : this.CONTRASENIA,
        CONFIRM_CONTRASENIA : this.CONFIRM_CONTRASENIA,
        TIPO_USUARIO:this.TIPO_USUARIO,
        ESTATUS:this.ESTATUS
      }
      return json;
    }
}
