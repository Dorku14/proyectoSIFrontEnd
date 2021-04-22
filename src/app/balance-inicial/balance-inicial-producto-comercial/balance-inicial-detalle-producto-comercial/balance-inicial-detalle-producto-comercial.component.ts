import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductosComercialesService } from 'src/app/services/ProductosComerciales.service';
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, EXITO, NOEXISTE, mascaraMoneda } from 'src/app/sharedModules/constantes';


@Component({
  selector: 'app-balance-inicial-detalle-producto-comercial',
  templateUrl: './balance-inicial-detalle-producto-comercial.component.html',
  styleUrls: ['./balance-inicial-detalle-producto-comercial.component.scss']
})
export class BalanceInicialDetalleProductoComercialComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  mascaraMoneda: any;

  constructor(
    public dialogRef: MatDialogRef<BalanceInicialDetalleProductoComercialComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public PRODC: ProductosComercialesService,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales) { this.mascaraMoneda = mascaraMoneda; }

  ngOnInit(): void {
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.PRODC.incicializarVariables();
  }

  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de productos comerciales';
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle del producto comercial';
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
      case 'PRECIO_VENTA_ACT':
        respuesta = this.funcGenerales.permiteNumerico(this.PRODC.PRECIO_VENTA_ACT, valorS);
        break;
      case 'PRECIOVENT':
        respuesta = this.funcGenerales.permiteNumerico(this.PRODC.PRECIOVENT, valorS);
        break;
      case 'COSTACT':
        respuesta = this.funcGenerales.permiteNumerico(this.PRODC.COSTACT, valorS);
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
      .peticionPost(json, 'detalleProductoC')
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
    this.PRODC.llenarCampos(datos);
    this.quitarCargando();
  }

  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }
  guardar() {
    if (this.funcGenerales.EsVacioNulo(this.PRODC.CODIGO)) {
      alert('El campo código no debe estar vacío');
    } else {
      let json: any = {};
      json.CODIGO = this.PRODC.CODIGO;
      json.PRODUCTO = this.PRODC.PRODUCTO;
      json.CANTIDAD = this.PRODC.CANTIDAD;
      json.COSTO_COMPRA = this.PRODC.COSTO_COMPRA;
      json.PRECIOVENT = this.PRODC.PRECIOVENT;
      json.PRECIO_VENTA_ACT = this.PRODC.PRECIO_VENTA_ACT;
      json.COSTACT = this.PRODC.COSTACT;
      json.BANDERA = 'I';
      json.TIPO_MOV = 'E';
      switch (this.modo) {
        case MODO.ALTA:
          json.ESTATUS = 'A';
          this.validaRegistro().then((resultado) => {
            if (resultado === NOEXISTE) {
              this.peticiones
                .peticionPost(json, 'altaProductoCIni')
                .then((resultado: any) => {
                  ('resultado then');
                  (resultado);
                  this.funcGenerales.mensajeConfirmacion('esquinaSupDer','success','','Elemento agredado correctamente',false);
                  this.quitarCargando();
                  this.PRODC.incicializarVariables();
                  this.CerrarVentana();
                })
                .catch((error) => {
                  ('error');
                  (error);
                  this.funcGenerales.mostrarMensajeError('esquinaSupDer','error','Error',error,false);
                  this.quitarCargando();
                });
            }
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
              this.PRODC.incicializarVariables();
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
              this.PRODC.incicializarVariables();
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
  }

  validaRegistro() {
    return new Promise((resolve, reject) => {
      if (!this.funcGenerales.EsVacioNulo(this.PRODC.CODIGO))
        this.mostrarCargado();
      let json: any = {};
      json.CODIGO = this.PRODC.CODIGO;
      this.peticiones
        .peticionPost(json, 'detalleProductoC')
        .then((resultado: any) => {
          this.quitarCargando();
          let codigoR = this.funcGenerales.extraerCodigo(resultado);
          if (codigoR == '00') {
            let datos = resultado.datos[0];
            this.datosTemporales = datos;
            if (datos.ESTATUS === 'B') {
              this.funcGenerales
                .popUpAlerta(
                  'Error',
                  'El producto ya existe pero está dado de baja, ¿Deseas reactivarlo?',
                  'Si',
                  'No'
                )
                .then((respuesta) => {
                  if (respuesta) {
                    this.reactivar();
                  } else {
                    this.funcGenerales.otorgaFoco('codigo');
                  }
                });
            } else {
              this.funcGenerales
                .popUpAlerta('Error', 'El producto ya existe', 'Aceptar', '')
                .then((respuesta) => {
                  this.funcGenerales.otorgaFoco('codigo');
                });
            }
            resolve(this.funcGenerales.extraerCodigo(resultado));
          }
          resolve(codigoR);
        })
        .catch((error) => {
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
    switch (campo) {
      case 'COSTO_COMPRA':
        if (this.funcGenerales.EsVacioNulo(this.PRODC.COSTO_COMPRA))
          this.PRODC.COSTO_COMPRA = 0;
        break;
      case 'COSTACT':
        if (this.funcGenerales.EsVacioNulo(this.PRODC.COSTACT))
          this.PRODC.COSTACT = 0;
        break;
      case 'PRECIOVENT':
        if (this.funcGenerales.EsVacioNulo(this.PRODC.PRECIOVENT))
          this.PRODC.PRECIOVENT = 0;
        break;
      case 'PRECIO_VENTA_ACT':
        if (this.funcGenerales.EsVacioNulo(this.PRODC.PRECIO_VENTA_ACT))
          this.PRODC.PRECIO_VENTA_ACT = 0;
        break;
    }
  }

  ObtenerFoco(e) {
    e.target.select()
  }

}
