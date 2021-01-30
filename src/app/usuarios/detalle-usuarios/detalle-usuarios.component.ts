import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, EXITO, NOEXISTE } from 'src/app/sharedModules/constantes';
import { CategoriaService } from 'src/app/services/Categoria.service';
import { UnidadDeMedidaService } from 'src/app/services/UnidadDeMedida.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-detalle-usuarios',
  templateUrl: './detalle-usuarios.component.html',
  styleUrls: ['./../../productos-comerciales/detalle-productos-comerciales/detalle-productos-comerciales.component.scss']
})
export class DetalleUsuariosComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  listaEstatus: Array<any>;
  listaTipoUsuario: Array<any>;
  indiceTabsActivo:number = 0;
  constructor(public dialogRef: MatDialogRef<DetalleUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public UsuarioSrv: UsuariosService,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales) {
    this.inicializaListaTipoUsuario();
    this.inicializaListaEstatus();
  }

  ngOnInit(): void {
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.UsuarioSrv.incicializarVariables();
  }

  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de usuarios';
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle de usuario';
        if (!this.funcGenerales.EsVacioNulo(this.itemSeleccionado)) {
          this.consultaDetalle(this.itemSeleccionado);
        }
        break;
    }
  }
  CerrarVentana() {
    this.dialogRef.close();
  }
  validarTyping(e, campo) {
    let respuesta: boolean = true;
    let valor = Number(e.key);
    // switch (campo) {
    //   case 'CANTIDAD':
    //     if (isNaN(valor)) {
    //       respuesta = false;
    //     }
    //     break;
    // }
    if (isNaN(valor)) {
      respuesta = false;
    }
    return respuesta;
  }


  consultaDetalle(item) {
    this.mostrarCargado();
    let json: any = {};
    json.USUARIO = item.USUARIO;;
    this.peticiones.peticionPost(json, 'detalleUsuario').then((resultado: any) => {
      console.log(resultado);
      let datos = resultado.datos[0];
      this.llenarCampoDetalle(datos);
    }).catch((error) => {
      console.log(error);
      this.quitarCargando();
    });
  }


  llenarCampoDetalle(datos: UsuariosService) {
    this.UsuarioSrv.llenarCampos(datos);
    this.quitarCargando();
  }

  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }
  guardar() {
    let json: any = {};

    switch (this.modo) {
      case MODO.ALTA:
        if (this.validaAlta()) {
         json = this.UsuarioSrv.dameJsonAlta();
          this.validaRegistro().then((resultado) => {
            if (resultado === NOEXISTE) {
              this.peticiones.peticionPost(json, 'altaUsuario').then((resultado: any) => {
                console.log('resultado then');
                console.log(resultado);
                this.quitarCargando();
                this.UsuarioSrv.incicializarVariables();
                this.CerrarVentana();
              }).catch((error) => {
                console.log('error');
                console.log(error);
                this.quitarCargando();
              });
            }
          });
        }

        break;
      case MODO.MODIFICAR:
        json = this.UsuarioSrv.dameJsonModifcar();
        this.peticiones.peticionPost(json, 'modificarUsuario').then((resultado: any) => {
          console.log('resultado then');
          console.log(resultado);
          this.quitarCargando();
          this.UsuarioSrv.incicializarVariables();
          this.CerrarVentana();
        }).catch((error) => {
          console.log('error');
          console.log(error);
          this.quitarCargando();
        });
        break;
      case MODO.REACTIVAR:
        json.ESTATUS = 'A';
        this.peticiones.peticionPost(json, 'reactivarUsuario').then((resultado: any) => {
          console.log('resultado then');
          console.log(resultado);
          this.quitarCargando();
          this.UsuarioSrv.incicializarVariables();
          this.CerrarVentana();
        }).catch((error) => {
          console.log('error');
          console.log(error);
          this.quitarCargando();
        });
        break;
    }

  }

  validaRegistro() {
    return new Promise((resolve, reject) => {
      if (!this.funcGenerales.EsVacioNulo(this.UsuarioSrv.USUARIO))
        this.mostrarCargado();
      let json: any = {};
      json.USUARIO = this.UsuarioSrv.USUARIO;
      this.peticiones.peticionPost(json, 'detalleUsuario').then((resultado: any) => {
        this.quitarCargando();
        let codigoR = this.funcGenerales.extraerCodigo(resultado)
        if (this.funcGenerales.extraerCodigo(resultado) == '00') {
          let datos = resultado.datos[0];
          this.datosTemporales = datos;
          if (datos.ESTATUS === 'B') {
            this.funcGenerales.mensajeConfirmacion('confirm','warn','Ya existe','El usuario ya existe pero está dado de baja, ¿Deseas reactivarlo?',true);


            // this.funcGenerales.popUpAlerta('Error', 'La unidad de medida ya existe pero está dado de baja, ¿Deseas reactivarlo?', 'Si', 'No').then((respuesta) => {
            //   if (respuesta) {
            //     this.reactivar();
            //   } else {
            //     this.funcGenerales.otorgaFoco('codigo');

            //   }
            // });
          } else {
            this.funcGenerales.popUpAlerta('Error', 'la unidad de medida ya existe', 'Aceptar', '').then((respuesta) => {
              this.funcGenerales.otorgaFoco('codigo');

            });

          }
          resolve(this.funcGenerales.extraerCodigo(resultado));
        }
        resolve(codigoR);

      }).catch((error) => {
        console.log(error);
        this.quitarCargando();
        reject();
      });
    });

  }

  Confirmar(){

  }

  Cancelar(){

  }
  reactivar() {
    this.modo = MODO.REACTIVAR;
    this.llenarCampoDetalle(this.datosTemporales);
    this.guardar();
  }

  presionaBoton(e: KeyboardEvent) {
    if (e.key == 'Escape') {
      this.CerrarVentana();
    }
  }

  ObtenerFoco(e) {
    e.target.select()
  }

  inicializaListaTipoUsuario() {
    this.listaTipoUsuario = [
      { ID: "A", DESCRIPCION: "Adminstrador" },
      { ID: "C", DESCRIPCION: "Cajero" }
    ]
  }

  inicializaListaEstatus() {
    this.listaEstatus = [
      { ID: "A", DESCRIPCION: "Activo" },
      { ID: "B", DESCRIPCION: "Baja" }
    ]
  }

  validaAlta(): boolean {
    let respuesta = true;
    if (this.funcGenerales.EsVacioNulo(this.UsuarioSrv.USUARIO) ) {
      respuesta = false;
      this.funcGenerales.mensajeConfirmacion('error','error','Campo vacío','El campo "usuario" es obligatorio',false);
      this.funcGenerales.otorgaFoco("usuario");
    }
    if (this.funcGenerales.EsVacioNulo(this.UsuarioSrv.NOMBRE) && respuesta) {
      respuesta = false;
      this.funcGenerales.mensajeConfirmacion('error','error','Campo vacío','El campo "nombre" es obligatorio',false);
      this.funcGenerales.otorgaFoco("nombre");
    }
    if (this.funcGenerales.EsVacioNulo(this.UsuarioSrv.APELLIDO_P) && respuesta) {
      respuesta = false;
      this.funcGenerales.mensajeConfirmacion('error','error','Campo vacío','El campo "apellido" paterno es obligatorio',false);
      this.funcGenerales.otorgaFoco("apellido_p");
    }
    if (this.funcGenerales.EsVacioNulo(this.UsuarioSrv.CONTRASENIA) && respuesta) {
      respuesta = false;
      this.funcGenerales.mensajeConfirmacion('error','error','Campo vacío','El campo "contraseña" es obligatorio',false);
      this.funcGenerales.otorgaFoco("contrasenia");
    }
    if (this.funcGenerales.EsVacioNulo(this.UsuarioSrv.CONFIRM_CONTRASENIA) && respuesta) {
      respuesta = false;
      this.funcGenerales.mensajeConfirmacion('error','error','Campo vacío','El campo "confirmar contraseña" es obligatorio',false);
      this.funcGenerales.otorgaFoco("Confim_contrasenia");
    }
    if(this.funcGenerales.EsVacioNulo(this.UsuarioSrv.TIPO_USUARIO) && respuesta){
      respuesta = false;
      this.funcGenerales.mensajeConfirmacion('error','error','Campo vacío','El campo "tipo de usuario" es obligatorio',false);
      this.funcGenerales.otorgaFoco("tipo_usuario");
    }

    if(respuesta){
      if(this.UsuarioSrv.CONTRASENIA != this.UsuarioSrv.CONFIRM_CONTRASENIA){
        respuesta = false;
        this.funcGenerales.mensajeConfirmacion('error','error','Error','Las contraseñas no coinciden',false);
        this.funcGenerales.otorgaFoco("Confim_contrasenia");
      }
    }

    return respuesta;
  }

  tabsActivos=(indice :number)=>{
    return this.funcGenerales.tabsActivos(indice, this.indiceTabsActivo);
  }
}


