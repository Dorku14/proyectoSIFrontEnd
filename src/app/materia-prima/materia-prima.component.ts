import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales'
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import { MODO } from './../sharedModules/constantes';
import { Table } from 'primeng/table';
import { DetalleMateriaPrimaComponent } from './detalle-materia-prima/detalle-materia-prima.component';
import { ServiciosService } from '../services/servicios.service';
import { ConsultasBaseComponent } from '../consultas-base/consultas-base.component';

@Component({
  selector: 'app-materia-prima',
  templateUrl: '../consultas-base/consultas-base.component.html',
  styleUrls: ['../consultas-base/consultas-base.component.scss']
})

export class MateriaPrimaComponent extends ConsultasBaseComponent implements OnInit {
  dataSource: Array<any>;
  isCargando: boolean;
  itemSeleccionado: any;
  columns: any;
  // data = { 'NUM': 1, 'CODIGO': '1231', 'ACTIVIDAD': 'camisa', 'PRECIO_VENT': 12, 'PRECIO_VENT_ACT': 80, 'PAGO_EMPLEADO': 120 }
  @ViewChild('dt') table: Table;
  Nombrecatalogo: any;
  ocultarBTNEliminar: boolean = false;
  constructor(public peticiones: PeticionesWebComponent,
    public ServiciosService: ServiciosService,
    public funcGenerales: FuncionesGenerales,
    public dialog: MatDialog) {
    super(funcGenerales, dialog, peticiones);
    this.isCargando = false;
    this.Nombrecatalogo = 'Materias primas';
  }

  ngOnInit(): void {
    this.configuraDataGrid();
    setTimeout(() => {
      this.consulta();
    }, 100);
  }

  /**
   *\brief   Función para realiza la consulta al servidor y agrega los datos al datasource de la tabla
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
 */
  consulta() {
    this.mostrarCargado();
    this.peticiones.peticionPost({}, 'consultaMateriaPrima').then((resultado: any) => {
      (resultado);
      this.dataSource = resultado;
      let num = 0;
      for (let i of this.dataSource) {
        num += 1;
        i.NUM = num;
        // i.CANTIDAD = this.funcGenerales.dameFormatoCantidad(i.CANTIDAD,2);
        i.PRECIO_VENTA = this.funcGenerales.dameFormatoMoneda(i.PRECIO_VENTA, 2);
        i.PRECIO_VENTA_ACTUALIZADO = this.funcGenerales.dameFormatoMoneda(i.PRECIO_VENTA_ACTUALIZADO, 2);
        i.COSTO_COMPRA = this.funcGenerales.dameFormatoMoneda(i.COSTO_COMPRA, 2);
        i.COSTEO_PROMEDIO_RECIENTE = this.funcGenerales.dameFormatoMoneda(i.COSTEO_PROMEDIO_RECIENTE, 2);
      }
      this.quitarCargando();
    }).catch((error) => {
      (error);
      this.isCargando = false;
      this.quitarCargando();
    });
  }

  /**
    *\brief   Función para configurar el grid
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    02/11/20
    *\version	1.00.00
  */
  configuraDataGrid(): void {
    let configGrid = {
      columns: 12,
      header: ['#', 'Código', 'Categoría', 'Materia prima', 'Unidad de medida', 'Cantidad (Balance inicial)', 'P. venta (Sin IVA)', 'Precio de compra (Sin IVA)', 'Costeo promedio reciente', 'Precio de venta actualizado', 'Inventario', 'Punto de reorden'],
      field: ['NUM', 'CODIGO', 'CATEGORIA', 'MATERIA_PRIMA', 'UNIDAD_MEDIDA', 'CANTIDAD', 'PRECIO_VENTA', 'COSTO_COMPRA', 'COSTEO_PROMEDIO_RECIENTE', 'PRECIO_VENTA_ACTUALIZADO', 'INVENTARIO', 'PUNTO_REORDEN'],

    };
    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }


  /**
     *\brief   Función que activa el componente cargando
     *\author  Alexis Osvaldo Dorantes Ku
     *\date    23/09/2020
     *\version	1.00.00
   */
  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  /**
   *\brief   Función que desactiva el componente cargando
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
 */
  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }

  /**
   *\brief   Función que invoca el componente detalle y ponerlo en modo alta
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
 */
  agregar() {
    this.ventanaDetalle(MODO.ALTA);
  }

  /**
   *\brief   Funciónque invoca el detalle y ponerlo en modo modificar
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
 */
  modificar() {
    this.ventanaDetalle(MODO.MODIFICAR);

  }

  /**
   *\brief   Función que invoca la ventana del detalle
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
   @param[in] -> el modo en el que se comportará la ventana
 */
  ventanaDetalle(Modo) {
    var width = '70vh';
    var height = '50';

    const dialogRef = this.dialog.open(DetalleMateriaPrimaComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        Proceso: Modo,
        item: this.itemSeleccionado
      }
    });

    return new Promise(resolve => {
      dialogRef.afterClosed().subscribe(result => {
        (result)
        this.consulta();
      });
    });
  }

  /**
*\brief   Función para eliminar un registro
*\author  Alexis Osvaldo Dorantes Ku
*\date    23/09/2020
*\version	1.00.00
*/
  eliminar() {
    this.funcGenerales.limpiarMensajes();
    this.funcGenerales.mensajeConfirmacion('confirm', 'warn', 'Confirmación', '¿Seguro que deseas eliminar el registro \"' + this.itemSeleccionado.CODIGO + "\"?", true);
  }

  Confirmar() {
    this.funcGenerales.limpiarMensajes();
    this.mostrarCargado();
    let json: any = {};
    json.CODIGO = this.itemSeleccionado.CODIGO;
    this.peticiones.peticionPost(json, 'eliminarMateriPrima').then((resultado: any) => {
      if (this.funcGenerales.extraerCodigo(resultado) == 11 || this.funcGenerales.extraerCodigo(resultado) == "01") {
        this.mensajeError(resultado.message);
      } else {
        this.mensajeEliminarExitoso();
        this.consulta();
      }
      this.quitarCargando();

    }).catch((error) => {
      this.mensajeErrorHttp(error);
      this.quitarCargando();
    });
  }

  Cancelar() {
    this.funcGenerales.limpiarMensajes();
  }
}
