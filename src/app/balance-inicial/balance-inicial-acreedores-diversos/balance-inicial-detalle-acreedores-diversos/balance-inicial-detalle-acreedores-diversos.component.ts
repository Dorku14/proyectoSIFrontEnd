import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcreedoresDiversos } from 'src/app/services/AcreedoresDiversos.servce';
import { mov_acreedoresdiversos } from "src/app/services/mov_AcreedoresDiversos.service";
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, mascaraMoneda } from 'src/app/sharedModules/constantes';

@Component({
  selector: 'app-balance-inicial-detalle-acreedores-diversos',
  templateUrl: './balance-inicial-detalle-acreedores-diversos.component.html',
  styleUrls: ['./balance-inicial-detalle-acreedores-diversos.component.scss']
})
export class BalanceInicialDetalleAcreedoresDiversosComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  mascaraMoneda: any;
  F_O_R: Array<{ID, DESC}>;

  constructor(
    public dialogRef: MatDialogRef<BalanceInicialDetalleAcreedoresDiversosComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public AcreeDiversos: AcreedoresDiversos,
    public movAD: mov_acreedoresdiversos,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales
  ) { this.mascaraMoneda = mascaraMoneda; }

  ngOnInit(): void {
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.f_o_r();
  }

  f_o_r(){
    this.F_O_R = [
      {ID: 1, DESC: 'Factura'},
      {ID: 0, DESC: 'Remisión'}
    ]
  }

  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de Acreedores Diversos';
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle de Acreedores Diversos';
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
        respuesta = this.funcGenerales.permiteNumerico(this.AcreeDiversos.IMPORTE, valorS);
        break;
      case 'IVA':
        respuesta = this.funcGenerales.permiteNumerico(this.AcreeDiversos.IVA, valorS);
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
    this.AcreeDiversos.llenarCampos(datos);
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
      json.FOLIO = this.AcreeDiversos.FOLIO;
      json.CLIENTE = this.AcreeDiversos.CLIENTE;
      json.IMPORTE = this.AcreeDiversos.IMPORTE;
      json.IVA = this.AcreeDiversos.IVA;
      json.FECHA = this.AcreeDiversos.FECHA;
      json.F_O_R = this.AcreeDiversos.F_O_R;
      json.CONCEPTO = this.AcreeDiversos.CONCEPTO;
      json.TIPO_MOV = 'I';
      switch (this.modo) {
        case MODO.ALTA:
          json.ESTATUS = 'A';
          this.peticiones
            .peticionPost(json, 'altaADMovIni')
            .then((resultado: any) => {
              ('resultado then');
              (resultado);
              this.funcGenerales.mensajeConfirmacion('esquinaSupDer','success','','Elemento agredado correctamente',false);
              this.quitarCargando();
              this.AcreeDiversos.incicializarVariables();
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
              this.AcreeDiversos.incicializarVariables();
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
              this.AcreeDiversos.incicializarVariables();
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
