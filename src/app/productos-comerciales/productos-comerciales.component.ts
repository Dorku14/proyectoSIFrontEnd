
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales'
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import { SortEvent } from 'primeng/api';
import { MODO } from './../sharedModules/constantes';
import { Table } from 'primeng/table';
import { DetalleProductosComercialesComponent } from './detalle-productos-comerciales/detalle-productos-comerciales.component';


@Component({
  selector: 'app-productos-comerciales',
  templateUrl: './productos-comerciales.component.html',
  styleUrls: ['./productos-comerciales.component.scss']
})

export class ProductosComercialesComponent implements OnInit {
  dataSource: Array<any>;
  isCargando: boolean;
  itemSeleccionado: any;
  columns: any;
  data = { 'NUM': 1, 'CODIGO': '1231', 'PRODUCTO': 'camisa', 'CANTIDAD': 12, 'PRECIOCOMP': 50, 'PRECIOVENT': 80, 'COSTACT': 120 }
  @ViewChild('dt') table: Table;
  Nombrecatalogo:any;
  constructor(private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales,
    public dialog: MatDialog) {
    this.isCargando = false;
    this.Nombrecatalogo = 'Productos Comerciales';
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
    this.peticiones.peticionPost({}, 'consultaProductoC').then((resultado: any) => {
      console.log(resultado);
      this.dataSource = resultado;
      let num = 0;
      for (let i of this.dataSource) {
        num += 1;
        i.NUM = num;
        i.PRECIOCOMP = this.funcGenerales.dameFormatoMoneda(i.PRECIOCOMP,2);
        i.PRECIOVENT = this.funcGenerales.dameFormatoMoneda(i.PRECIOVENT,2);
        i.COSTACT = this.funcGenerales.dameFormatoMoneda(i.COSTACT,2);
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
    *\date    23/09/2020
    *\version	1.00.00
  */
  configuraDataGrid(): void {
    let configGrid = {
      columns: 7,
      header: ['#', 'Código', 'Producto', 'Cantidad (Balance Inicial)', 'Precio de compra (Sin IVA)', 'Precio de venta (Sin IVA)', 'Costo actualizado',],
      field: ['NUM', 'CODIGO', 'PRODUCTO', 'CANTIDAD', 'PRECIOCOMP', 'PRECIOVENT', 'COSTACT'],

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
    var height = '35vh';

    const dialogRef = this.dialog.open(DetalleProductosComercialesComponent, {
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
    this.funcGenerales.popUpAlerta('Confirmación', '¿Seguro que deseas eliminar el registro \"' + this.itemSeleccionado.CODIGO + "\" ?'", 'Si', 'No').then((respuesta) => {

      if (respuesta) {
        this.mostrarCargado();
        let json: any = {};
        json.CODIGO = this.itemSeleccionado.CODIGO;
        this.peticiones.peticionPost(json, 'eliminarrProductoC').then((resultado: any) => {
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
