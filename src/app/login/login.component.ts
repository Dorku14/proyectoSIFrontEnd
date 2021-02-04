import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EXITO, NOEXISTE } from '../sharedModules/constantes';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Usuario: string;
  Contrasenia: string;
  isCargando: boolean = false;;
  constructor(public generalFunc: FuncionesGenerales, private peticiones: PeticionesWebComponent, private router: Router, private cookieService:CookieService,) { }

  ngOnInit(): void {
  }

  iniciarSesion() {
    if (!this.vallidarCampos()) {
      let json: any = {};

      json.USUARIO = this.Usuario;
      json.CONTRASENIA = this.Contrasenia;

      this.mostrarCargado();

      this.peticiones.peticionPost(json, 'login').then((resultado: any) => {
        console.log(resultado);

        if (this.generalFunc.extraerCodigo(resultado) == EXITO) {
          debugger
          let datos = resultado.datos.Token;
          this.cookieService.put("idSession",datos);
          this.router.navigateByUrl('/TuNegocio');
        } else {
          if (this.generalFunc.extraerCodigo(resultado) == NOEXISTE) {
            this.generalFunc.mostrarMensajeError('top-right-login', 'error', 'Error', 'El usuario o contraseña son incorrectas');
            this.generalFunc.otorgaFoco('usuario');
          }
        }
        this.quitarCargando();
      }).catch((error) => {
        console.log(error);
        this.generalFunc.mensajeConfirmacion('top-right-login',"error", "Ocurrió un error","Hubo un error en el servidor, inténtelo más tarde");
        this.quitarCargando();
      });

    }
  }

  vallidarCampos() {
    let Error: boolean = false;
    if (this.generalFunc.EsVacioNulo(this.Usuario)) {
      this.generalFunc.mostrarMensajeError('top-right-login', 'error', 'Campo vacío', 'El campo usuario está vacío');
      this.generalFunc.otorgaFoco('usuario');
      Error = true;
    } else {
      if (this.generalFunc.EsVacioNulo(this.Contrasenia)) {
        this.generalFunc.mostrarMensajeError('top-right-login', 'error', 'Campo vacío', 'El campo contraseña está vacío');
        this.generalFunc.otorgaFoco('pass');
        Error = true;
      }
    }
    return Error;
  }

  /**
     *\brief   Función que activa el componente cargando
     *\author  Alexis Osvaldo Dorantes Ku
     *\date    23/09/2020
     *\version	1.00.00
 */
  mostrarCargado() {
    this.isCargando = this.generalFunc.onCargando();
  }

  /**
    *\brief   Función que desactiva el componente cargando
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
  */
  quitarCargando() {
    this.isCargando = this.generalFunc.offCargando();
  }

  presionarBoton(e){
    if(e.key === 'Enter'){
      this.iniciarSesion();
    }
  }
}
