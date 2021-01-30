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
    AGREGAR_USU:number;
    AGREGAR_PRODUC:number;
    REALIZAR_VEN:number;
    REALIZAR_COM:number;
    ACCESO_PRODUC:number;
    VER_REPORTES:number;


    incicializarVariables() {
        this.NOMBRE = '';
        this.APELLIDO_P = ''
        this.APELLIDO_M = ''
        this.USUARIO = ''
        this.TIPO_USUARIO = ''
        this.CONTRASENIA = ''
        this.CONFIRM_CONTRASENIA = ''
        this.ESTATUS = ''
        this.AGREGAR_USU = 0
        this.AGREGAR_PRODUC = 0
        this.REALIZAR_VEN = 0
        this.REALIZAR_COM = 0
        this.ACCESO_PRODUC = 0
        this.VER_REPORTES = 0

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
      this.AGREGAR_USU = datos.AGREGAR_USU
      this.AGREGAR_PRODUC = datos.AGREGAR_PRODUC
      this.REALIZAR_VEN = datos.REALIZAR_VEN
      this.REALIZAR_COM = datos.REALIZAR_COM
      this.ACCESO_PRODUC = datos.ACCESO_PRODUC
      this.VER_REPORTES = datos.VER_REPORTES

    }

    dameJsonModifcar(){
      let json = {
        NOMBRE:this.NOMBRE,
        APELLIDO_P:this.APELLIDO_P,
        APELLIDO_M:this.APELLIDO_M,
        USUARIO: this.USUARIO,
        TIPO_USUARIO:this.TIPO_USUARIO,
        ESTATUS:this.ESTATUS,
        AGREGAR_USU:this.AGREGAR_USU,
        AGREGAR_PRODUC:this.AGREGAR_PRODUC,
        REALIZAR_VEN:this.REALIZAR_VEN,
        REALIZAR_COM:this.REALIZAR_COM,
        ACCESO_PRODUC:this.ACCESO_PRODUC,
        VER_REPORTES:this.VER_REPORTES
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
        ESTATUS:this.ESTATUS,
        AGREGAR_USU:this.AGREGAR_USU,
        AGREGAR_PRODUC:this.AGREGAR_PRODUC,
        REALIZAR_VEN:this.REALIZAR_VEN,
        REALIZAR_COM:this.REALIZAR_COM,
        ACCESO_PRODUC:this.ACCESO_PRODUC,
        VER_REPORTES:this.VER_REPORTES
      }
      return json;
    }
}
