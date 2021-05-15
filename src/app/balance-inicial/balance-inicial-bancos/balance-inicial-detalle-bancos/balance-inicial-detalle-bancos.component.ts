import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, mascaraMoneda } from 'src/app/sharedModules/constantes';
import { mov_bancosService } from 'src/app/services/mov_bancos.service';
import { cuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-balance-inicial-detalle-bancos',
  templateUrl: './balance-inicial-detalle-bancos.component.html',
  styleUrls: ['./balance-inicial-detalle-bancos.component.scss']
})
export class BalanceInicialDetalleBancosComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  mascaraMoneda: any;
  F_O_R: Array<{ID, DESC}>;
  listaCuentas: Array <{ID, BANCO}>;

  constructor(
    public dialogRef: MatDialogRef<BalanceInicialDetalleBancosComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public MovBan: mov_bancosService,
    public Cuentas: cuentasService,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales
  ) { this.mascaraMoneda = mascaraMoneda; }

  ngOnInit(): void {
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.MovBan.incicializarVariables();
    this.Cuentas.incicializarVariables();
    this.consultaCuentas();
  }

  consultaCuentas(){
    this.peticiones.peticionPost({}, 'consultaCuentasPropias').then((resultado: any) => {
      (resultado);
      let datos = resultado;
      this.listaCuentas = datos;
    }).catch((error) => {
      (error);
      this.quitarCargando();
    });
  }

  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Bancos';
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle Banco';
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
        respuesta = this.funcGenerales.permiteNumerico(this.MovBan.IMPORTE, valorS);
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
      .peticionPost(json, 'consultaCreditoClientesIni')
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
    this.MovBan.llenarCampos(datos);
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
      json.ID_CUENTA = this.Cuentas.ID;
      json.IMPORTE = this.MovBan.IMPORTE;
      json.ASIGNACION = 'Balance Inicial';
      json.TIPO_MOV = 'I';
      switch (this.modo) {
        case MODO.ALTA:
          this.peticiones
            .peticionPost(json, 'altaMovBanco')
            .then((resultado: any) => {
              ('resultado then');
              (resultado);
              this.funcGenerales.mensajeConfirmacion('esquinaSupDer','success','','Elemento agredado correctamente',false);
              this.quitarCargando();
              this.MovBan.incicializarVariables();
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
            .peticionPost(json, 'modificarProductoC')
            .then((resultado: any) => {
              ('resultado then');
              (resultado);
              this.funcGenerales.mensajeConfirmacion('esquinaSupDer','success','','El elemento se ha editado correctamente',false);
              this.quitarCargando();
              this.MovBan.incicializarVariables();
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
            .peticionPost(json, 'reactivarProductoC')
            .then((resultado: any) => {
              ('resultado then');
              (resultado);
              this.funcGenerales.mensajeConfirmacion('esquinaSupDer','success','','El elemento se ha reactivado correctamente',false);
              this.quitarCargando();
              this.MovBan.incicializarVariables();
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
