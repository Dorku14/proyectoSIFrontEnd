import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mov_ProductoProcesoSerivce } from "src/app/services/mov_ProductoProceso.service";
import { ProductoEnProcesoService } from 'src/app/services/ProductoEnProceso.Service'
import { ProductoService } from 'src/app/services/Producto.service'
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, mascaraMoneda } from 'src/app/sharedModules/constantes';

@Component({
  selector: 'app-balance-inicial-detalle-producto-en-proceso',
  templateUrl: './balance-inicial-detalle-producto-en-proceso.component.html',
  styleUrls: ['./balance-inicial-detalle-producto-en-proceso.component.scss']
})
export class BalanceInicialDetalleProductoEnProcesoComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  mascaraMoneda: any;
  Estatus: any;

  constructor(
    public dialogRef: MatDialogRef<BalanceInicialDetalleProductoEnProcesoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public movPP: mov_ProductoProcesoSerivce,
    public ProductoPro: ProductoEnProcesoService,
    public Producto: ProductoService,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales
  ) { this.mascaraMoneda = mascaraMoneda; }

  ngOnInit(): void {
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.estatus();
  }

  estatus(){
    this.Estatus = [
      {ID: 'P', DESC: 'En Proceso'},
      {ID: 'S', DESC: 'Semi Terminado'}
    ]
  }

  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de Producto En Proceso';
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle del Producto En Proceso';
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
    let valorS = e.key;
    switch (campo) {
      case 'CANTIDAD':
        if (isNaN(valor)) {
          respuesta = false;
        }
        break;
      case 'VALOR_PRODUCCION':
        respuesta = this.funcGenerales.permiteNumerico(this.ProductoPro.VALOR_PRODUCCION, valorS);
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
    json.CODIGO = item.CODIGO;
    this.peticiones
      .peticionPost(json, 'PENDIENTE')
      .then((resultado: any) => {
        (resultado);
        let datos = resultado.datos[0];
        this.llenarCampoDetalle(datos);
      })
      .catch((error) => {
        (error);
        this.quitarCargando();
      });
  }

  llenarCampoDetalle(datos: any) {
    this.movPP.llenarCampos(datos);
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
      json.VALOR_PRODUCCION = this.ProductoPro.VALOR_PRODUCCION;
      json.FOLIO = this.ProductoPro.FOLIO;
      json.CODIGO = this.Producto.CODIGO;
      json.NOMBRE = this.Producto.NOMBRE;
      json.ESTATUS = this.movPP.ESTATUS;
      json.UNIDADES = this.movPP.UNIDADES;
      json.FECHA = this.movPP.FECHA;
      json.TIPO_MOV = 'I';
      switch (this.modo) {
        case MODO.ALTA:
          json.ESTATUS = this.movPP.ESTATUS;
          this.peticiones
            .peticionPost(json, 'altaMovPPIni')
            .then((resultado: any) => {
              ('resultado then');
              (resultado);
              this.funcGenerales.mensajeConfirmacion('esquinaSupDer','success','','Elemento agredado correctamente',false);
              this.quitarCargando();
              this.movPP.incicializarVariables();
              this.CerrarVentana();
            })
            .catch((error) => {
              ('error');
              (error);
              this.funcGenerales.mostrarMensajeError('esquinaSupDer','error','Error',error,false);
              this.quitarCargando();
            });
          break;
        case MODO.MODIFICAR:
          this.peticiones
            .peticionPost(json, 'PENDIENTE')
            .then((resultado: any) => {
              ('resultado then');
              (resultado);
              this.funcGenerales.mensajeConfirmacion('esquinaSupDer','success','','El elemento se ha editado correctamente',false);
              this.quitarCargando();
              this.movPP.incicializarVariables();
              this.CerrarVentana();
            })
            .catch((error) => {
              ('error');
              (error);
              this.funcGenerales.mostrarMensajeError('esquinaSupDer','error','Error',error,false);
              this.quitarCargando();
            });
          break;
        case MODO.REACTIVAR:
          json.ESTATUS = 'A';
          this.peticiones
            .peticionPost(json, 'PENDIENTE')
            .then((resultado: any) => {
              ('resultado then');
              (resultado);
              this.funcGenerales.mensajeConfirmacion('esquinaSupDer','success','','El elemento se ha reactivado correctamente',false);
              this.quitarCargando();
              this.movPP.incicializarVariables();
              this.CerrarVentana();
            })
            .catch((error) => {
              ('error');
              (error);
              this.funcGenerales.mostrarMensajeError('esquinaSupDer','error','Error',error,false);
              this.quitarCargando();
            });
          break;
      }
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

  ObtenerFoco(e) {
    e.target.select()
  }

}
