import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales'
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import { SortEvent } from 'primeng/api';
import { MODO } from './../sharedModules/constantes';
import { Table } from 'primeng/table';
import { CategoriaService } from '../services/Categoria.service';
import { DetalleUnidadMedidaComponent } from './detalle-unidad-medida/detalle-unidad-medida.component';
import { ConsultasBaseComponent } from '../consultas-base/consultas-base.component';

@Component({
  selector: 'app-unidad-de-medida',
  templateUrl: '../consultas-base/consultas-base.component.html',
  styleUrls: ['../consultas-base/consultas-base.component.scss']
})

export class UnidadDeMedidaComponent extends ConsultasBaseComponent implements OnInit {
  dataSource: Array<any>;
  isCargando: boolean;
  itemSeleccionado: any;
  columns: any;
  data = { 'NUM': 1, 'CODIGO': '1231', 'ACTIVIDAD': 'camisa', 'PRECIO_VENT': 12, 'PRECIO_VENT_ACT': 80, 'PAGO_EMPLEADO': 120 }
  @ViewChild('dt') table: Table;
  Nombrecatalogo:any;
  ocultarBTNEliminar:boolean = false;
  constructor(public peticiones: PeticionesWebComponent,
    public CatSrv:CategoriaService,
    public funcGenerales: FuncionesGenerales,
    public dialog: MatDialog) {
    super(funcGenerales,dialog,peticiones);
    this.isCargando = false;
    this.Nombrecatalogo = 'Unidad de medida';
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
    this.peticiones.peticionPost({}, 'consultaUnidadMedida').then((resultado: any) => {
      console.log(resultado);
      this.dataSource = resultado;
      let num = 0;
      for (let i of this.dataSource) {
        num += 1;
        i.NUM = num;
      }
      this.quitarCargando();
    }).catch((error) => {
      console.log(error);
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
      columns: 3,
      header: ['#', 'Unidad de medida','Abreviación'],
      field: ['NUM', 'NOMBRE', 'ABREVIACION'],

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
    var width = '45vh';
    var height = '25vh';

    const dialogRef = this.dialog.open(DetalleUnidadMedidaComponent, {
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
        console.log(result)
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
    this.funcGenerales.popUpAlerta('Confirmación', '¿Seguro que deseas eliminar el registro \"' + this.itemSeleccionado.NOMBRE + "\" ?'", 'Si', 'No').then((respuesta) => {

      if (respuesta) {
        this.mostrarCargado();
        let json: any = {};
        json.NOMBRE = this.itemSeleccionado.NOMBRE;
        this.peticiones.peticionPost(json, 'eliminarUnidadMedida').then((resultado: any) => {
          this.consulta();
          this.quitarCargando();
        }).catch((error) => {
          console.log(error);
          this.quitarCargando();
        });
      }
    });
  }
}
