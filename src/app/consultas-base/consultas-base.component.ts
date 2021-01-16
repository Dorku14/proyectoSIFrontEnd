import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales'
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import { SortEvent } from 'primeng/api';
import { MODO } from './../sharedModules/constantes';
import { Table } from 'primeng/table';
import { ThemePalette } from '@angular/material/core';
import { ConsultaBaseGeneral } from '../sharedModules/consultaBase';


@Component({
  selector: 'app-consultas-base',
  templateUrl: './consultas-base.component.html',
  styleUrls: ['./consultas-base.component.scss']
})

export  class ConsultasBaseComponent extends ConsultaBaseGeneral implements OnInit {
  Datosfila: any;
  dataSource: Array<any>;
  isCargando: boolean;
  itemSeleccionado: any;
  columns: any;
  @ViewChild('dt') table: Table;
  ocultarBTNEliminar:boolean = false;
  Nombrecatalogo:any;
  constructor(public funcGenerales: FuncionesGenerales,
    public dialog: MatDialog,public peticiones:PeticionesWebComponent) {
    super(peticiones,funcGenerales,dialog);
    this.isCargando = false;
    this.Nombrecatalogo = '';
  }

  ngOnInit(): void {}

  /**
   *\brief   Función para realiza la consulta al servidor y agrega los datos al datasource de la tabla
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
 */
   consulta(){}

  /**
    *\brief   Función para configurar el grid
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
  */
   configuraDataGrid(){}


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
    agregar(){}

  /**
    *\brief   Funciónque invoca el detalle y ponerlo en modo modificar
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
  */
   modificar(){}



 /**
    *\brief   Función para eliminar un registro
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
  */
   eliminar(){}

   formatoDatosTabla(columna){
    if(columna == "NUM"){
      return "columnaNum";
    }else{
      return "";
    }
   }
}
