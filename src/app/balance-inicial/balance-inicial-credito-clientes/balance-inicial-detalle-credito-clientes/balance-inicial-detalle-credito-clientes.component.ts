import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { creditoXclienteService } from 'src/app/services/creditoXcliente.service';
import { mov_CreditoClientesService } from "src/app/services/mov_CreditoClientes.service";
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, mascaraMoneda } from 'src/app/sharedModules/constantes';

@Component({
  selector: 'app-balance-inicial-detalle-credito-clientes',
  templateUrl: './balance-inicial-detalle-credito-clientes.component.html',
  styleUrls: ['./balance-inicial-detalle-credito-clientes.component.scss']
})
export class BalanceInicialDetalleCreditoClientesComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  mascaraMoneda: any;
  F_O_R: Array<{ID, DESC}>;
  listaClientes: Array<{ID, NOMBRES, APELLIDO_P}>;

  constructor(
    public dialogRef: MatDialogRef<BalanceInicialDetalleCreditoClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public CreCli: creditoXclienteService,
    public movCreCli: mov_CreditoClientesService,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales
  ) { this.mascaraMoneda = mascaraMoneda; }

  ngOnInit(): void {
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.CreCli.incicializarVariables();
    this.movCreCli.incicializarVariables();
    this.f_o_r();
    this.consultaClientes();
  }

  consultaClientes(){
    this.peticiones.peticionPost({}, 'consultaClientes').then((resultado: any) => {
      (resultado);
      let datos = resultado;
      this.listaClientes = datos;
    }).catch((error) => {
      (error);
      this.quitarCargando();
    });
  }

  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de Creditos a Clientes';
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle del Credito a Cliente';
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
        respuesta = this.funcGenerales.permiteNumerico(this.CreCli.IMPORTE, valorS);
        break;
      case 'IVA':
        respuesta = this.funcGenerales.permiteNumerico(this.CreCli.IVA, valorS);
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
    this.CreCli.llenarCampos(datos);
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
      json.FECHA = this.movCreCli.FECHA;
      json.ID_CLIENTE = this.CreCli.ID_CLIENTE;
      json.FOLIO = this.CreCli.FOLIO;
      json.F_O_R = this.CreCli.F_O_R;
      json.IMPORTE = this.CreCli.IMPORTE;
      json.IVA = this.CreCli.IVA;
      json.TIPO_MOV = 'I';
      json.ID_CC = this.CreCli.ID;
      switch (this.modo) {
        case MODO.ALTA:
          json.ESTATUS = 'A';
          this.peticiones
            .peticionPost(json, 'altaCreditoClientesIni')
            .then((resultado: any) => {
              ('resultado then');
              (resultado);
              this.funcGenerales.mensajeConfirmacion('esquinaSupDer','success','','Elemento agredado correctamente',false);
              this.quitarCargando();
              this.CreCli.incicializarVariables();
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
              this.CreCli.incicializarVariables();
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
              this.CreCli.incicializarVariables();
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

  f_o_r(){
    this.F_O_R = [
      {ID: 1, DESC: 'Factura'},
      {ID: 0, DESC: 'Remisión'}
    ]
  }

}