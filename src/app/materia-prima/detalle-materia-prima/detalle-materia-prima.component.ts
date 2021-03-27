import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, EXITO, NOEXISTE } from 'src/app/sharedModules/constantes';
import { ServiciosService } from 'src/app/services/servicios.service';
import { MateriasPrimasService } from 'src/app/services/MateriPrima.service';
import { DetalleUnidadMedidaComponent } from 'src/app/unidad-de-medida/detalle-unidad-medida/detalle-unidad-medida.component';
import { DetalleCategoriaComponent } from 'src/app/categoria/detalle-categoria/detalle-categoria.component';

@Component({
  selector: 'app-detalle-materia-prima',
  templateUrl: './detalle-materia-prima.component.html',
  styleUrls: [
    './../../productos-comerciales/detalle-productos-comerciales/detalle-productos-comerciales.component.scss',
  ],
})
export class DetalleMateriaPrimaComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  ListaUndidadMedida: any = {};
  ListaCategorias: any = {};
  constructor(
    public dialogRef: MatDialogRef<DetalleMateriaPrimaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public MateriaSrv: MateriasPrimasService,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.MateriaSrv.incicializarVariables();
    this.inicializarUnidades();
    this.inicializaCategorias();
    this.MateriaSrv.PRECIO_VENTA = this.funcGenerales.dameFormatoMoneda(this.MateriaSrv.PRECIO_VENTA, 2);
    this.MateriaSrv.COSTO_COMPRA = this.funcGenerales.dameFormatoMoneda(this.MateriaSrv.COSTO_COMPRA, 2);
    this.MateriaSrv.COSTEO_PROMEDIO_RECIENTE = this.funcGenerales.dameFormatoMoneda(this.MateriaSrv.COSTEO_PROMEDIO_RECIENTE, 2);
    this.MateriaSrv.PRECIO_VENTA_ACTUALIZADO = this.funcGenerales.dameFormatoMoneda(this.MateriaSrv.PRECIO_VENTA_ACTUALIZADO, 2);
  }

  inicializarUnidades() {
    let json = {};
    this.peticiones
      .peticionPost(json, 'consultaUnidadMedida')
      .then((resultado: any) => {
        ('resultado then');
        (resultado);
        this.quitarCargando();
        this.ListaUndidadMedida = resultado;
      })
      .catch((error) => {
        ('error');
        (error);
        this.quitarCargando();
      });
  }

  inicializaCategorias() {
    let json = {};
    this.peticiones
      .peticionPost(json, 'consultaCategoria')
      .then((resultado: any) => {
        ('resultado then');
        (resultado);
        this.quitarCargando();
        this.ListaCategorias = resultado;
      })
      .catch((error) => {
        ('error');
        (error);
        this.quitarCargando();
      });
  }
  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de materias primas';
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle de materia prima';
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
      case 'PRECIO_VENTA':
        respuesta = this.funcGenerales.permiteNumerico(this.MateriaSrv.PRECIO_VENTA,valorS);
        break;
      case 'PRECIO_VENTA_ACTUALIZADO':
        respuesta = this.funcGenerales.permiteNumerico(this.MateriaSrv.PRECIO_VENTA_ACTUALIZADO,valorS);
        break;
      case 'COSTO_COMPRA':
        respuesta = this.funcGenerales.permiteNumerico(this.MateriaSrv.COSTO_COMPRA,valorS);
        break;
      case 'COSTEO_PROMEDIO_RECIENTE':
        respuesta = this.funcGenerales.permiteNumerico(this.MateriaSrv.COSTEO_PROMEDIO_RECIENTE,valorS);
        break;
      default:
        if (isNaN(valor)) {
          respuesta = false;
        }
        break;
    }
    return respuesta;
  }

  consultaDetalle(item) {
    this.mostrarCargado();

    let json: any = {};
    json.CODIGO = item.CODIGO;
    this.peticiones
      .peticionPost(json, 'detalleMateriaPrima')
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
    this.MateriaSrv.CODIGO = datos.CODIGO;
    this.MateriaSrv.CATEGORIA = datos.CATEGORIA;
    this.MateriaSrv.MATERIA_PRIMA = datos.MATERIA_PRIMA;
    this.MateriaSrv.UNIDAD_MEDIDA = datos.UNIDAD_MEDIDA;
    // this.MateriaSrv.CANTIDAD = this.funcGenerales.dameFormatoCantidad(datos.CANTIDAD,2);
    this.MateriaSrv.PRECIO_VENTA = this.funcGenerales.dameFormatoMoneda(datos.PRECIO_VENTA, 2);
    this.MateriaSrv.COSTO_COMPRA = this.funcGenerales.dameFormatoMoneda(datos.COSTO_COMPRA, 2);
    this.MateriaSrv.COSTEO_PROMEDIO_RECIENTE = this.funcGenerales.dameFormatoMoneda(datos.COSTEO_PROMEDIO_RECIENTE, 2);
    this.MateriaSrv.PRECIO_VENTA_ACTUALIZADO = this.funcGenerales.dameFormatoMoneda(datos.PRECIO_VENTA_ACTUALIZADO, 2);
    this.MateriaSrv.INVENTARIO = datos.INVENTARIO;
    this.MateriaSrv.PUNTO_REORDEN = datos.PUNTO_REORDEN;
    this.quitarCargando();
  }

  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }
  guardar() {
    if (this.funcGenerales.EsVacioNulo(this.MateriaSrv.CODIGO)) {
      alert('El campo código no debe estar vacío');
    } else {
      let json: any = {};
      json.CODIGO = this.MateriaSrv.CODIGO;
      json.CATEGORIA = this.MateriaSrv.CATEGORIA;
      json.MATERIA_PRIMA = this.MateriaSrv.MATERIA_PRIMA;
      json.UNIDAD_MEDIDA = this.MateriaSrv.UNIDAD_MEDIDA;
      json.CANTIDAD = this.MateriaSrv.CANTIDAD;
      json.PRECIO_VENTA = this.funcGenerales.dameFormatoNumero( this.MateriaSrv.PRECIO_VENTA);
      json.COSTO_COMPRA = this.funcGenerales.dameFormatoNumero(this.MateriaSrv.COSTO_COMPRA);
      json.COSTEO_PROMEDIO_RECIENTE = this.funcGenerales.dameFormatoNumero(this.MateriaSrv.COSTEO_PROMEDIO_RECIENTE);
      json.PRECIO_VENTA_ACTUALIZADO = this.funcGenerales.dameFormatoNumero(this.MateriaSrv.PRECIO_VENTA_ACTUALIZADO);
      json.INVENTARIO = this.MateriaSrv.INVENTARIO;
      json.PUNTO_REORDEN = this.MateriaSrv.PUNTO_REORDEN;
      switch (this.modo) {
        case MODO.ALTA:
          json.ESTATUS = 'A';
          this.validaRegistro().then((resultado) => {
            if (resultado === NOEXISTE) {
              this.peticiones
                .peticionPost(json, 'altaMateriaPrima')
                .then((resultado: any) => {
                  ('resultado then');
                  (resultado);
                  this.funcGenerales.mensajeConfirmacion('esquinaSupDer','success','','Elemento agredado correctamente',false);
                  this.quitarCargando();
                  this.MateriaSrv.incicializarVariables();
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
            .peticionPost(json, 'modificarMateriaPrima')
            .then((resultado: any) => {
              ('resultado then');
              (resultado);
              this.funcGenerales.mensajeConfirmacion('esquinaSupDer','success','','El elemento se ha editado correctamente',false);
              this.quitarCargando();
              this.MateriaSrv.incicializarVariables();
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
            .peticionPost(json, 'reactivarMateriaPrima')
            .then((resultado: any) => {
              ('resultado then');
              (resultado);
              this.funcGenerales.mensajeConfirmacion('esquinaSupDer','success','','El elemento se ha reactivado correctamente',false);
              this.quitarCargando();
              this.MateriaSrv.incicializarVariables();
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
      if (!this.funcGenerales.EsVacioNulo(this.MateriaSrv.CODIGO))
        this.mostrarCargado();
      let json: any = {};
      json.CODIGO = this.MateriaSrv.CODIGO;
      this.peticiones
        .peticionPost(json, 'detalleMateriaPrima')
        .then((resultado: any) => {
          this.quitarCargando();
          let codigoR = this.funcGenerales.extraerCodigo(resultado);
          if (this.funcGenerales.extraerCodigo(resultado) == '00') {
            let datos = resultado.datos[0];
            this.datosTemporales = datos;
            if (datos.ESTATUS === 'B') {
              this.funcGenerales
                .popUpAlerta(
                  'Error',
                  'El servicio ya existe pero está dado de baja, ¿Deseas reactivarlo?',
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
                .popUpAlerta('Error', 'El servicio ya existe', 'Aceptar', '')
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

  agregarUM() {
    this.ventanaDetalle(MODO.ALTA);
  }

  /**
    *\brief   Función que invoca la ventana del detalle
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
    @param[in] -> el modo en el que se comportará la ventana
  */
  ventanaDetalle(Modo) {
    var width = '45vh';
    var height = '25vh';

    const dialogRef = this.dialog.open(DetalleUnidadMedidaComponent, {
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
        this.inicializarUnidades();
      });
    });
  }

  agregarCAT(){
    let modo = MODO.ALTA;
    var width = '45vh';
    var height = '25vh';

    const dialogRef = this.dialog.open(DetalleCategoriaComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        Proceso: modo,
        item: this.itemSeleccionado,
      },
    });

    return new Promise((resolve) => {
      dialogRef.afterClosed().subscribe((result) => {
        (result);
        this.inicializaCategorias();
      });
    });
  }
  perderFoco(campo) {
    switch (campo) {
      case 'PRECIO_VENTA':
        this.MateriaSrv.PRECIO_VENTA = this.funcGenerales.dameFormatoMoneda(this.MateriaSrv.PRECIO_VENTA, 2);
        break;
      case 'PRECIO_VENTA_ACTUALIZADO':
        this.MateriaSrv.PRECIO_VENTA_ACTUALIZADO = this.funcGenerales.dameFormatoMoneda(this.MateriaSrv.PRECIO_VENTA_ACTUALIZADO, 2);
        break;
      case 'COSTO_COMPRA':
        this.MateriaSrv.COSTO_COMPRA = this.funcGenerales.dameFormatoMoneda(this.MateriaSrv.COSTO_COMPRA, 2);
        break;
      case 'COSTEO_PROMEDIO_RECIENTE':
        this.MateriaSrv.COSTEO_PROMEDIO_RECIENTE = this.funcGenerales.dameFormatoMoneda(this.MateriaSrv.COSTEO_PROMEDIO_RECIENTE, 2);
        break;
    }
  }
  ObtenerFoco(e){
    e.target.select()
  }
}
