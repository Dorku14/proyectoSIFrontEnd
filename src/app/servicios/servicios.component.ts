import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales'
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import { SortEvent } from 'primeng/api';
import { MODO } from './../sharedModules/constantes';
import { Table } from 'primeng/table';
import { DetalleServiciosComponent } from './detalle-servicios/detalle-servicios.component';
import { ServiciosService } from '../services/servicios.service';
import { ConsultasBaseComponent } from '../consultas-base/consultas-base.component';

@Component({
  selector: 'app-servicios',
  templateUrl: '../consultas-base/consultas-base.component.html',
  styleUrls: ['../consultas-base/consultas-base.component.scss']
})

export class ServiciosComponent extends ConsultasBaseComponent implements OnInit {
  dataSource: Array<any>;
  isCargando: boolean;
  itemSeleccionado: any;
  columns: any;
  data = { 'NUM': 1, 'CODIGO': '1231', 'ACTIVIDAD': 'camisa', 'PRECIO_VENT': 12, 'PRECIO_VENT_ACT': 80, 'PAGO_EMPLEADO': 120 }
  @ViewChild('dt') table: Table;
  Nombrecatalogo:any;
  ocultarBTNEliminar:boolean = false;
  constructor(public peticiones: PeticionesWebComponent,
    public ServiciosService: ServiciosService,
    public funcGenerales: FuncionesGenerales,
    public dialog: MatDialog) {
    super(funcGenerales,dialog,peticiones);
    this.isCargando = false;
    this.Nombrecatalogo = 'Servicios';
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
    this.peticiones.peticionPost({}, 'consultaServicios').then((resultado: any) => {
      (resultado);
      this.dataSource = resultado;
      let num = 0;
      for (let i of this.dataSource) {
        num += 1;
        i.NUM = num;
        i.PRECIO_VENT = this.funcGenerales.dameFormatoMoneda(i.PRECIO_VENT,2);
        i.PRECIO_VENT_ACT = this.funcGenerales.dameFormatoMoneda(i.PRECIO_VENT_ACT,2);
        i.PAGO_EMPLEADO = this.funcGenerales.dameFormatoMoneda(i.PAGO_EMPLEADO,2);
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
      columns: 6,
      header: ['#', 'Código', 'Actividad', 'Precio venta (sin IVA)', 'Precio venta actualizado', 'Pago empleado'],
      field: ['NUM', 'CODIGO', 'ACTIVIDAD', 'PRECIO_VENT', 'PRECIO_VENT_ACT', 'PAGO_EMPLEADO'],

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
    var width = '40%';
    var height = '40%';

    const dialogRef = this.dialog.open(DetalleServiciosComponent, {
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
    this.funcGenerales.popUpAlerta('Confirmación', '¿Seguro que deseas eliminar el registro \"' + this.itemSeleccionado.CODIGO + "\" ?'", 'Si', 'No').then((respuesta) => {

      if (respuesta) {
        this.mostrarCargado();
        let json: any = {};
        json.CODIGO = this.itemSeleccionado.CODIGO;
        this.peticiones.peticionPost(json, 'eliminarServicios').then((resultado: any) => {
          this.consulta();
          this.quitarCargando();
        }).catch((error) => {
          (error);
          this.quitarCargando();
        });
      }
    });
  }
}
