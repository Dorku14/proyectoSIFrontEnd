import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales'
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import { SortEvent } from 'primeng/api';
import { MODO } from './../sharedModules/constantes';
import { Table } from 'primeng/table';
import { ServiciosService } from '../services/servicios.service';
import { DetalleClientesComponent } from './detalle-clientes/detalle-clientes.component';
import { ConsultasBaseComponent } from '../consultas-base/consultas-base.component';

@Component({
  selector: 'app-clientes',
  templateUrl: '../consultas-base/consultas-base.component.html',
  styleUrls: ['../consultas-base/consultas-base.component.scss']
})

export class ClientesComponent extends ConsultasBaseComponent implements OnInit {
  dataSource: Array<any>;
  isCargando: boolean;
  itemSeleccionado: any;
  columns: any;
  @ViewChild('dt') table: Table;
  Nombrecatalogo: any;
  ocultarBTNEliminar: boolean = true;
  constructor(public peticiones: PeticionesWebComponent,
    public ServiciosService: ServiciosService,
    public funcGenerales: FuncionesGenerales,
    public dialog: MatDialog) {
    super(funcGenerales, dialog, peticiones);
    this.isCargando = false;
    this.Nombrecatalogo = 'Clientes';

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
    this.peticiones.peticionPost({}, 'consultaClientes').then((resultado: any) => {
      this.dataSource = resultado;
      let num = 0;
      for (let i of this.dataSource) {
        num += 1;
        i.NUM = num;
        i.created_at = this.funcGenerales.dameFechaString(new Date(i.created_at));
        i.FECHA_NACIMIENTO = this.funcGenerales.fechaFormatoYYMMDDtoDDMMYY(i.FECHA_NACIMIENTO);
      }
      this.quitarCargando();
    }).catch((error) => {
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
      columns: 10,
      header: ['Nombres', 'Apellido paterno', 'Apellido materno', 'Fecha de nacimiento', 'Dirección', 'Facebook', 'Correo', 'RFC', 'Teléfono', 'Cliente desde'],
      field: ['NOMBRES', 'APELLIDO_P', 'APELLIDO_M', 'FECHA_NACIMIENTO', 'DIRECCION', 'FACEBOOK', 'CORREO', 'RFC', 'TELEFONO', 'created_at'],

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
   *\author  Alexis Osvaldo Dorantes Kupcom
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
    var width = '90%';
    var height = '90%';

    const dialogRef = this.dialog.open(DetalleClientesComponent, {
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
    this.funcGenerales.mensajeConfirmacion('confirm', 'warn', 'Confirmación', '¿Seguro que deseas eliminar el registro \"' + this.itemSeleccionado.ID + "\"?", true);
  }

  Confirmar() {
    this.funcGenerales.limpiarMensajes();
    // this.mostrarCargado();
    // let json: any = {};
    // json.NOMBRE = this.itemSeleccionado.ID;
    // this.peticiones.peticionPost(json, '').then((resultado: any) => {
    //   if (this.funcGenerales.extraerCodigo(resultado) == 11 || this.funcGenerales.extraerCodigo(resultado) == "01") {
    //     this.mensajeError(resultado.message);
    //   } else {
    //     this.mensajeEliminarExitoso();
    //     this.consulta();
    //   }
    //   this.quitarCargando();

    // }).catch((error) => {
    //   this.mensajeErrorHttp(error);
    //   this.quitarCargando();
    // });
  }

  Cancelar() {
    this.funcGenerales.limpiarMensajes();
  }
}
