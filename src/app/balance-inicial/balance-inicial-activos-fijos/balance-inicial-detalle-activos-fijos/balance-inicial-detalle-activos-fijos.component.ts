import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, mascaraMoneda } from 'src/app/sharedModules/constantes';
import { mov_bancosService } from 'src/app/services/mov_bancos.service';
import { CatActFijosService } from 'src/app/services/cat_act_fijos.service';
import { CategoriaActivosFijosComponent } from 'src/app/categoria-activos-fijos/categoria-activos-fijos.component';

@Component({
  selector: 'app-balance-inicial-detalle-activos-fijos',
  templateUrl: './balance-inicial-detalle-activos-fijos.component.html',
  styleUrls: ['./balance-inicial-detalle-activos-fijos.component.scss']
})
export class BalanceInicialDetalleActivosFijosComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  mascaraMoneda: any;
  listaCuentas: any;
  ListaCategorias: any = {};

  constructor(public dialogRef: MatDialogRef<BalanceInicialDetalleActivosFijosComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public MovBan: mov_bancosService,
    public CategoriasAF: CatActFijosService, 
    private peticiones: PeticionesWebComponent,
    public dialog: MatDialog,
    private funcGenerales: FuncionesGenerales) { this.mascaraMoneda = mascaraMoneda; }

  ngOnInit(): void {
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.MovBan.incicializarVariables();
    this.CategoriasAF.incicializarVariables();
    this.consultaCategorias();
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
      json.ID_CUENTA = '';
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

  ventanaDetalle(Modo) {
    var width = '45vh';
    var height = '25vh';

    const dialogRef = this.dialog.open(CategoriaActivosFijosComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        Proceso: Modo,
        item: this.itemSeleccionado,
      },
    });

    return new Promise((resolve) => {
      dialogRef.afterClosed().subscribe((result) => {
        (result);
        this.consultaCategorias();
      });
    });
  }

  consultaCategorias(){
    this.peticiones.peticionPost({}, 'consultaCategorias').then((resultado: any) => {
      (resultado);
      let datos = resultado;
      this.listaCuentas = datos;
    }).catch((error) => {
      (error);
      this.quitarCargando();
    });
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
