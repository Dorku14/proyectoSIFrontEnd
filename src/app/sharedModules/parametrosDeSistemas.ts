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
  perfiles:any;
  perfil:any
  constructor(public dialog: MatDialog,
     private peticiones: PeticionesWebComponent,
     private funcGenerales: FuncionesGenerales,private cookieService:CookieService) {
      this.perfiles = [{
        "Empresa": "Botanas alexis",
        "Fecha_Proximo_Pago": "2/05/2021",
        "Ultimo_fecha_pago": "2/04/2021",
        "Email": "Lorem.ipsum.dolor@bibendumullamcorperDuis.net",
        "Telefono": "1-835-454-0165",
        "Tipo_Membresia": 1
      },
      {
        "Empresa": "Purus Ac Tellus Institute",
        "Fecha_Proximo_Pago": "03/05/2021",
        "Ultimo_fecha_pago": "03/02/2021",
        "Email": "interdum.feugiat@acurna.edu",
        "Telefono": "1-619-272-8274",
        "Tipo_Membresia": 3
      }]
      this.perfil = this.perfiles[0];
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
