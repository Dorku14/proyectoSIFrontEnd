import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeudaCreditos } from 'src/app/services/DeudaCreditos.service';
import { mov_DeudaCreditos } from "src/app/services/mov_DeudaCreditos.service";
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, mascaraMoneda } from 'src/app/sharedModules/constantes';


@Component({
  selector: 'app-balance-inicial-detalle-deuda-creditos',
  templateUrl: './balance-inicial-detalle-deuda-creditos.component.html',
  styleUrls: ['./balance-inicial-detalle-deuda-creditos.component.scss']
})
export class BalanceInicialDetalleDeudaCreditosComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  mascaraMoneda: any;
  listaCreditos: Array<{ID, NOM_CREDITO, PLAZO}>;
  Recibido: any;

  constructor(
    public dialogRef: MatDialogRef<BalanceInicialDetalleDeudaCreditosComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public DeudaCreditos: DeudaCreditos,
    public movDC: mov_DeudaCreditos,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales
  ) { this.mascaraMoneda = mascaraMoneda; }

  ngOnInit(): void {
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.consultaCreditos();
    this.recibido();
  }

  recibido(){
    this.Recibido = [
      {ID:1, DESC:'Efectivo'},
      {ID:0, DESC:'Banco'}
    ]
  }

  consultaCreditos(){
    this.peticiones.peticionPost({}, 'consultaCreditos').then((resultado: any) => {
      (resultado);
      let datos = resultado;
      this.listaCreditos = datos;
    }).catch((error) => {
      (error);
      this.quitarCargando();
    });
  }

  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de Deuda Credito';
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle de Deuda Credito';
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
      case 'IMPORTE':
        respuesta = this.funcGenerales.permiteNumerico(this.DeudaCreditos.IMPORTE, valorS);
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
      .peticionPost(json, 'Pendiente')
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
    this.DeudaCreditos.llenarCampos(datos);
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
      json.FOLIO = this.DeudaCreditos.FOLIO;
      json.ID_C = this.DeudaCreditos.ID_C;
      json.IMPORTE = this.DeudaCreditos.IMPORTE;
      json.FECHA = this.DeudaCreditos.FECHA;
      json.RECIBIDO_EN = this.DeudaCreditos.RECIBIDO_EN;
      json.PROVEEDOR = this.DeudaCreditos.PROVEEDOR;
      json.DESCRIPCION = this.DeudaCreditos.DESCRIPCION;
      json.TIPO_MOV = 'I';
      switch (this.modo) {
        case MODO.ALTA:
          json.ESTATUS = 'A';
          this.peticiones
            .peticionPost(json, 'altaDCMovIni')
            .then((resultado: any) => {
              ('resultado then');
              (resultado);
              this.funcGenerales.mensajeConfirmacion('esquinaSupDer','success','','Elemento agredado correctamente',false);
              this.quitarCargando();
              this.DeudaCreditos.incicializarVariables();
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
            .peticionPost(json, 'Pendiente')
            .then((resultado: any) => {
              ('resultado then');
              (resultado);
              this.funcGenerales.mensajeConfirmacion('esquinaSupDer','success','','El elemento se ha editado correctamente',false);
              this.quitarCargando();
              this.DeudaCreditos.incicializarVariables();
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
            .peticionPost(json, 'Pendiente')
            .then((resultado: any) => {
              ('resultado then');
              (resultado);
              this.funcGenerales.mensajeConfirmacion('esquinaSupDer','success','','El elemento se ha reactivado correctamente',false);
              this.quitarCargando();
              this.DeudaCreditos.incicializarVariables();
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
