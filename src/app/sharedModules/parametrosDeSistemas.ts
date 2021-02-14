import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie';
import { FuncionesGenerales } from './funcionesgenerales';
import { PeticionesWebComponent } from './peticiones-web/peticiones-web.component';

@Injectable({
  providedIn: 'root'
})
export class parametrosDeSistema {
  formatoFecha: string[];
  isCargando: boolean = false;
  perfilUsuario:any;
  constructor(public dialog: MatDialog,
     private peticiones: PeticionesWebComponent,
     private funcGenerales: FuncionesGenerales,private cookieService:CookieService) {

  }


  consultaltaUsuarios=()=> {
    return new Promise((resolve,reject)=>{
      let json:any={};
      json.TOKEN = this.cookieService.get('idSession');
      this.mostrarCargado();
      this.peticiones.peticionPost(json, 'UsuarioToken').then((resultado: any) => {
        (resultado);
        this.perfilUsuario = resultado.datos[0];
        this.quitarCargando();
        resolve("");
        // return this.perfilUsuario;
      }).catch((error) => {
        (error);
        this.isCargando = false;
        this.quitarCargando();
        reject(error);
      });
    });

  }


  /**
       *\brief   Función que activa el componente cargando
       *\author  Alexis Osvaldo Dorantes Ku
       *\date    23/09/2020
       *\version	1.00.00
   */
  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  /**
    *\brief   Función que desactiva el componente cargando
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
  */
  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }

  consultasConfigCaja() {

  }

  getDatosUsuario=()=>{
    return this.perfilUsuario.TIPO_USUARIO;
  }
}
