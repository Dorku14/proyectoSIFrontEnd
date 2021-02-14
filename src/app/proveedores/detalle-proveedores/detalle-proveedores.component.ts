import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, EXITO, NOEXISTE, mascaraMoneda } from 'src/app/sharedModules/constantes';
import { ServiciosService } from 'src/app/services/servicios.service';
import { proveedoresService } from 'src/app/services/proveedores.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-detalle-proveedores',
  templateUrl: './detalle-proveedores.component.html',
  styleUrls: ['./../../productos-comerciales/detalle-productos-comerciales/detalle-productos-comerciales.component.scss'],

})
export class DetalleProveedoresComponent implements OnInit {
  @ViewChild('matTabGrupo', { static: false }) matTabGrupo: MatTabGroup;
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  mascaraMoneda: any
  listaOpcionesFisicas: Array<{ ID, Descrip }>;
  colorCampo:string = 'primary';
  hayError:boolean = false;
  listaEstatus:Array<{ ID, Descrip }>;
  OpcionesSINO:Array<{ ID, Descrip }>;
  indiceTabsActivo:number = 0;
  constructor(public dialogRef: MatDialogRef<DetalleProveedoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public ProveedorSRV: proveedoresService,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales) {
    this.mascaraMoneda = mascaraMoneda;
    this.listaEstatus = this.funcGenerales.dameOpcionesEstatus();
    this.OpcionesSINO = this.funcGenerales.dameOpcionesBoleanos();
  }

  ngOnInit(): void {
    this.generarPerzonalidadFisica();
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.ProveedorSRV.incicializarVariables();

  }

  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de proveedores';
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle de proveedor';
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


  consultaDetalle(item) {
    this.mostrarCargado();


    let json: any = {};
    json.CODIGO = item.CODIGO;;
    this.peticiones.peticionPost(json, 'detalleProveedores').then((resultado: any) => {
      (resultado);
      let datos = resultado.datos[0];
      this.llenarCampoDetalle(datos);
    }).catch((error) => {
      (error);
      this.quitarCargando();
    });
  }


  llenarCampoDetalle(datos: any) {
    this.ProveedorSRV.llenarCampos(datos);
    this.quitarCargando();
  }

  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }
  guardar() {
    // this.showError();
    if (this.funcGenerales.EsVacioNulo(this.ProveedorSRV.CODIGO)) {
      this.funcGenerales.mostrarMensajeError('arribaDerecha','error','Campo vacío','Debes llenar el campo código ',true);
      this.cambiarColorCampo(true);
      this.funcGenerales.otorgaFoco('codigo');
    } else {
      let json = this.ProveedorSRV.dameJsonEntrada();
      switch (this.modo) {
        case MODO.ALTA:
          json.ESTATUS = 'A';
          this.validaRegistro().then((resultado) => {
            if (resultado === NOEXISTE) {
              this.peticiones.peticionPost(json, 'altaProveedores').then((resultado: any) => {
                ('resultado then');
                (resultado);
                this.quitarCargando();
                this.ProveedorSRV.incicializarVariables();
                this.CerrarVentana();
              }).catch((error) => {
                ('error');
                (error);
                this.quitarCargando();
              });
            }
          });
          break;
        case MODO.MODIFICAR:
          this.peticiones.peticionPost(json, 'modificarProveedores').then((resultado: any) => {
            ('resultado then');
            (resultado);
            this.quitarCargando();
            this.ProveedorSRV.incicializarVariables();
            this.CerrarVentana();
          }).catch((error) => {
            ('error');
            (error);
            this.quitarCargando();
          });
          break;
        case MODO.REACTIVAR:
          json.ESTATUS = 'A';
          this.peticiones.peticionPost(json, 'reactivarProveedores').then((resultado: any) => {
            ('resultado then');
            (resultado);
            this.quitarCargando();
            this.ProveedorSRV.incicializarVariables();
            this.CerrarVentana();
          }).catch((error) => {
            ('error');
            (error);
            this.quitarCargando();
          });
          break;
      }
    }
  }

  validaRegistro() {
    return new Promise((resolve, reject) => {
      if (!this.funcGenerales.EsVacioNulo(this.ProveedorSRV.CODIGO))
        this.mostrarCargado();
      let json: any = {};
      json.CODIGO = this.ProveedorSRV.CODIGO;
      this.peticiones.peticionPost(json, 'detalleProveedores').then((resultado: any) => {
        this.quitarCargando();
        let codigoR = this.funcGenerales.extraerCodigo(resultado)
        if (this.funcGenerales.extraerCodigo(resultado) == '00') {
          let datos = resultado.datos[0];
          this.datosTemporales = datos;
          if (datos.ESTATUS === 'B') {
            this.funcGenerales.popUpAlerta('Error', 'El servicio ya existe pero está dado de baja, ¿Deseas reactivarlo?', 'Si', 'No').then((respuesta) => {
              if (respuesta) {
                this.reactivar();
              } else {
                this.funcGenerales.otorgaFoco('codigo');

              }
            });
          } else {
            this.funcGenerales.popUpAlerta('Error', 'El servicio ya existe', 'Aceptar', '').then((respuesta) => {
              this.funcGenerales.otorgaFoco('codigo');

            });

          }
          resolve(this.funcGenerales.extraerCodigo(resultado));
        }
        resolve(codigoR);

      }).catch((error) => {
        (error);
        this.quitarCargando();
        reject();
      });
    });

  }

  reactivar() {
    this.modo = MODO.REACTIVAR;
    this.llenarCampoDetalle(this.datosTemporales);
  }

  presionaBoton(e: KeyboardEvent) {
    if (e.key == 'Escape') {
      this.CerrarVentana();
    }
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

  generarPerzonalidadFisica() {
    this.listaOpcionesFisicas = [
      { ID: 'F', Descrip: 'Persona física' },
      { ID: 'M', Descrip: 'Persona moral' }
    ]
  }

  showError() {
    // this.messageService.add({ key: 'cc',severity: 'error', summary: 'Error', detail: 'Me la pelas' ,sticky: true});
    this.funcGenerales.mostrarMensajeError('arribaDerecha','error','Campo vacío','Debes llenar el campo código ',true);
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
}
