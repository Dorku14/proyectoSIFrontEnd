
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuncionesGenerales } from '../../sharedModules/funcionesgenerales'
import { PeticionesWebComponent } from '../../sharedModules/peticiones-web/peticiones-web.component';
import { SortEvent } from 'primeng/api';
import { MODO } from './../../sharedModules/constantes';
import { Table } from 'primeng/table';
import { AsignarMateriasPrimasComponent } from './asignar-materias-primas/asignar-materias-primas.component';
import { ConsultasBaseComponent } from 'src/app/consultas-base/consultas-base.component';


@Component({
  selector: 'app-materias-primas-asignados',
  templateUrl: '../../consultas-base/consultas-base.component.html',
  styleUrls: ['../../consultas-base/consultas-base.component.scss']
})

export class MateriasPrimasAsignadosComponent extends ConsultasBaseComponent implements OnInit {
  dataSource: Array<any>;
  isCargando: boolean;
  itemSeleccionado: any;
  columns: any;
  data = { 'NUM': 1, 'CODIGO': '1231', 'PRODUCTO': 'camisa', 'CANTIDAD': 12, 'PRECIOCOMP': 50, 'PRECIOVENT': 80, 'COSTACT': 120 }
  @ViewChild('dt') table: Table;
  Nombrecatalogo: any;
  constructor(public peticiones: PeticionesWebComponent,
    public funcGenerales: FuncionesGenerales,
    public dialog: MatDialog) {
    super(funcGenerales, dialog, peticiones);
    this.isCargando = false;
    this.Nombrecatalogo = 'Materias Primas Asignados';
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
    this.peticiones.peticionPost({}, 'consultaMPasignados').then((resultado: any) => {
      (resultado);
      this.dataSource = resultado;
      let num = 0;
      for (let i of this.dataSource) {
        num += 1;
        i.NUM = num;
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
    *\date    23/09/2020
    *\version	1.00.00
  */
  configuraDataGrid(): void {
    let configGrid = {
      columns: 2,
      header: ['#', 'Producto fabricado'],
      field: ['NUM', 'CODIGO_PRODUCTOF'],

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
    this.asignarMateriasPrimas(MODO.ALTA);
  }

  /**
    *\brief   Funciónque invoca el detalle y ponerlo en modo modificar
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
  */
  modificar() {
    this.asignarMateriasPrimas(MODO.MODIFICAR);

  }

  /**
   *\brief   Función que invoca la ventana del detalle
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
   @param[in] -> el modo en el que se comportará la ventana
 */
  asignarMateriasPrimas(Modo) {
    var width = '80vh';
    var height = '75vh';

    const dialogRef = this.dialog.open(AsignarMateriasPrimasComponent, {
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
    this.funcGenerales.mensajeConfirmacion('confirm', 'warn', 'Confirmación', '¿Seguro que deseas eliminar el registro \"' + this.itemSeleccionado.CODIGO_PRODUCTOF + "\"?", true);
  }

  Confirmar() {
    this.funcGenerales.limpiarMensajes();
    this.mostrarCargado();
    let json: any = {};
    json.CODIGO_PRODUCTOF = this.itemSeleccionado.CODIGO_PRODUCTOF;
    this.peticiones.peticionPost(json, 'eliminarMPasignados').then((resultado: any) => {
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
