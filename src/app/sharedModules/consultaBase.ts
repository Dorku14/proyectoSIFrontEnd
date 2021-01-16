import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales'
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';

export abstract class ConsultaBaseGeneral {

  dataSource: Array<any>;
  abstract isCargando: boolean;
  itemSeleccionado: any;
  abstract columns: any;
  abstract Datosfila;
  @ViewChild('dt') table: Table;
  constructor(public peticiones: PeticionesWebComponent,
    public funcGenerales: FuncionesGenerales,
    public dialog: MatDialog) {
  }



  /**
   *\brief   Función para realiza la consulta al servidor y agrega los datos al datasource de la tabla
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
 */
abstract consulta()

/**
  *\brief   Función para configurar el grid
  *\author  Alexis Osvaldo Dorantes Ku
  *\date    23/09/2020
  *\version	1.00.00
*/
abstract configuraDataGrid()


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
 abstract agregar()

/**
  *\brief   Funciónque invoca el detalle y ponerlo en modo modificar
  *\author  Alexis Osvaldo Dorantes Ku
  *\date    23/09/2020
  *\version	1.00.00
*/
abstract modificar()



/**
  *\brief   Función para eliminar un registro
  *\author  Alexis Osvaldo Dorantes Ku
  *\date    23/09/2020
  *\version	1.00.00
*/
abstract eliminar()
}
