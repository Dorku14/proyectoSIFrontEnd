import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, EXITO, NOEXISTE, mascaraMoneda } from 'src/app/sharedModules/constantes';
import { ServiciosService } from 'src/app/services/servicios.service';
import { cuentasService } from 'src/app/services/cuentas.service';
import { proveedoresService } from 'src/app/services/proveedores.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-detalle-cuentas',
  templateUrl: './detalle-cuentas.component.html',
  styleUrls: ['./../../productos-comerciales/detalle-productos-comerciales/detalle-productos-comerciales.component.scss'],

})
export class DetalleCuentasComponent implements OnInit {
  @ViewChild('matTabGrupo', { static: false }) matTabGrupo: MatTabGroup;
  modo: any;
  DesabilitarIDProveedor: boolean = true;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  mascaraMoneda: any
  listaPropiedad: Array<{ ID, Descrip }>;
  listaProveedores: Array<{ ID, CODIGO,NOMBRE,APELLIDO_P }>;
  colorCampo:string = 'primary';
  hayError:boolean = false;
  listaEstatus:Array<{ ID, Descrip }>;
  OpcionesSINO:Array<{ ID, Descrip }>;
  indiceTabsActivo:number = 0;
  constructor(public dialogRef: MatDialogRef<DetalleCuentasComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public CuentasSRV: cuentasService,
    public ProveedoresSRV: proveedoresService,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales) {
      this.mascaraMoneda = mascaraMoneda;
      this.listaEstatus = this.funcGenerales.dameOpcionesEstatus();
      this.OpcionesSINO = this.funcGenerales.dameOpcionesBoleanos();
  }

  ngOnInit(): void {
    debugger
    this.generarPropiedad();
    this.consultaProveedores();
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.CuentasSRV.incicializarVariables();
    this.ProveedoresSRV.incicializarVariables();
  }

  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de cuentas';
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle de cuentas';
        if (!this.funcGenerales.EsVacioNulo(this.itemSeleccionado)) {
          this.consultaDetalle(this.itemSeleccionado);
        }
        break;
    }
  }

  consultaDetalle(item) {
    this.mostrarCargado();

    let json: any = {};
    json.NUMERO_CTA = item.NUMERO_CTA;
    this.peticiones.peticionPost(json, 'detalleCuentas').then((resultado: any) => {
      console.log(resultado);
      let datos = resultado.datos[0];
      this.llenarCampoDetalle(datos);
    }).catch((error) => {
      console.log(error);
      this.quitarCargando();
    });
  }

  llenarCampoDetalle(datos: any) {
    this.CuentasSRV.llenarCampos(datos);
    if(datos.PROPIEDAD == "P"){
      this.DesabilitarIDProveedor = false;
    }
    else{
      this.DesabilitarIDProveedor = true;
    }
    this.quitarCargando();
  }

  consultaProveedores(){
    let json: any = {};
    this.peticiones.peticionPost({}, 'consultaProveedores').then((resultado: any) => {
      console.log(resultado);
      let datos = resultado;
      this.listaProveedores = datos;
    }).catch((error) => {
      console.log(error);
      this.quitarCargando();
    });
  }

  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }

  generarPropiedad() {
    this.listaPropiedad = [
      { ID: 'M', Descrip: 'Mío' },
      { ID: 'P', Descrip: 'Proveedor' }
    ]
  }

  CerrarVentana() {
    this.dialogRef.close();
  }

  presionaBoton(e: KeyboardEvent) {
    if (e.key == 'Escape') {
      this.CerrarVentana();
    }
  }

  validarTyping(e, campo) {
    let respuesta: boolean = true;
    let valor = e.key;
    switch (campo) {
      case 'PRECIOVENT':
        // respuesta = this.funcGenerales.permiteNumerico(this.ServiciosSrv.PRECIO_VENT, valor);
        break;
      case 'PRECIO_VENT_ACT':
        // respuesta = this.funcGenerales.permiteNumerico(this.ServiciosSrv.PRECIO_VENT_ACT,valor);
        break;
      case 'PRECIOPAGO':
        // respuesta = this.funcGenerales.permiteNumerico(this.ServiciosSrv.PAGO_EMPLEADO, valor);
        break;
    }
    // if (isNaN(valor)) {
    //   respuesta = false;
    // }
    return respuesta;
  }

  perderFoco(campo) {
    this.cambiarColorCampo(false);
    switch (campo) {
      case 'PRECIOVENT':

        break;
      case 'PRECIO_VENT_ACT':
        // if(this.funcGenerales.EsVacioNulo(this.ServiciosSrv.PRECIO_VENT_ACT))
        // this.ServiciosSrv.PRECIO_VENT_ACT = 0;
        break;
      case 'PRECIOPAGO':

        break;
    }
  }

  ObtenerFoco(e) {
    e.target.select()
  }

  cambiarColorCampo(valor:boolean){
    if(valor){
      this.colorCampo = 'warn';
    }else{
      this.colorCampo = 'primary';
    }
  }

  tabsActivos=(indice :number)=>{
    return this.funcGenerales.tabsActivos(indice, this.indiceTabsActivo);
  }

  guardar() {
    // this.showError();
    if (this.funcGenerales.EsVacioNulo(this.CuentasSRV.NUMERO_CTA)) {
      this.funcGenerales.mostrarMensajeError('arribaDerecha','error','Campo vacío','Debes llenar el campo número de cuenta',false);
      this.cambiarColorCampo(true);
      this.funcGenerales.otorgaFoco('numero_cta');
    } else {
      let json = this.CuentasSRV.dameJsonEntrada();
      switch (this.modo) {
        case MODO.ALTA:
          json.ESTATUS = 'A';
          this.validaRegistro().then((resultado) => {
            if (resultado === NOEXISTE) {
              this.peticiones.peticionPost(json, 'altaCuentas').then((resultado: any) => {
                console.log('resultado then');
                console.log(resultado);
                this.quitarCargando();
                this.CuentasSRV.incicializarVariables();
                this.CerrarVentana();
              }).catch((error) => {
                console.log('error');
                console.log(error);
                this.quitarCargando();
              });
            }
          });
          break;
        case MODO.MODIFICAR:
          this.peticiones.peticionPost(json, 'modificarCuentas').then((resultado: any) => {
            console.log('resultado then');
            console.log(resultado);
            this.quitarCargando();
            this.CuentasSRV.incicializarVariables();
            this.CerrarVentana();
          }).catch((error) => {
            console.log('error');
            console.log(error);
            this.quitarCargando();
          });
          break;
        case MODO.REACTIVAR:
          json.ESTATUS = 'A';
          this.peticiones.peticionPost(json, 'reactivarCuentas').then((resultado: any) => {
            console.log('resultado then');
            console.log(resultado);
            this.quitarCargando();
            this.CuentasSRV.incicializarVariables();
            this.CerrarVentana();
          }).catch((error) => {
            console.log('error');
            console.log(error);
            this.quitarCargando();
          });
          break;
      }
    }
  }

  validaRegistro() {
    return new Promise((resolve, reject) => {
      if (!this.funcGenerales.EsVacioNulo(this.CuentasSRV.NUMERO_CTA))
        this.mostrarCargado();
      let json: any = {};
      json.NUMERO_CTA = this.CuentasSRV.NUMERO_CTA;
      this.peticiones.peticionPost(json, 'detalleCuentas').then((resultado: any) => {
        this.quitarCargando();
        let codigoR = this.funcGenerales.extraerCodigo(resultado)
        if (this.funcGenerales.extraerCodigo(resultado) == '00') {
          let datos = resultado.datos[0];
          this.datosTemporales = datos;
          if (datos.ESTATUS === 'B') {
            this.funcGenerales.popUpAlerta('Error', 'La cuenta ya existe pero está dado de baja, ¿Deseas reactivarlo?', 'Si', 'No').then((respuesta) => {
              if (respuesta) {
                this.reactivar();
              } else {
                this.funcGenerales.otorgaFoco('numero_cta');

              }
            });
          } else {
            this.funcGenerales.popUpAlerta('Error', 'La cuenta ya existe', 'Aceptar', '').then((respuesta) => {
              this.funcGenerales.otorgaFoco('numero_cta');

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

  desactivar(){

  }

  reactivar() {
    this.modo = MODO.REACTIVAR;
    this.llenarCampoDetalle(this.datosTemporales);
  }

  cambioSeleccion(e){
    if(e.value == "M"){
      this.DesabilitarIDProveedor = true;
      this.CuentasSRV.ID_PROVEEDOR = "";
    }
    else{
      this.DesabilitarIDProveedor = false;
    }
    console.log(e);
  }
}

